import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import { httpServer, startServer, io } from '../src/server.js';
import { io as Client, Socket } from 'socket.io-client';

describe('Real-Time Chat & Matchmaking Lifecycle (Multi-Client)', () => {
  let server: http.Server;
  const testPort = 4056;

  beforeAll(async () => {
    server = await startServer(testPort);
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      io.close();
      server.close(() => resolve());
    });
  });

  it('connects 2 clients, matches them, exchanges text, and handles next skip', async () => {
    const client1: Socket = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });
    const client2: Socket = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    // 1. Session Init for both
    await Promise.all([
      new Promise<void>((resolve) => {
        client1.on('connect', () => {
          client1.emit('session:init', {}, () => resolve());
        });
      }),
      new Promise<void>((resolve) => {
        client2.on('connect', () => {
          client2.emit('session:init', {}, () => resolve());
        });
      }),
    ]);

    // 2. Setup match:found listeners
    let matchId1 = '';
    let matchId2 = '';
    let isOfferer1: boolean | null = null;
    let isOfferer2: boolean | null = null;

    const matchFoundPromise = Promise.all([
      new Promise<void>((resolve) => {
        client1.on('match:found', (data: any) => {
          matchId1 = data.matchId;
          isOfferer1 = data.isOfferer;
          resolve();
        });
      }),
      new Promise<void>((resolve) => {
        client2.on('match:found', (data: any) => {
          matchId2 = data.matchId;
          isOfferer2 = data.isOfferer;
          resolve();
        });
      }),
    ]);

    // 3. Client 1 and 2 join queue with shared interest 'music'
    client1.emit('queue:join', { mode: 'text', interests: ['music', 'gaming'] });
    client2.emit('queue:join', { mode: 'text', interests: ['music', 'anime'] });

    await matchFoundPromise;

    expect(matchId1).toBeTruthy();
    expect(matchId1).toBe(matchId2);
    // Deterministic offerer: one must be true, one false
    expect(isOfferer1 !== isOfferer2).toBe(true);

    // 4. Exchange real-time text message
    const messagePromise = new Promise<{ text: string }>((resolve) => {
      client2.on('chat:message', (data: any) => {
        resolve(data);
      });
    });

    client1.emit(
      'chat:send',
      {
        matchId: matchId1,
        messageId: 'msg-test-1',
        text: 'Hello from client 1!',
      },
      (ack: any) => {
        expect(ack.ok).toBe(true);
      }
    );

    const receivedMessage = await messagePromise;
    expect(receivedMessage.text).toBe('Hello from client 1!');

    // 5. Client 1 clicks Next
    const skipPromise = new Promise<{ reason: string }>((resolve) => {
      client2.on('match:ended', (data: any) => {
        resolve(data);
      });
    });

    client1.emit('match:next', { matchId: matchId1 }, (ack: any) => {
      expect(ack.ok).toBe(true);
    });

    const endedData = await skipPromise;
    expect(endedData.reason).toBe('skip');

    // Cleanup
    client1.disconnect();
    client2.disconnect();
  });
});
