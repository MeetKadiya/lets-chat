'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Heart, Smile } from 'lucide-react';

interface Screen1HomeProps {
  onStartChatting?: () => void;
}

export function Screen1Home({ onStartChatting }: Screen1HomeProps) {
  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-6 sm:p-10 shadow-[0_6px_0_#111111] relative overflow-hidden flex flex-col justify-between min-h-[580px]">
      {/* Subtle Floating Pixel Clouds */}
      <img
        src="/assets/environment/cloud.svg"
        alt=""
        className="absolute top-8 left-12 w-20 opacity-70 select-none pointer-events-none"
      />
      <img
        src="/assets/environment/cloud.svg"
        alt=""
        className="absolute top-12 right-20 w-24 opacity-80 select-none pointer-events-none"
      />

      {/* Floating 3D Grass Cube with Yellow Flower on bottom-left */}
      <div className="absolute left-6 bottom-8 w-20 h-20 select-none pointer-events-none hidden sm:block">
        <img
          src="/assets/environment/floating-island-3d.svg"
          alt=""
          className="w-full h-full object-contain animate-bounce duration-1000"
        />
      </div>

      {/* Hero Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto z-10 py-6">
        {/* Main Title in Blocky Heading */}
        <h1 className="font-black text-4xl sm:text-6xl text-[#111111] tracking-tight mb-3">
          Let&apos;s Chat
        </h1>
        <p className="font-extrabold text-base sm:text-xl text-slate-800 mb-8">
          Meet new people. Have fun conversations.
        </p>

        {/* 4 Feature Pills in a Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
          <div className="bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl mb-1">🎲</span>
            <span className="font-black text-xs text-[#111111]">Random</span>
            <span className="text-[10px] font-bold text-slate-500">Instant Match</span>
          </div>

          <div className="bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl mb-1">🛡️</span>
            <span className="font-black text-xs text-[#111111]">Safe</span>
            <span className="text-[10px] font-bold text-slate-500">Zero Abuse</span>
          </div>

          <div className="bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl mb-1">⚡</span>
            <span className="font-black text-xs text-[#111111]">Easy</span>
            <span className="text-[10px] font-bold text-slate-500">No Account</span>
          </div>

          <div className="bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl mb-1">💛</span>
            <span className="font-black text-xs text-[#111111]">Friendly</span>
            <span className="text-[10px] font-bold text-slate-500">Good Vibes</span>
          </div>
        </div>

        {/* Big Start Chatting Button */}
        <button
          type="button"
          onClick={onStartChatting}
          className="lc-btn px-10 py-4 text-xl sm:text-2xl flex items-center gap-3 mb-2"
        >
          <span>Start Chatting</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
        <span className="text-xs font-bold text-slate-600">
          It&apos;s free and easy!
        </span>
      </div>

      {/* Right Visual: Pixel Character standing on floating grass block */}
      <div className="absolute right-8 bottom-6 select-none pointer-events-none hidden md:flex flex-col items-center">
        <div className="w-24 h-24 -mb-4 z-10">
          <img
            src="/assets/characters/player-blue.svg"
            alt="Player Waving"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-24 h-20">
          <img
            src="/assets/environment/floating-island-3d.svg"
            alt="Grass Island"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
