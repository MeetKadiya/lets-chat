'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TopNavBar } from '../components/navigation/TopNavBar';
import { HeroSection } from '../components/landing/HeroSection';
import { SafetyLabModal } from '../components/modals/SafetyLabModal';
import { InterestsModal } from '../components/modals/InterestsModal';
import { ChatMode } from '@strangerconnect/shared';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ChatMode>('video');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  // Modals state
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    const query = new URLSearchParams({
      mode: selectedMode,
      ...(selectedInterests.length > 0 && { interests: selectedInterests.join(',') }),
    });
    router.push(`/chat?${query.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070A11] obsidian-bg text-slate-100 relative overflow-hidden">
      {/* Top Navigation Bar */}
      <TopNavBar
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenInterests={() => setIsInterestsOpen(true)}
        selectedInterestsCount={selectedInterests.length}
      />

      {/* Central Screen Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <HeroSection
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStart={handleStart}
          isConnecting={isStarting}
          selectedInterests={selectedInterests}
          onOpenInterests={() => setIsInterestsOpen(true)}
          onInterestsChange={setSelectedInterests}
        />
      </main>

      {/* Clean Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto py-5 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 z-10 gap-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Strict 18+ Peer-to-Peer Anonymous Communication</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/safety" className="hover:text-cyan-400 transition-colors">
            Community Guidelines
          </Link>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>

      {/* Modals */}
      <SafetyLabModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      <InterestsModal
        isOpen={isInterestsOpen}
        onClose={() => setIsInterestsOpen(false)}
        selectedInterests={selectedInterests}
        onChange={setSelectedInterests}
      />
    </div>
  );
}
