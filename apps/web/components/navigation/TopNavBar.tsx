'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Hash,
  Sparkles,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';

interface TopNavBarProps {
  onOpenSafety: () => void;
  onOpenInterests: () => void;
  selectedInterestsCount?: number;
}

export function TopNavBar({
  onOpenSafety,
  onOpenInterests,
  selectedInterestsCount = 0,
}: TopNavBarProps) {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between z-30">
      {/* Brand Identity */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/35 transition-all">
          <div className="w-full h-full bg-[#0B0F19] rounded-2xl flex items-center justify-center">
            {/* Custom geometric conversational rings logo */}
            <svg
              className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <circle cx="12" cy="11" r="3" fill="currentColor" fillOpacity="0.25" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
            Let&apos;s <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Chat</span>
          </span>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400">
            Anonymous &bull; Ephemeral
          </span>
        </div>
      </Link>

      {/* Center Live Network Counter (Desktop) */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-slate-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>1,840 Strangers Online</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Interests Quick Filter */}
        <button
          type="button"
          onClick={onOpenInterests}
          className={`glass-pill px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            selectedInterestsCount > 0 ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' : 'text-slate-300'
          }`}
          title="Filter by interests"
        >
          <Hash className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Interests</span>
          {selectedInterestsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-black text-[10px]">
              {selectedInterestsCount}
            </span>
          )}
        </button>

        {/* Safety & Guidelines */}
        <button
          type="button"
          onClick={onOpenSafety}
          className="glass-pill px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
          title="Community safety guidelines"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Safety</span>
        </button>

        {/* Privacy Link */}
        <Link
          href="/privacy"
          className="glass-pill p-2 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
          title="Zero-logging privacy policy"
        >
          <Lock className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Privacy</span>
        </Link>
      </div>
    </header>
  );
}
