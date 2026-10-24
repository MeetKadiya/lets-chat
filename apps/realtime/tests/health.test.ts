import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import { httpServer, startServer, io } from '../src/server.js';
import { io as Client } from 'socket.io-client';

describe('Realtime Server HTTP and Socket Initialization', () => {
  let server: http.Server;
  const testPort = 4055;

  beforeAll(async () => {
    server = await startServer(testPort);
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      io.close();
      server.close(() => resolve());
    });
  });

  it('responds to GET /health', async () => {
    const res = await fetch(`http://localhost:${testPort}/health`);
    expect(res.status).toBeDefined();
    const body = await res.json();
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('timestamp');
  });

  it('accepts a Socket.IO connection and receives session:ready on session:init', async () => {
    const client = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    await new Promise<void>((resolve, reject) => {
      client.on('connect', () => {
        client.emit('session:init', {}, (res: any) => {
          expect(res.ok).toBe(true);
          expect(res.data).toHaveProperty('sessionId');
          expect(res.data).toHaveProperty('token');
          resolve();
        });
      });
      client.on('connect_error', reject);
    });

    client.disconnect();
  });
});
