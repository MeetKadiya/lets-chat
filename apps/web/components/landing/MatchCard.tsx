'use client';

import React from 'react';
import { Video, MessageSquare, Sparkles, Hash, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ChatMode } from '@strangerconnect/shared';

interface MatchCardProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
  selectedInterests: string[];
  onOpenInterests: () => void;
}

export function MatchCard({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
  selectedInterests,
  onOpenInterests,
}: MatchCardProps) {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] rounded-3xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-white overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Mode Selector Tabs */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/[0.04] border border-white/10 w-full max-w-xs text-xs font-bold shadow-inner">
          <button
            type="button"
            onClick={() => onSelectMode('video')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedMode === 'video' || selectedMode === 'both'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-extrabold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Chat</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('text')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedMode === 'text'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-extrabold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Text Chat</span>
          </button>
        </div>
      </div>

      {/* Center Console Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4 my-auto">
        {/* Brand Orb Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/10 border border-white/15 shadow-xl flex items-center justify-center">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 drop-shadow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <circle cx="12" cy="11" r="3" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Title and Purpose */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Instant Anonymous Match
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            {selectedInterests.length > 0
              ? `Prioritizing strangers matching your ${selectedInterests.length} selected interests.`
              : 'Pair with friendly strangers across the globe in seconds.'}
          </p>
        </div>

        {/* Interests Quick Bar */}
        {selectedInterests.length > 0 ? (
          <button
            type="button"
            onClick={onOpenInterests}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
          >
            <Hash className="w-3 h-3 text-cyan-400" />
            <span>
              {selectedInterests.slice(0, 3).map((t) => `#${t}`).join(' ')}
              {selectedInterests.length > 3 ? ` +${selectedInterests.length - 3} more` : ''}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenInterests}
            className="text-xs text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 underline underline-offset-4"
          >
            <Hash className="w-3 h-3" />
            <span>Filter by topic / shared interests</span>
          </button>
        )}
      </div>

      {/* Bottom CTA Button & Trust Footnote */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-2.5">
        <button
          type="button"
          onClick={onStart}
          disabled={isConnecting}
          className="w-full py-3.5 sm:py-4 rounded-2xl btn-electric text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group transition-all"
        >
          {isConnecting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Connecting to Matchmaker...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{selectedMode === 'text' ? 'Start Text Chat' : 'Start Video Chat'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </button>

        {/* Privacy & Safety Footnote */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Strict 18+</span>
          </span>
          <span>&bull;</span>
          <span>Peer-to-Peer</span>
          <span>&bull;</span>
          <span>No Transcripts Stored</span>
        </div>
      </div>
    </div>
  );
}
