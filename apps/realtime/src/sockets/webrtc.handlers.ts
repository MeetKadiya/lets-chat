import { Server as SocketIOServer, Socket } from 'socket.io';
import { redis } from '../config/redis.js';
import { matchmakingService } from '../services/matchmaking.service.js';
import { moderationService } from '../services/moderation.service.js';
import {
  WebRtcOfferSchema,
  WebRtcAnswerSchema,
  WebRtcIceSchema,
} from '@strangerconnect/shared';

export function registerWebRtcHandlers(io: SocketIOServer, socket: Socket) {
  // WebRTC SDP Offer
  socket.on('webrtc:offer', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return callback?.({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const parsed = WebRtcOfferSchema.safeParse(payload);
      if (!parsed.success) return callback?.({ ok: false, error: { code: 'INVALID_PAYLOAD', message: 'Invalid SDP offer' } });

      const { matchId, description } = parsed.data;
      const match = await matchmakingService.getMatchState(matchId);
      if (!match || match.status !== 'active') return callback?.({ ok: false, error: { code: 'MATCH_NOT_ACTIVE', message: 'Match inactive' } });

      if (match.sessionA !== sessionId && match.sessionB !== sessionId) {
        return callback?.({ ok: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } });
      }

      const peerId = match.sessionA === sessionId ? match.sessionB : match.sessionA;
      const peerSocketId = await redis.get(`session:${peerId}:socket`);

      if (peerSocketId) {
        io.to(peerSocketId).emit('webrtc:offer', { matchId, description });
      }

      return callback?.({ ok: true });
    } catch (err: any) {
      return callback?.({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  });

  // WebRTC SDP Answer
  socket.on('webrtc:answer', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return callback?.({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const parsed = WebRtcAnswerSchema.safeParse(payload);
      if (!parsed.success) return callback?.({ ok: false, error: { code: 'INVALID_PAYLOAD', message: 'Invalid SDP answer' } });

      const { matchId, description } = parsed.data;
      const match = await matchmakingService.getMatchState(matchId);
      if (!match || match.status !== 'active') return callback?.({ ok: false, error: { code: 'MATCH_NOT_ACTIVE', message: 'Match inactive' } });

      if (match.sessionA !== sessionId && match.sessionB !== sessionId) {
        return callback?.({ ok: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } });
      }

      const peerId = match.sessionA === sessionId ? match.sessionB : match.sessionA;
      const peerSocketId = await redis.get(`session:${peerId}:socket`);

      if (peerSocketId) {
        io.to(peerSocketId).emit('webrtc:answer', { matchId, description });
      }

      return callback?.({ ok: true });
    } catch (err: any) {
      return callback?.({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  });

  // WebRTC ICE Candidate
  socket.on('webrtc:ice', async (payload, callback) => {
    try {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return callback?.({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const parsed = WebRtcIceSchema.safeParse(payload);
      if (!parsed.success) return callback?.({ ok: false, error: { code: 'INVALID_PAYLOAD', message: 'Invalid ICE candidate' } });

      const { matchId, candidate } = parsed.data;
      const match = await matchmakingService.getMatchState(matchId);
      if (!match || match.status !== 'active') return callback?.({ ok: false, error: { code: 'MATCH_NOT_ACTIVE', message: 'Match inactive' } });

      if (match.sessionA !== sessionId && match.sessionB !== sessionId) {
        return callback?.({ ok: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } });
      }

      const peerId = match.sessionA === sessionId ? match.sessionB : match.sessionA;
      const peerSocketId = await redis.get(`session:${peerId}:socket`);

      if (peerSocketId) {
        io.to(peerSocketId).emit('webrtc:ice', { matchId, candidate });
      }

      return callback?.({ ok: true });
    } catch (err: any) {
      return callback?.({ ok: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  });
}
