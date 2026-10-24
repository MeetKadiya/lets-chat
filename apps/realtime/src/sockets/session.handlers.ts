import { Socket } from 'socket.io';
import { redis } from '../config/redis.js';
import { sessionService } from '../services/session.service.js';
import { SessionInitSchema } from '@strangerconnect/shared';

export function registerSessionHandlers(socket: Socket) {
  socket.on('session:init', async (payload, callback) => {
    try {
      const parsed = SessionInitSchema.safeParse(payload || {});
      if (!parsed.success) {
        return callback?.({
          ok: false,
          error: { code: 'INVALID_PAYLOAD', message: 'Malformed session:init payload' },
        });
      }

      let session = null;
      let token = parsed.data.token;

      if (token) {
        session = await sessionService.validateToken(token);
      }

      if (!session) {
        const created = await sessionService.createSession();
        session = created.session;
        token = created.token;
      }

      socket.data.sessionId = session.id;
      socket.data.authenticatedAt = Date.now();

      // Map session to socket
      await redis.setex(`session:${session.id}:socket`, 1800, socket.id);
      await redis.setex(`socket:${socket.id}`, 1800, session.id);

      socket.emit('session:ready', {
        sessionId: session.id,
        expiresAt: session.expiresAt,
      });

      return callback?.({
        ok: true,
        data: {
          sessionId: session.id,
          token: token!,
          expiresAt: session.expiresAt,
        },
      });
    } catch (err: any) {
      console.error('session:init error:', err);
      return callback?.({
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to initialize session' },
      });
    }
  });
}
