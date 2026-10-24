'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Flag } from 'lucide-react';
import { ChatContainer } from '../../components/chat/ChatContainer';

function ChatRoomInner() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E8F2DF] text-[#111111] select-none">
      {/* Top Header */}
      <header className="h-16 bg-[#FFF9E9] border-b-2 border-[#111111] px-4 sm:px-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-slate-50 transition-all active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
          <span>Exit to Home</span>
        </Link>

        {/* Center: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8">
            <img src="/assets/logo/logo-bubble.svg" alt="Let's Chat" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-xl text-[#111111] tracking-tight">Let&apos;s Chat</span>
        </Link>

        {/* Right: Shortcut Hint */}
        <div className="text-xs font-bold text-slate-700 hidden sm:flex items-center gap-1.5">
          <span>Press</span>
          <kbd className="px-2 py-0.5 rounded-lg bg-white border-2 border-[#111111] shadow-[0_1px_0_#111111] font-mono font-black text-[11px] text-[#111111]">
            Esc
          </kbd>
          <span>for Next Stranger</span>
        </div>
      </header>

      {/* Main Chat Workspace */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex items-center justify-center">
        <ChatContainer />
      </main>

      {/* Bottom Friendly Banner: 🤍 Be kind. Be respectful. Have fun! */}
      <footer className="py-2.5 px-4 bg-[#FFF9E9] border-t-2 border-[#111111] text-center text-xs font-black text-[#111111] flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
        <span>Be kind. Be respectful. Have fun!</span>
      </footer>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#E8F2DF] flex flex-col items-center justify-center text-[#111111] font-black">
          <div className="w-10 h-10 border-4 border-[#65C93F] border-t-transparent rounded-full animate-spin mb-4" />
          <p>Connecting to Let&apos;s Chat...</p>
        </div>
      }
    >
      <ChatRoomInner />
    </Suspense>
  );
}
