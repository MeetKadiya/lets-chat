import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { env } from './config/env.js';
import { db, checkDatabaseConnection } from './config/db.js';
import { redis, checkRedisConnection } from './config/redis.js';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '@strangerconnect/shared';
import { registerSessionHandlers } from './sockets/session.handlers.js';
import { registerQueueHandlers } from './sockets/queue.handlers.js';
import { registerChatHandlers } from './sockets/chat.handlers.js';
import { registerWebRtcHandlers } from './sockets/webrtc.handlers.js';
import { registerModerationHandlers } from './sockets/moderation.handlers.js';
import { cleanupService } from './services/cleanup.service.js';

const app = express();

app.use(cors({
  origin: [env.WEB_URL, 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

app.get('/health', async (_req, res) => {
  const dbOk = await checkDatabaseConnection();
  const redisOk = await checkRedisConnection();
  const isHealthy = dbOk && redisOk;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    postgres: dbOk ? 'connected' : 'disconnected',
    redis: redisOk ? 'connected' : 'disconnected',
  });
});

export const httpServer = http.createServer(app);

export const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: [env.WEB_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 20000,
  pingInterval: 25000,
});

io.on('connection', (socket) => {
  registerSessionHandlers(socket);
  registerQueueHandlers(io, socket);
  registerChatHandlers(io, socket);
  registerWebRtcHandlers(io, socket);
  registerModerationHandlers(io, socket);

  socket.on('disconnect', async () => {
    const sessionId = socket.data.sessionId;
    if (sessionId) {
      await cleanupService.handleDisconnect(io, sessionId, socket.id);
    }
  });
});

export async function startServer(port = env.PORT) {
  try {
    await redis.connect().catch((err: unknown) => {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('Initial Redis connection deferred or failed:', message);
    });
  } catch (err: unknown) {
    console.warn('Redis connect error:', err);
  }

  return new Promise<http.Server>((resolve) => {
    const server = httpServer.listen(port, () => {
      console.log(`Let's Chat Realtime Server running on port ${port} (env: ${env.NODE_ENV})`);
      resolve(server);
    });
  });
}

// Auto-start if invoked directly
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
