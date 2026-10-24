import { Server as SocketIOServer } from 'socket.io';
import { redis } from '../config/redis.js';
import { matchmakingService } from './matchmaking.service.js';

export class CleanupService {
  async handleDisconnect(io: SocketIOServer, sessionId: string, socketId: string): Promise<void> {
    // 1. Remove from all queues
    await matchmakingService.cancelQueue(sessionId);

    // 2. Remove socket mapping
    await redis.del(`socket:${socketId}`);

    // 3. Check active match
    const matchId = await matchmakingService.getActiveMatchId(sessionId);
    if (matchId) {
      const match = await matchmakingService.leaveMatch(sessionId, matchId, 'disconnect');
      if (match) {
        // Find peer
        const peerSessionId = match.sessionA === sessionId ? match.sessionB : match.sessionA;
        const peerSocketId = await redis.get(`session:${peerSessionId}:socket`);

        if (peerSocketId) {
          io.to(peerSocketId).emit('match:ended', {
            matchId,
            reason: 'disconnect',
          });
        }
      }
    }
  }
}

export const cleanupService = new CleanupService();
