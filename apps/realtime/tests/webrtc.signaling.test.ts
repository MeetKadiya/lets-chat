import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import { httpServer, startServer, io } from '../src/server.js';
import { io as Client, Socket } from 'socket.io-client';

describe('WebRTC Signaling Relays & Security', () => {
  let server: http.Server;
  const testPort = 4057;

  beforeAll(async () => {
    server = await startServer(testPort);
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      io.close();
      server.close(() => resolve());
    });
  });

  it('relays SDP offer, answer, and ICE candidates between matched peers', async () => {
    const client1: Socket = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });
    const client2: Socket = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    // 1. Session Init
    await Promise.all([
      new Promise<void>((res) => client1.on('connect', () => client1.emit('session:init', {}, () => res()))),
      new Promise<void>((res) => client2.on('connect', () => client2.emit('session:init', {}, () => res()))),
    ]);

    // 2. Queue & match
    let matchId = '';
    const matchPromise = Promise.all([
      new Promise<void>((res) => client1.on('match:found', (data: any) => { matchId = data.matchId; res(); })),
      new Promise<void>((res) => client2.on('match:found', () => res())),
    ]);

    client1.emit('queue:join', { mode: 'video', interests: ['tech'] });
    client2.emit('queue:join', { mode: 'video', interests: ['tech'] });

    await matchPromise;
    expect(matchId).toBeTruthy();

    // 3. Offer exchange
    const offerPromise = new Promise<any>((res) => {
      client2.on('webrtc:offer', (data) => res(data));
    });

    client1.emit('webrtc:offer', {
      matchId,
      description: { type: 'offer', sdp: 'v=0\r\no=- 12345 2 IN IP4 127.0.0.1' },
    });

    const receivedOffer = await offerPromise;
    expect(receivedOffer.description.type).toBe('offer');

    // 4. Answer exchange
    const answerPromise = new Promise<any>((res) => {
      client1.on('webrtc:answer', (data) => res(data));
    });

    client2.emit('webrtc:answer', {
      matchId,
      description: { type: 'answer', sdp: 'v=0\r\no=- 67890 2 IN IP4 127.0.0.1' },
    });

    const receivedAnswer = await answerPromise;
    expect(receivedAnswer.description.type).toBe('answer');

    // 5. ICE candidate exchange
    const icePromise = new Promise<any>((res) => {
      client2.on('webrtc:ice', (data) => res(data));
    });

    client1.emit('webrtc:ice', {
      matchId,
      candidate: { candidate: 'candidate:1 1 UDP 12345 127.0.0.1 5000 typ host', sdpMid: '0', sdpMLineIndex: 0 },
    });

    const receivedIce = await icePromise;
    expect(receivedIce.candidate.candidate).toContain('typ host');

    // 6. Security: third party unauthorized event is rejected
    const rogueClient: Socket = Client(`http://localhost:${testPort}`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    await new Promise<void>((res) => rogueClient.on('connect', () => rogueClient.emit('session:init', {}, () => res())));

    await new Promise<void>((res) => {
      rogueClient.emit('webrtc:offer', {
        matchId,
        description: { type: 'offer', sdp: 'fake' },
      }, (ack: any) => {
        expect(ack.ok).toBe(false);
        expect(ack.error.code).toBe('FORBIDDEN');
        res();
      });
    });

    client1.disconnect();
    client2.disconnect();
    rogueClient.disconnect();
  });
});
