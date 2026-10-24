'use client';

import React from 'react';
import { Users, Sparkles, Video } from 'lucide-react';

interface LetsChatStartCardProps {
  onStart: () => void;
  isConnecting?: boolean;
  onSwitchSquad?: () => void;
}

export function LetsChatStartCard({
  onStart,
  isConnecting = false,
  onSwitchSquad,
}: LetsChatStartCardProps) {
  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-6 sm:p-7 shadow-[0_4px_0_#111111] relative text-center flex flex-col items-center justify-center">
      {/* Decorative Sparkles & Pixel Head on Left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 select-none pointer-events-none">
        <div className="w-8 h-8 rounded-lg bg-[#4A2E18] border-2 border-[#111111] overflow-hidden shadow-[0_2px_0_#111111]">
          <img
            src="/assets/characters/avatar-player123.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-5 h-5">
          <img
            src="/assets/icons/sparkle.svg"
            alt=""
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Decorative Sparkles on Right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:block select-none pointer-events-none">
        <div className="w-6 h-6">
          <img
            src="/assets/icons/sparkle.svg"
            alt=""
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Center Texts */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2DF] border border-[#111111] text-xs font-black text-[#278344] mb-2.5">
        <span className="w-2 h-2 rounded-full bg-[#65C93F] animate-pulse" />
        <span>1-on-1 Random Video Chat</span>
      </div>

      <h2 className="font-black text-2xl sm:text-3xl text-[#111111] tracking-tight mb-1.5">
        Ready to make a new connection?
      </h2>
      <p className="text-sm font-semibold text-slate-700 mb-4 max-w-md">
        Click below to enter the live video room and meet a friendly stranger instantly.
      </p>

      {/* Big Green Start Chatting Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onStart}
          disabled={isConnecting}
          className="lc-btn"
        >
          <span className="text-xl sm:text-2xl leading-none">▶</span>
          <span>{isConnecting ? 'Connecting to Room...' : 'Start chatting'}</span>
        </button>

        {onSwitchSquad && (
          <button
            type="button"
            onClick={onSwitchSquad}
            className="px-4 py-3 rounded-2xl bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] text-xs font-black text-[#111111] hover:bg-[#F4EBD9] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#278344]" />
            <span>Squad Rooms (2v2) →</span>
          </button>
        )}
      </div>
    </div>
  );
}
