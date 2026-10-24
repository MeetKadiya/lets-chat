'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Video, ShieldCheck, Lock, Zap, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/landing/HeroSection';
import { InterestPicker } from '../components/landing/InterestPicker';
import { ChatMode } from '@strangerconnect/shared';

export default function LandingPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ChatMode>('text');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    const query = new URLSearchParams({
      mode: selectedMode,
      ...(selectedInterests.length > 0 && { interests: selectedInterests.join(',') }),
    });
    router.push(`/chat?${query.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-slate-100">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-surface-200/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Stranger<span className="text-cyan-400">Connect</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <Link href="/safety" className="hover:text-cyan-400 transition-colors">
              Safety Guidelines
            </Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 flex flex-col items-center justify-center">
        <HeroSection
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStart={handleStart}
          isConnecting={isStarting}
        />

        <div className="w-full mt-4">
          <InterestPicker
            selectedInterests={selectedInterests}
            onChange={setSelectedInterests}
          />
        </div>

        {/* Feature Cards Grid */}
        <section className="max-w-4xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-200/50 border border-slate-800/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-2">Zero Identity Needed</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No registration, email, or passwords. Your session is generated in memory and disappears when you leave.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-200/50 border border-slate-800/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-2">Atomic Smart Matching</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prioritizes common topics and automatically relaxes wait times so you never sit in empty queues.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-200/50 border border-slate-800/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white mb-2">P2P Media & Safety</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Video travels directly peer-to-peer via WebRTC. Routine chats are never saved to disk.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-surface-200/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} StrangerConnect. Built for anonymous serendipity.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/safety" className="hover:text-slate-400">Community Safety</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
