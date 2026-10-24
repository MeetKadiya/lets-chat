'use client';

import React from 'react';
import { Play, FastForward, Mic, PhoneOff, Sparkles, Hash } from 'lucide-react';
import { ChatMode } from '@strangerconnect/shared';

interface MatchCardProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
  selectedInterests?: string[];
  onOpenInterests?: () => void;
}

export function MatchCard({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
  selectedInterests = [],
  onOpenInterests = () => {},
}: MatchCardProps) {
  return (
    <div className="w-full space-y-4">
      {/* Ready to connect Card */}
      <div className="w-full bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_4px_0_#252820] rounded-2xl p-5 sm:p-6 text-center space-y-3">
        {/* Topic / Interest chips (if selected) */}
        {selectedInterests.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pb-1">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                onClick={onOpenInterests}
                className="px-2.5 py-0.5 rounded-lg bg-[#EAF5D5] border border-[#252820] text-xs font-bold text-[#252820] cursor-pointer hover:bg-white transition-colors"
              >
                #{interest}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">👦</span>
            <h3 className="text-lg sm:text-xl font-black text-[#252820]">
              Ready to make a new connection?
            </h3>
            <span className="text-base text-amber-500">✨</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Click the button below to start chatting!
          </p>
        </div>

        {/* Mode Switcher Pill */}
        <div className="inline-flex items-center p-1 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black">
          <button
            type="button"
            onClick={() => onSelectMode('video')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              selectedMode === 'video' || selectedMode === 'both'
                ? 'bg-[#65A843] text-white shadow'
                : 'text-slate-600 hover:text-[#252820]'
            }`}
          >
            Video Chat
          </button>
          <button
            type="button"
            onClick={() => onSelectMode('text')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              selectedMode === 'text'
                ? 'bg-[#65A843] text-white shadow'
                : 'text-slate-600 hover:text-[#252820]'
            }`}
          >
            Text Chat
          </button>
        </div>

        {/* Big Chunky Green CTA Button */}
        <button
          type="button"
          onClick={onStart}
          disabled={isConnecting}
          className="mingleo-btn-green w-full py-4 px-6 text-base sm:text-lg font-black tracking-wide rounded-xl flex items-center justify-center gap-2.5 transition-all"
        >
          <Play className="w-5 h-5 fill-white stroke-none" />
          <span>{isConnecting ? 'Finding Stranger...' : 'Start Chatting Now'}</span>
        </button>
      </div>

      {/* Chunky Quick Action Buttons Below (Next, Mute, End) */}
      <div className="flex items-center justify-center gap-6 pt-1">
        {/* Next */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={onStart}
            className="w-12 h-12 rounded-full mingleo-btn-white flex items-center justify-center text-[#252820]"
            title="Next Stranger"
          >
            <FastForward className="w-5 h-5 fill-[#252820]" />
          </button>
          <span className="text-xs font-black text-[#252820]">Next</span>
        </div>

        {/* Mute */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            className="w-12 h-12 rounded-full mingleo-btn-white flex items-center justify-center text-[#252820]"
            title="Mute Mic"
          >
            <Mic className="w-5 h-5" />
          </button>
          <span className="text-xs font-black text-[#252820]">Mute</span>
        </div>

        {/* End */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            className="w-12 h-12 rounded-full mingleo-btn-red flex items-center justify-center text-white"
            title="End Chat"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
          <span className="text-xs font-black text-[#252820]">End</span>
        </div>
      </div>
    </div>
  );
}
