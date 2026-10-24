'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppSocket } from './useSocket';
import { ChatMode, MatchEndReason } from '@strangerconnect/shared';

export type SessionState = 'IDLE' | 'QUEUED' | 'MATCHED' | 'CONNECTING' | 'CHATTING' | 'ENDED';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'stranger' | 'system';
  text: string;
  sentAt: string;
}

export function useChatSession(socket: AppSocket | null, sessionId: string | null) {
  const [sessionState, setSessionState] = useState<SessionState>('IDLE');
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>('text');
  const [sharedInterests, setSharedInterests] = useState<string[]>([]);
  const [isOfferer, setIsOfferer] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [endReason, setEndReason] = useState<MatchEndReason | null>(null);

  // Setup socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleMatchFound = (data: {
      matchId: string;
      mode: ChatMode;
      interests: string[];
      isOfferer: boolean;
    }) => {
      setActiveMatchId(data.matchId);
      setChatMode(data.mode);
      setSharedInterests(data.interests);
      setIsOfferer(data.isOfferer);
      setSessionState('CHATTING');
      setEndReason(null);
      setMessages([
        {
          id: 'sys-start',
          sender: 'system',
          text: data.interests.length > 0
            ? `Connected with a stranger who also likes: ${data.interests.join(', ')}`
            : "Connected with a random stranger. Say hello!",
          sentAt: new Date().toISOString(),
        },
      ]);
    };

    const handleChatMessage = (data: {
      matchId: string;
      messageId: string;
      text: string;
      sentAt: string;
    }) => {
      if (data.matchId !== activeMatchId) return;
      setMessages((prev) => [
        ...prev,
        {
          id: data.messageId,
          sender: 'stranger',
          text: data.text,
          sentAt: data.sentAt,
        },
      ]);
    };

    const handleMatchEnded = (data: { matchId: string; reason: MatchEndReason }) => {
      setSessionState('ENDED');
      setEndReason(data.reason);
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-end-${Date.now()}`,
          sender: 'system',
          text: data.reason === 'skip'
            ? 'Stranger has skipped the conversation.'
            : data.reason === 'disconnect'
            ? 'Stranger has disconnected.'
            : data.reason === 'ban'
            ? 'Stranger was blocked.'
            : 'Conversation ended.',
          sentAt: new Date().toISOString(),
        },
      ]);
    };

    socket.on('match:found', handleMatchFound);
    socket.on('chat:message', handleChatMessage);
    socket.on('match:ended', handleMatchEnded);

    return () => {
      socket.off('match:found', handleMatchFound);
      socket.off('chat:message', handleChatMessage);
      socket.off('match:ended', handleMatchEnded);
    };
  }, [socket, activeMatchId]);

  const startChat = useCallback(
    (mode: ChatMode, interests: string[]) => {
      if (!socket || !sessionId) return;
      setChatMode(mode);
      setSessionState('QUEUED');
      setMessages([]);
      setActiveMatchId(null);
      setEndReason(null);

      socket.emit('queue:join', { mode, interests }, (res) => {
        if (!res.ok) {
          setSessionState('IDLE');
          alert(res.error?.message || 'Failed to join matchmaking queue');
        }
      });
    },
    [socket, sessionId]
  );

  const nextStranger = useCallback(() => {
    if (!socket || !sessionId) return;
    setSessionState('QUEUED');
    setMessages([]);
    setActiveMatchId(null);
    setEndReason(null);

    socket.emit('match:next', { matchId: activeMatchId || undefined }, (res) => {
      if (!res.ok) {
        setSessionState('IDLE');
      }
    });
  }, [socket, sessionId, activeMatchId]);

  const disconnectChat = useCallback(() => {
    if (!socket || !activeMatchId) {
      setSessionState('IDLE');
      return;
    }

    socket.emit('match:leave', { matchId: activeMatchId }, () => {
      setSessionState('IDLE');
      setActiveMatchId(null);
    });
  }, [socket, activeMatchId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!socket || !activeMatchId || !text.trim()) return;

      const messageId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const sentAt = new Date().toISOString();

      // Optimistic append
      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          sender: 'me',
          text: text.trim(),
          sentAt,
        },
      ]);

      socket.emit(
        'chat:send',
        {
          matchId: activeMatchId,
          messageId,
          text: text.trim(),
        },
        (res) => {
          if (!res.ok) {
            console.error('Failed to send message:', res.error);
          }
        }
      );
    },
    [socket, activeMatchId]
  );

  return {
    sessionState,
    activeMatchId,
    chatMode,
    sharedInterests,
    isOfferer,
    messages,
    endReason,
    startChat,
    nextStranger,
    disconnectChat,
    sendMessage,
  };
}
