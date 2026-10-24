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
    <div className="min-h-screen flex flex-col bg-brand-purple brand-bg-pattern text-white">
      {/* Mini Header */}
      <header className="h-14 border-b border-white/10 bg-black/20 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-base shadow">
            🐵
          </div>
          <span className="font-black text-sm tracking-tight text-white">
            Let&apos;s Chat
          </span>
        </div>

        <div className="text-xs text-white/70 hidden sm:block">
          Press <kbd className="px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-white font-mono text-[10px]">Esc</kbd> for Next Stranger
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
