'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../hooks/useChatSession';

interface MessageListProps {
  messages: ChatMessage[];
  sessionState: string;
}

export function MessageList({ messages, sessionState }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
      {sessionState === 'QUEUED' && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-slate-300 font-medium text-sm">Searching for a compatible stranger...</p>
          <p className="text-slate-500 text-xs max-w-xs">
            We are checking shared interests and matching you anonymously.
          </p>
        </div>
      )}

      {sessionState === 'IDLE' && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 text-sm">
          Select your preferences and start chatting to meet a stranger.
        </div>
      )}

      {messages.map((msg) => {
        if (msg.sender === 'system') {
          return (
            <div key={msg.id} className="flex justify-center my-3">
              <span className="px-3.5 py-1.5 rounded-full bg-surface-100 border border-slate-700/60 text-xs text-slate-300 font-medium">
                {msg.text}
              </span>
            </div>
          );
        }

        const isMe = msg.sender === 'me';
        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                isMe
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-surface-100 border border-slate-800 text-slate-100 rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">
              {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
