'use client';

import React from 'react';

interface LetsChatStartCardProps {
  onStart: () => void;
  isConnecting?: boolean;
}

export function LetsChatStartCard({
  onStart,
  isConnecting = false,
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
      <h2 className="font-black text-2xl sm:text-3xl text-[#111111] tracking-tight mb-1.5">
        Ready to make a new connection?
      </h2>
      <p className="text-sm font-semibold text-slate-700 mb-5">
        Click the button below to start chatting!
      </p>

      {/* Big Green Start Chatting Button */}
      <button
        type="button"
        onClick={onStart}
        disabled={isConnecting}
        className="lc-btn"
      >
        <span className="text-xl sm:text-2xl leading-none">▶</span>
        <span>{isConnecting ? 'Connecting...' : 'Start chatting'}</span>
      </button>
    </div>
  );
}
