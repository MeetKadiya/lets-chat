'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { ChatContainer } from '../../components/chat/ChatContainer';
import { MingleoLogo } from '../../components/common/MingleoLogo';

function ChatRoomInner() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9ED] text-[#252820] select-none">
      {/* Top Header */}
      <header className="h-16 bg-[#FFF9ED] border-b-2 border-[#252820] px-4 sm:px-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black text-[#252820] hover:bg-[#F4EBD9] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
          <span>Exit to Lobby</span>
        </Link>

        {/* Center: Brand Logo */}
        <MingleoLogo size="sm" href="/" />

        {/* Right: Shortcut Hint */}
        <div className="text-xs font-bold text-slate-600 hidden sm:flex items-center gap-1.5">
          <span>Press</span>
          <kbd className="px-2 py-0.5 rounded-lg bg-white border-2 border-[#252820] shadow-[0_1px_0_#252820] font-mono font-black text-[11px] text-[#252820]">
            Esc
          </kbd>
          <span>for Next</span>
        </div>
      </header>

      {/* Main Chat Workspace */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex items-center justify-center">
        <ChatContainer />
      </main>

      {/* Bottom Friendly Banner */}
      <footer className="py-2 px-4 bg-[#EAF5D5] border-t-2 border-[#252820] text-center text-xs font-bold text-[#252820] flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>Be kind. Be respectful. Have fun!</span>
      </footer>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9ED] flex flex-col items-center justify-center text-[#252820] font-black">
          <div className="w-10 h-10 border-4 border-[#65A843] border-t-transparent rounded-full animate-spin mb-4" />
          <p>Connecting to mingleo...</p>
        </div>
      }
    >
      <ChatRoomInner />
    </Suspense>
  );
}
