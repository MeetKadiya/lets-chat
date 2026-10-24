'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../../hooks/useChatSession';
import { Sparkles, Radio, Clock, ShieldCheck } from 'lucide-react';

interface MessageListProps {
  messages: ChatMessage[];
  sessionState: string;
}

export function MessageList({ messages, sessionState }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [elapsedQueueSeconds, setElapsedQueueSeconds] = useState(0);

  // Matchmaking timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (sessionState === 'QUEUED') {
      setElapsedQueueSeconds(0);
      timer = setInterval(() => {
        setElapsedQueueSeconds((s) => s + 1);
      }, 1000);
    } else {
      setElapsedQueueSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sessionState]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 min-h-[300px]">
      {/* QUEUED Radar Animation */}
      {sessionState === 'QUEUED' && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center space-y-4">
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute w-24 h-24 rounded-full bg-cyan-500/10 animate-radar" />
            <div className="absolute w-16 h-16 rounded-full bg-indigo-500/20 animate-ping" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-white font-bold text-sm tracking-wide">
              Finding a compatible stranger... ({elapsedQueueSeconds}s)
            </p>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">
              Scanning active anonymous peers for common interests and low latency.
            </p>
          </div>
        </div>
      )}

      {/* IDLE State */}
      {sessionState === 'IDLE' && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-500 text-xs">
          <Sparkles className="w-5 h-5 text-slate-600" />
          <p>Ready to chat. Hit &quot;Next&quot; or start a session to meet a stranger.</p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg) => {
        if (msg.sender === 'system') {
          const isSuccess = msg.text.includes('Connected') || msg.text.includes('matched');
          return (
            <div key={msg.id} className="flex justify-center my-3 animate-in fade-in duration-200">
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 max-w-md text-center ${
                  isSuccess
                    ? 'bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-sm'
                    : 'bg-white/[0.04] border border-white/10 text-slate-400'
                }`}
              >
                {isSuccess ? <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> : <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                <span>{msg.text}</span>
              </div>
            </div>
          );
        }

        const isMe = msg.sender === 'me';
        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in duration-150`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                isMe
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-cyan-500/10'
                  : 'bg-white/[0.06] border border-white/10 text-slate-100 rounded-bl-xs'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1.5 font-mono">
              {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
