import { Server as SocketIOServer, Socket } from 'socket.io';
import { redis } from '../config/redis.js';
import { matchmakingService } from '../services/matchmaking.service.js';
import { moderationService } from '../services/moderation.service.js';
import {
  QueueJoinSchema,
  QueueCancelSchema,
  MatchAckSchema,
  MatchNextSchema,
  MatchLeaveSchema,
  MatchState,
} from '@strangerconnect/shared';

export function registerQueueHandlers(io: SocketIOServer, socket: Socket) {
  socket.on('queue:join', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'UNAUTHORIZED', message: 'Session not initialized' },
        });
      }

      // Rate limit check
      const rate = await moderationService.checkRateLimit(sessionId, 'queue_join');
      if (!rate.allowed) {
        return callback?.({
          ok: false,
          error: { code: 'RATE_LIMITED', message: 'Queue join rate limit exceeded' },
        });
      }

      const parsed = QueueJoinSchema.safeParse(payload);
      if (!parsed.success) {
        return callback?.({
          ok: false,
          error: { code: 'INVALID_PAYLOAD', message: parsed.error.issues[0]?.message || 'Invalid payload' },
        });
      }

      const { mode, interests } = parsed.data;
      const result = await matchmakingService.joinQueue(sessionId, mode, interests);

      if (result.status === 'matched' && result.match) {
        await notifyMatchPeers(io, result.match);
        return callback?.({
          ok: true,
          data: { status: 'matched', matchId: result.match.matchId },
        });
      }

      return callback?.({
        ok: true,
        data: { status: 'waiting' },
      });
    } catch (err: any) {
      console.error('queue:join error:', err);
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to join queue' },
      });
    }
  });

  socket.on('queue:cancel', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'UNAUTHORIZED', message: 'Session not initialized' },
        });
      }

      await matchmakingService.cancelQueue(sessionId);
      socket.emit('queue:status', { status: 'cancelled', requestId: payload?.requestId });
      return callback?.({ ok: true, data: { status: 'cancelled' } });
    } catch (err: any) {
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to cancel queue' },
      });
    }
  });

  socket.on('match:next', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'UNAUTHORIZED', message: 'Session not initialized' },
        });
      }

      // 1. Leave current match if any
      const activeMatchId = payload?.matchId || (await matchmakingService.getActiveMatchId(sessionId));
      if (activeMatchId) {
        const endedMatch = await matchmakingService.leaveMatch(sessionId, activeMatchId, 'skip');
        if (endedMatch) {
          const peerId = endedMatch.sessionA === sessionId ? endedMatch.sessionB : endedMatch.sessionA;
          const peerSocketId = await redis.get(`session:${peerId}:socket`);
          if (peerSocketId) {
            io.to(peerSocketId).emit('match:ended', { matchId: activeMatchId, reason: 'skip' });
          }
        }
      }

      // 2. Re-queue immediately with saved preferences
      const savedMode = (await redis.get(`session:${sessionId}:mode`)) || 'text';
      const savedInterestsRaw = await redis.get(`session:${sessionId}:interests`);
      const savedInterests = savedInterestsRaw ? JSON.parse(savedInterestsRaw) : [];

      const result = await matchmakingService.joinQueue(sessionId, savedMode as any, savedInterests);

      if (result.status === 'matched' && result.match) {
        await notifyMatchPeers(io, result.match);
      }

      return callback?.({ ok: true, data: { status: 'searching' } });
    } catch (err: any) {
      console.error('match:next error:', err);
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to request next match' },
      });
    }
  });

  socket.on('match:leave', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) {
        return callback?.({
          ok: false,
          error: { code: 'UNAUTHORIZED', message: 'Session not initialized' },
        });
      }

      const activeMatchId = payload?.matchId || (await matchmakingService.getActiveMatchId(sessionId));
      if (activeMatchId) {
        const endedMatch = await matchmakingService.leaveMatch(sessionId, activeMatchId, 'disconnect');
        if (endedMatch) {
          const peerId = endedMatch.sessionA === sessionId ? endedMatch.sessionB : endedMatch.sessionA;
          const peerSocketId = await redis.get(`session:${peerId}:socket`);
          if (peerSocketId) {
            io.to(peerSocketId).emit('match:ended', { matchId: activeMatchId, reason: 'disconnect' });
          }
        }
      }

      return callback?.({ ok: true, data: { status: 'ended' } });
    } catch (err: any) {
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to leave match' },
      });
    }
  });
}

export async function notifyMatchPeers(io: SocketIOServer, match: MatchState) {
  const socketAId = await redis.get(`session:${match.sessionA}:socket`);
  const socketBId = await redis.get(`session:${match.sessionB}:socket`);

  // sessionA is deterministic offerer if sessionA < sessionB
  const isAOfferer = match.sessionA < match.sessionB;

  if (socketAId) {
    const socketA = io.sockets.sockets.get(socketAId);
    socketA?.join(`match:${match.matchId}`);
    io.to(socketAId).emit('match:found', {
      matchId: match.matchId,
      mode: match.mode,
      interests: match.sharedInterests,
      isOfferer: isAOfferer,
    });
  }

  if (socketBId) {
    const socketB = io.sockets.sockets.get(socketBId);
    socketB?.join(`match:${match.matchId}`);
    io.to(socketBId).emit('match:found', {
      matchId: match.matchId,
      mode: match.mode,
      interests: match.sharedInterests,
      isOfferer: !isAOfferer,
    });
  }
}
