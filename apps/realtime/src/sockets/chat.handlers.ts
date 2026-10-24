import { Server as SocketIOServer, Socket } from 'socket.io';
import { redis } from '../config/redis.js';
import { matchmakingService } from '../services/matchmaking.service.js';
import { moderationService } from '../services/moderation.service.js';
import { ChatSendSchema } from '@strangerconnect/shared';

export function registerChatHandlers(io: SocketIOServer, socket: Socket) {
  socket.on('chat:send', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'UNAUTHORIZED', message: 'Session not initialized' },
        });
      }

      // 1. Validate payload schema
      const parsed = ChatSendSchema.safeParse(payload);
      if (!parsed.success) {
        return callback?.({
          ok: false,
          error: { code: 'INVALID_PAYLOAD', message: parsed.error.issues[0]?.message || 'Invalid message' },
        });
      }

      const { matchId, messageId, text } = parsed.data;

      // 2. Rate limit check (35 msg / min)
      const rate = await moderationService.checkRateLimit(sessionId, 'chat_message');
      if (!rate.allowed) {
        return callback?.({
          ok: false,
          error: { code: 'RATE_LIMITED', message: 'Message rate limit exceeded' },
        });
      }

      // 3. Verify match membership and status
      const match = await matchmakingService.getMatchState(matchId);
      if (!match || match.status !== 'active') {
        return callback?.({
          ok: false,
          error: { code: 'MATCH_NOT_ACTIVE', message: 'Match is no longer active' },
        });
      }

      if (match.sessionA !== sessionId && match.sessionB !== sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'FORBIDDEN', message: 'User is not a participant of this match' },
        });
      }

      const peerSessionId = match.sessionA === sessionId ? match.sessionB : match.sessionA;
      const peerSocketId = await redis.get(`session:${peerSessionId}:socket`);
      const sentAt = new Date().toISOString();

      // 4. Relay to peer
      if (peerSocketId) {
        io.to(peerSocketId).emit('chat:message', {
          matchId,
          messageId,
          text,
          sentAt,
        });
      }

      return callback?.({
        ok: true,
        data: { messageId, sentAt },
      });
    } catch (err: any) {
      console.error('chat:send error:', err);
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to send message' },
      });
    }
  });
}
