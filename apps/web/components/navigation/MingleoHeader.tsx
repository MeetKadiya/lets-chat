'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Info, ShieldCheck, Gem, ChevronDown, User, Heart, Settings, LogOut, Sparkles } from 'lucide-react';
import { MingleoLogo } from '../common/MingleoLogo';

interface MingleoHeaderProps {
  onOpenProfile?: () => void;
  onOpenPricing?: () => void;
  onOpenInterests?: () => void;
  onOpenFriends?: () => void;
  onOpenSafety?: () => void;
  onOpenSettings?: () => void;
  username?: string;
}

export function MingleoHeader({
  onOpenProfile,
  onOpenPricing,
  onOpenInterests,
  onOpenFriends,
  onOpenSafety,
  onOpenSettings,
  username = 'Player123',
}: MingleoHeaderProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isChatActive = pathname === '/chat' || pathname === '/';
  const isSafetyActive = pathname === '/safety';

  return (
    <header className="w-full max-w-6xl mx-auto px-4 pt-4 pb-2 z-40">
      <div className="w-full bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_4px_0_#252820] rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <MingleoLogo size="md" href="/" />

        {/* Center: Main Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-black text-[#252820]">
          {/* Chat Link */}
          <Link
            href="/"
            className="flex items-center gap-2 relative py-1 hover:text-[#316B25] transition-colors"
          >
            <div className="w-4 h-4 text-[#65A843]">💬</div>
            <span>Chat</span>
            {isChatActive && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#65A843] rounded-full" />
            )}
          </Link>

          {/* About / How it works */}
          <Link
            href="/safety"
            className="flex items-center gap-1.5 py-1 text-slate-700 hover:text-[#252820] transition-colors"
          >
            <Info className="w-4 h-4 text-[#252820]" />
            <span>About</span>
          </Link>

          {/* Safety */}
          <button
            type="button"
            onClick={onOpenSafety}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              isSafetyActive ? 'text-[#316B25] font-black' : 'text-slate-700 hover:text-[#252820]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#252820]" />
            <span>Safety</span>
          </button>

          {/* Pricing */}
          <button
            type="button"
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 py-1 text-slate-700 hover:text-[#252820] transition-colors"
          >
            <Gem className="w-4 h-4 text-[#65A843]" />
            <span>Pricing</span>
          </button>
        </nav>

        {/* Right: User Pill / Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_3px_0_#252820] hover:bg-[#F4EBD9] transition-all"
          >
            {/* Pixel Character Avatar */}
            <div className="w-6 h-6 rounded-md bg-[#65A843] border border-[#252820] flex items-center justify-center text-xs overflow-hidden select-none">
              👦
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#252820]">
              {username}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#252820]" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_5px_0_#252820] rounded-xl p-2 z-50 animate-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenProfile?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#252820] hover:bg-[#EAF5D5] transition-colors text-left"
              >
                <User className="w-4 h-4 text-[#65A843]" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenInterests?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#252820] hover:bg-[#EAF5D5] transition-colors text-left"
              >
                <span className="text-sm">🏷️</span>
                <span>Interests & Matching</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenFriends?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#252820] hover:bg-[#EAF5D5] transition-colors text-left"
              >
                <span className="text-sm">👥</span>
                <span>Friends & Chats</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenPricing?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#252820] hover:bg-[#EAF5D5] transition-colors text-left"
              >
                <Gem className="w-4 h-4 text-[#65A843]" />
                <span>Mingleo Plus</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenSettings?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#252820] hover:bg-[#EAF5D5] transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-[#252820]" />
                <span>Settings</span>
              </button>

              <div className="h-[1px] bg-[#252820]/15 my-1" />

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  window.location.reload();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
