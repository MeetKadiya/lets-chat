'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Maximize2,
  Gift,
  Hash,
  Crown,
  History,
  MessageCircle,
  X,
} from 'lucide-react';

interface TopNavBarProps {
  onOpenSafety: () => void;
  onOpenPlus: () => void;
  onOpenMessages: () => void;
  onOpenProfile: () => void;
  onOpenInterests: () => void;
  onOpenCoins: () => void;
  onToggleTheater?: () => void;
  isTheaterMode?: boolean;
  selectedInterestsCount?: number;
}

export function TopNavBar({
  onOpenSafety,
  onOpenPlus,
  onOpenMessages,
  onOpenProfile,
  onOpenInterests,
  onOpenCoins,
  onToggleTheater,
  isTheaterMode,
  selectedInterestsCount = 0,
}: TopNavBarProps) {
  return (
    <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-30">
      {/* Left Pill Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Safety Lab */}
        <button
          type="button"
          onClick={onOpenSafety}
          className="nav-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold hover:shadow-lg transition-all"
        >
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span>Safety Lab</span>
        </button>

        {/* Theater Mode */}
        <button
          type="button"
          onClick={onToggleTheater}
          className={`nav-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
            isTheaterMode ? 'bg-white/30 border-white/40' : ''
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Theater Mode</span>
        </button>

        {/* Free Coins */}
        <button
          type="button"
          onClick={onOpenCoins}
          className="nav-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all"
        >
          <span className="text-sm">🪙</span>
          <span className="text-yellow-300 font-bold hidden sm:inline">Free Coins</span>
        </button>
      </div>

      {/* Right Circular Icon Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* # Interests / Hashtags */}
        <button
          type="button"
          onClick={onOpenInterests}
          className="nav-circle-btn relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base"
          title="Topics & Interests"
        >
          <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-brand-purple" />
          {selectedInterestsCount > 0 && (
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-brand-yellow text-black font-extrabold text-[9px] rounded-full">
              {selectedInterestsCount}
            </span>
          )}
        </button>

        {/* Crown / VIP Plus */}
        <button
          type="button"
          onClick={onOpenPlus}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-yellow text-slate-900 flex items-center justify-center font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all"
          title="Mingleo Plus"
        >
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900 fill-amber-900" />
        </button>

        {/* History / Recent Chats */}
        <button
          type="button"
          onClick={onOpenSafety}
          className="nav-circle-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white"
          title="History & Guidelines"
        >
          <History className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
        </button>

        {/* Messages / Notifications */}
        <button
          type="button"
          onClick={onOpenMessages}
          className="nav-circle-btn relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white"
          title="Messages"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
            4
          </span>
        </button>

        {/* User Profile Avatar */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-800 border-2 border-emerald-500/50 flex items-center justify-center text-white font-bold text-sm sm:text-base hover:ring-2 hover:ring-white/40 transition-all"
          title="My Profile"
        >
          M
        </button>
      </div>
    </header>
  );
}
