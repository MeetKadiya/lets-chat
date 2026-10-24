'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ChatContainer } from '../../components/chat/ChatContainer';

function ChatRoomInner() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'text';
  const rawInterests = searchParams.get('interests');
  const interests = rawInterests ? rawInterests.split(',') : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#070A11] obsidian-bg text-slate-100">
      {/* Mini Header */}
      <header className="h-14 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Exit to Home</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <svg
              className="w-4 h-4 text-white"
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
          <span className="font-extrabold text-sm tracking-tight text-white">
            Let&apos;s <span className="text-cyan-400">Chat</span>
          </span>
        </div>

        <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5 font-medium">
          <span>Press</span>
          <kbd className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-slate-200 font-mono text-[10px]">Esc</kbd>
          <span>for Next Stranger</span>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 p-0 sm:p-4 flex items-center justify-center">
        <ChatContainer />
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading chat...</div>}>
      <ChatRoomInner />
    </Suspense>
  );
}
