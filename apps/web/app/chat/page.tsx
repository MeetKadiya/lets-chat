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
    <div className="min-h-screen flex flex-col bg-background text-slate-100">
      {/* Mini Header */}
      <header className="h-14 border-b border-slate-800 bg-surface-200/50 backdrop-blur-md px-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            Let&apos;s <span className="text-cyan-400">Chat</span>
          </span>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-surface-100 border border-slate-700 text-slate-300 font-mono text-[10px]">Esc</kbd> for Next Stranger
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
