'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

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

  return (
    <div className="p-3.5 border-t-2 border-[#252820] bg-[#FFF9ED]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Waiting for a stranger to connect...' : 'Type a message (Enter to send)...'}
          maxLength={2000}
          className="flex-1 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-[#252820] placeholder-slate-400 focus:outline-none focus:border-[#65A843] disabled:opacity-50 transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="mingleo-btn-green px-4 py-2.5 rounded-xl disabled:opacity-40 flex items-center justify-center gap-1.5"
          title="Send message"
        >
          <span className="hidden sm:inline text-xs font-black uppercase">Send</span>
          <Send className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </form>
      <div className="flex justify-between items-center px-1 mt-1.5 text-[11px] font-bold text-slate-500">
        <span>Press Enter to send</span>
        <span>{text.length}/2000</span>
      </div>
    </div>
  );
}
