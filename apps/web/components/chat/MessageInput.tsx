'use client';

import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

const QUICK_REACTIONS = ['👋 Hello!', '👍 Nice', '❤️ Love that', '😂 Haha', '🔥 Awesome'];

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSendReaction = (reaction: string) => {
    if (disabled) return;
    onSendMessage(reaction);
  };

  return (
    <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0B0F19]/90 backdrop-blur-md space-y-2">
      {/* Quick Emoji Reaction Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Quick:
        </span>
        {QUICK_REACTIONS.map((reaction) => (
          <button
            key={reaction}
            type="button"
            disabled={disabled}
            onClick={() => handleSendReaction(reaction)}
            className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/5 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-colors disabled:opacity-40"
          >
            {reaction}
          </button>
        ))}
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Waiting for a stranger to connect...' : 'Type a message (Enter to send)...'}
          maxLength={2000}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="p-2.5 rounded-xl btn-electric disabled:opacity-40 text-white transition-all flex items-center justify-center shadow-md shadow-cyan-500/20"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Micro Status Bar */}
      <div className="flex justify-between items-center px-1 text-[11px] text-slate-500">
        <span>Press <kbd className="font-mono text-slate-400">Enter</kbd> to send</span>
        <span className="font-mono">{text.length}/2000</span>
      </div>
    </div>
  );
}
