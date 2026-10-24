'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../hooks/useChatSession';
import { Sparkles, Compass } from 'lucide-react';

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
    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] bg-[#FFF9ED] text-[#252820]">
      {sessionState === 'QUEUED' && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          {/* Animated blocky search spinner */}
          <div className="w-12 h-12 rounded-xl bg-[#65A843] border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center text-2xl animate-spin duration-1000">
            🔍
          </div>
          <div>
            <p className="text-sm font-black text-[#252820]">Looking for someone awesome...</p>
            <p className="text-xs font-semibold text-slate-600 mt-1 max-w-xs">
              Matching you with friendly strangers who share your interests!
            </p>
          </div>
        </div>
      )}

      {sessionState === 'IDLE' && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center text-2xl">
            👋
          </div>
          <p className="text-xs sm:text-sm font-black text-[#252820]">
            Click <span className="text-[#65A843]">&apos;Next Stranger&apos;</span> to start chatting!
          </p>
        </div>
      )}

      {messages.map((msg) => {
        if (msg.sender === 'system') {
          return (
            <div key={msg.id} className="flex justify-center my-3">
              <span className="px-4 py-1.5 rounded-full bg-[#EAF5D5] border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs text-[#252820] font-black">
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
              className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border-2 border-[#252820] shadow-[0_2px_0_#252820] leading-relaxed ${
                isMe
                  ? 'bg-[#EAF5D5] text-[#252820] rounded-tr-none'
                  : 'bg-white text-[#252820] rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] font-bold text-slate-500 mt-1 px-1">
              {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
