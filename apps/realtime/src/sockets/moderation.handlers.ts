import { Server as SocketIOServer, Socket } from 'socket.io';
import { redis } from '../config/redis.js';
import { matchmakingService } from '../services/matchmaking.service.js';
import { moderationService } from '../services/moderation.service.js';
import { ReportSchema, BlockSchema } from '@strangerconnect/shared';

export function registerModerationHandlers(io: SocketIOServer, socket: Socket) {
  socket.on('moderation:report', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return callback?.({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const parsed = ReportSchema.safeParse(payload);
      if (!parsed.success) return callback?.({ ok: false, error: { code: 'INVALID_PAYLOAD', message: 'Invalid report payload' } });

      const { matchId, category, details } = parsed.data;
      const match = await matchmakingService.getMatchState(matchId);
      if (!match) return callback?.({ ok: false, error: { code: 'NOT_FOUND', message: 'Match not found' } });

      const peerId = match.sessionA === sessionId ? match.sessionB : match.sessionA;

      const reportId = await moderationService.reportUser(
        sessionId,
        peerId,
        matchId,
        category,
        details
      );

      socket.emit('moderation:result', { action: 'report', status: 'submitted' });
      return callback?.({ ok: true, data: { reportId } });
    } catch (err: any) {
      return callback?.({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  });

  socket.on('moderation:block', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return callback?.({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const parsed = BlockSchema.safeParse(payload);
      if (!parsed.success) return callback?.({ ok: false, error: { code: 'INVALID_PAYLOAD', message: 'Invalid block payload' } });

      const { matchId } = parsed.data;
      const match = await matchmakingService.getMatchState(matchId);
      if (!match) return callback?.({ ok: false, error: { code: 'NOT_FOUND', message: 'Match not found' } });

      const peerId = match.sessionA === sessionId ? match.sessionB : match.sessionA;

      // 1. Persist block
      await moderationService.blockUser(sessionId, peerId);

      // 2. Terminate match
      await matchmakingService.leaveMatch(sessionId, matchId, 'ban');

      const peerSocketId = await redis.get(`session:${peerId}:socket`);
      if (peerSocketId) {
        io.to(peerSocketId).emit('match:ended', { matchId, reason: 'ban' });
      }

      socket.emit('moderation:result', { action: 'block', status: 'blocked' });
      return callback?.({ ok: true, data: { blocked: true } });
    } catch (err: any) {
      return callback?.({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  });
}
