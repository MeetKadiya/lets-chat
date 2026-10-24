'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TopNavBar } from '../components/navigation/TopNavBar';
import { HeroSection } from '../components/landing/HeroSection';
import { ProfileModal } from '../components/modals/ProfileModal';
import { MessagesModal } from '../components/modals/MessagesModal';
import { PlusSubscriptionModal } from '../components/modals/PlusSubscriptionModal';
import { SafetyLabModal } from '../components/modals/SafetyLabModal';
import { FreeCoinsModal } from '../components/modals/FreeCoinsModal';
import { InterestsModal } from '../components/modals/InterestsModal';
import { ChatMode } from '@strangerconnect/shared';

export default function LandingPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ChatMode>('video');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isCoinsOpen, setIsCoinsOpen] = useState(false);
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
    <div className="min-h-screen flex flex-col justify-between bg-brand-purple brand-bg-pattern text-white relative overflow-hidden select-none">
      {/* Subtle Floating Watermark Icons in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06] select-none flex flex-wrap justify-around items-center p-8">
        <span className="text-8xl">🐵</span>
        <span className="text-7xl">💬</span>
        <span className="text-9xl">⚡</span>
        <span className="text-8xl">✨</span>
        <span className="text-7xl">🐵</span>
        <span className="text-9xl">💬</span>
        <span className="text-8xl">🐵</span>
        <span className="text-7xl">⚡</span>
      </div>

      {/* Top Navigation Bar */}
      <TopNavBar
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenPlus={() => setIsPlusOpen(true)}
        onOpenMessages={() => setIsMessagesOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenInterests={() => setIsInterestsOpen(true)}
        onOpenCoins={() => setIsCoinsOpen(true)}
        onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
        isTheaterMode={isTheaterMode}
        selectedInterestsCount={selectedInterests.length}
      />

      {/* Central Screen Area */}
      <main className={`flex-1 flex flex-col items-center justify-center transition-all ${
        isTheaterMode ? 'max-w-7xl mx-auto w-full scale-105' : 'w-full'
      }`}>
        <HeroSection
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStart={handleStart}
          isConnecting={isStarting}
          selectedInterests={selectedInterests}
          onOpenInterests={() => setIsInterestsOpen(true)}
        />
      </main>

      {/* Clean Bottom Footer */}
      <footer className="w-full py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 z-10 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Strict 18+ Peer-to-Peer Anonymous Social Network</span>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/safety" className="hover:text-white transition-colors">
            Safety Guidelines
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>

      {/* Interactive Popovers and Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenPlus={() => setIsPlusOpen(true)}
      />

      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />

      <PlusSubscriptionModal
        isOpen={isPlusOpen}
        onClose={() => setIsPlusOpen(false)}
      />

      <SafetyLabModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      <FreeCoinsModal
        isOpen={isCoinsOpen}
        onClose={() => setIsCoinsOpen(false)}
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
