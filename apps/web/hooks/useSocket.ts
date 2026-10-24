'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '@strangerconnect/shared';

const REALTIME_URL = process.env.NEXT_PUBLIC_REALTIME_URL || 'http://localhost:4000';

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export function useSocket() {
  const socketRef = useRef<AppSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('stranger_token') : null;

    const socket: AppSocket = io(REALTIME_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      // Initialize anonymous session
      socket.emit('session:init', { token: savedToken || undefined }, (res) => {
        if (res.ok && res.data) {
          setSessionId(res.data.sessionId);
          if (typeof window !== 'undefined') {
            localStorage.setItem('stranger_token', res.data.token);
          }
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('session:ready', (data) => {
      setSessionId(data.sessionId);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    sessionId,
  };
}
