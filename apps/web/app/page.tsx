'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChatMode } from '@strangerconnect/shared';
import { MingleoHeader } from '../components/navigation/MingleoHeader';
import { HeroSection } from '../components/landing/HeroSection';
import { BlockyTerrain } from '../components/common/BlockyTerrain';
import { MingleoDashboardModal, MingleoTab } from '../components/mingleo/MingleoDashboardModal';

export default function LandingPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ChatMode>('video');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  // Unified Mingleo Dashboard Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<MingleoTab>('profile');

  const handleOpenTab = (tab: MingleoTab) => {
    setActiveModalTab(tab);
    setIsModalOpen(true);
  };

  const handleStart = () => {
    setIsStarting(true);
    const query = new URLSearchParams({
      mode: selectedMode,
      ...(selectedInterests.length > 0 && { interests: selectedInterests.join(',') }),
    });
    router.push(`/chat?${query.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF9ED] text-[#252820] relative overflow-hidden select-none">
      {/* Top Header Navigation */}
      <MingleoHeader
        onOpenProfile={() => handleOpenTab('profile')}
        onOpenPricing={() => handleOpenTab('pricing')}
        onOpenInterests={() => handleOpenTab('interests')}
        onOpenFriends={() => handleOpenTab('friends')}
        onOpenSafety={() => handleOpenTab('safety')}
        onOpenSettings={() => handleOpenTab('settings')}
        username="BlockyBuddy"
      />

      {/* Central Screen Area / Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <HeroSection
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStart={handleStart}
          isConnecting={isStarting}
          selectedInterests={selectedInterests}
          onOpenInterests={() => handleOpenTab('interests')}
        />
      </main>

      {/* Blocky Terrain with animated sheep, flowers, and tree */}
      <BlockyTerrain />

      {/* Friendly Bottom Safety Footer */}
      <footer className="w-full bg-[#5C3A20] text-[#FFF9ED]/80 py-2.5 px-6 flex flex-col sm:flex-row items-center justify-between text-xs font-bold z-20 gap-2 border-t border-[#252820]/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#65A843] animate-pulse" />
          <span>Strictly Moderated Peer-to-Peer Social Discovery • 18+</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleOpenTab('safety')}
            className="hover:text-white hover:underline transition-colors"
          >
            Safety Guidelines
          </button>
          <button
            type="button"
            onClick={() => handleOpenTab('pricing')}
            className="hover:text-white hover:underline transition-colors"
          >
            Mingleo Plus
          </button>
          <Link href="/safety" className="hover:text-white hover:underline transition-colors">
            Safety & Help
          </Link>
        </div>
      </footer>

      {/* Multi-Tabbed Mingleo Dashboard Modal */}
      <MingleoDashboardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={activeModalTab}
        selectedInterests={selectedInterests}
        onInterestsChange={setSelectedInterests}
      />
    </div>
  );
}
