'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Info, ShieldCheck, ChevronDown, User, Gem, Tag, MessageSquare, Settings, LogOut, Check } from 'lucide-react';

interface LetsChatNavProps {
  onOpenScreen?: (screenNumber: number) => void;
  username?: string;
}

export function LetsChatNav({
  onOpenScreen,
  username = 'Player123',
}: LetsChatNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isChatActive = pathname === '/' || pathname === '/chat';
  const isSafetyActive = pathname === '/safety';

  return (
    <nav className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] px-6 py-3.5 flex items-center justify-between shadow-[0_4px_0_#111111] min-h-[78px] z-30">
      {/* Left: Brand Logo & Wordmark */}
      <Link href="/" className="flex items-center gap-3.5 hover:opacity-90 transition-opacity">
        <div className="w-10 h-10 shrink-0">
          <img
            src="/assets/logo/logo-bubble.svg"
            alt="Let's Chat Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-black text-2xl sm:text-3xl text-[#111111] tracking-tight">
          Let&apos;s Chat
        </span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8 font-black text-sm text-[#111111]">
        {/* Chat Tab (Active) */}
        <Link
          href="/"
          className="flex items-center gap-2 relative py-1 hover:text-[#278344] transition-colors"
        >
          <img
            src="/assets/logo/logo-bubble.svg"
            alt=""
            className="w-4 h-4 object-contain inline"
          />
          <span>Chat</span>
          {isChatActive && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-[#65C93F] rounded-full" />
          )}
        </Link>

        {/* About */}
        <button
          type="button"
          onClick={() => onOpenScreen?.(7)}
          className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-[#111111] transition-colors font-black"
        >
          <div className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">
            i
          </div>
          <span>About</span>
        </button>

        {/* Safety */}
        <Link
          href="/safety"
          className={`flex items-center gap-1.5 py-1 font-black transition-colors ${
            isSafetyActive ? 'text-[#278344]' : 'text-slate-800 hover:text-[#111111]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#111111]" />
          <span>Safety</span>
        </Link>
      </div>

      {/* Right: User Profile Dropdown Pill */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] hover:bg-[#F4EBD9] transition-all cursor-pointer"
        >
          {/* Pixel Character Avatar */}
          <div className="w-6 h-6 rounded-md bg-[#4A2E18] border border-[#111111] overflow-hidden flex items-center justify-center shrink-0">
            <img
              src="/assets/characters/avatar-player123.svg"
              alt="Player Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-xs sm:text-sm text-[#111111]">
            {username}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#111111]" />
        </button>

        {/* Dropdown Menu to inspect all 8 screens */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_6px_0_#111111] rounded-2xl p-2 z-50 animate-in zoom-in-95 duration-100">
            <div className="px-3 py-2 border-b border-[#111111]/15 mb-1">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Let&apos;s Chat Screens
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(3);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <User className="w-4 h-4 text-[#278344]" />
              <span>Screen 3: Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(4);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <Gem className="w-4 h-4 text-[#65C93F]" />
              <span>Screen 4: Pricing & Subscription</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(5);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <Tag className="w-4 h-4 text-[#278344]" />
              <span>Screen 5: Interests & Matching</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(6);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <MessageSquare className="w-4 h-4 text-[#278344]" />
              <span>Screen 6: Chat History & Friends</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(7);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <ShieldCheck className="w-4 h-4 text-[#278344]" />
              <span>Screen 7: Safety & Privacy</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(8);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#111111]" />
              <span>Screen 8: Settings & Notifications</span>
            </button>

            <div className="h-[1px] bg-[#111111]/15 my-1" />

            <Link
              href="/chat"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#278344] hover:bg-[#E8F2DF] transition-colors text-left"
            >
              <span>Screen 2: Live Video Room →</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
