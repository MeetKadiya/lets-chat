'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  ChevronDown,
  User,
  Gem,
  Tag,
  MessageSquare,
  Settings,
  Users,
  Video,
  Info,
} from 'lucide-react';

interface LetsChatNavProps {
  onOpenScreen?: (screenNumber: number) => void;
  username?: string;
  activeMode?: 'solo' | 'squad';
  onSelectMode?: (mode: 'solo' | 'squad') => void;
}

export function LetsChatNav({
  onOpenScreen,
  username = 'Player123',
  activeMode = 'solo',
  onSelectMode,
}: LetsChatNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomeActive = pathname === '/' && activeMode === 'solo';
  const isSquadActive = pathname === '/squad' || (pathname === '/' && activeMode === 'squad');
  const isChatActive = pathname === '/chat';
  const isSafetyActive = pathname === '/safety';

  return (
    <nav className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_4px_0_#111111] min-h-[76px] z-30">
      {/* Left: Brand Logo & Wordmark */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-black text-sm text-[#111111]">
        {/* Chat Tab */}
        <Link
          href="/"
          onClick={() => onSelectMode?.('solo')}
          className={`flex items-center gap-1.5 relative py-1 transition-colors ${
            isHomeActive ? 'text-[#278344]' : 'text-slate-800 hover:text-[#111111]'
          }`}
        >
          <img
            src="/assets/logo/logo-bubble.svg"
            alt=""
            className="w-4 h-4 object-contain inline"
          />
          <span>Chat</span>
          {isHomeActive && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-[#65C93F] rounded-full" />
          )}
        </Link>

        {/* Squad Chat Rooms */}
        <Link
          href="/squad"
          onClick={() => onSelectMode?.('squad')}
          className={`flex items-center gap-1.5 relative py-1 transition-colors ${
            isSquadActive ? 'text-[#278344]' : 'text-slate-800 hover:text-[#111111]'
          }`}
        >
          <Users className="w-4 h-4 text-[#111111]" />
          <span>Squad Rooms</span>
          <span className="px-1.5 py-0.2 rounded-md bg-[#65C93F] text-[10px] text-white font-black border border-[#111111]">
            2v2
          </span>
          {isSquadActive && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-[#65C93F] rounded-full" />
          )}
        </Link>

        {/* Live Video Room CTA */}
        <Link
          href="/chat"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-[#111111] text-xs font-black transition-all ${
            isChatActive
              ? 'bg-[#65C93F] text-white shadow-[0_2px_0_#111111]'
              : 'bg-white text-[#111111] shadow-[0_2px_0_#111111] hover:bg-[#F4EBD9]'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Live Room</span>
        </Link>

        {/* Safety */}
        <Link
          href="/safety"
          className={`flex items-center gap-1.5 py-1 transition-colors ${
            isSafetyActive ? 'text-[#278344]' : 'text-slate-800 hover:text-[#111111]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#111111]" />
          <span>Safety</span>
        </Link>

        {/* About Modal */}
        <button
          type="button"
          onClick={() => onOpenScreen?.(7)}
          className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-[#111111] transition-colors font-black cursor-pointer"
        >
          <div className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold">
            i
          </div>
          <span>About</span>
        </button>
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

        {/* Polished Consumer Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_6px_0_#111111] rounded-2xl p-2 z-50 animate-in zoom-in-95 duration-100">
            <div className="px-3 py-2 border-b border-[#111111]/15 mb-1 flex items-center justify-between">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Account &amp; Features
              </p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                Online
              </span>
            </div>

            {/* Profile */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(3);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <User className="w-4 h-4 text-[#278344]" />
              <span>My Profile</span>
            </button>

            {/* Pricing / Plus */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(4);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <Gem className="w-4 h-4 text-[#65C93F]" />
              <span>Let&apos;s Chat Plus</span>
            </button>

            {/* Interests */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(5);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <Tag className="w-4 h-4 text-[#278344]" />
              <span>Interests &amp; Matching</span>
            </button>

            {/* Friends */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(6);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#278344]" />
              <span>Friends &amp; Chat History</span>
            </button>

            {/* Safety */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(7);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#278344]" />
              <span>Safety Center</span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenScreen?.(8);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black text-[#111111] hover:bg-[#E8F2DF] transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#111111]" />
              <span>Account Settings</span>
            </button>

            <div className="h-[1px] bg-[#111111]/15 my-1.5" />

            {/* Direct Section Links */}
            <Link
              href="/chat"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black text-white bg-[#65C93F] border border-[#111111] shadow-[0_2px_0_#111111] hover:brightness-105 transition-all text-left mb-1"
            >
              <div className="flex items-center gap-2">
                <Video className="w-3.5 h-3.5" />
                <span>Enter Live Video Chat</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              href="/squad"
              onClick={() => {
                setIsMenuOpen(false);
                onSelectMode?.('squad');
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black text-[#111111] bg-white border border-[#111111] shadow-[0_2px_0_#111111] hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#278344]" />
                <span>Squad Rooms (2v2 Party)</span>
              </div>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
