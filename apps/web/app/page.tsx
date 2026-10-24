'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LetsChatNav } from '../components/letschat/LetsChatNav';
import { LetsChatInfoPanel } from '../components/letschat/LetsChatInfoPanel';
import { LetsChatVideoArena } from '../components/letschat/LetsChatVideoArena';
import { LetsChatStartCard } from '../components/letschat/LetsChatStartCard';
import { LetsChatFooterTerrain } from '../components/letschat/LetsChatFooterTerrain';
import { LetsChatScreensModal } from '../components/letschat/LetsChatScreensModal';

export default function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 8-Screen inspection modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['gaming', 'minecraft']);

  const handleStart = () => {
    setIsStarting(true);
    router.push('/chat');
  };

  const handleOpenScreen = (screenNumber: number) => {
    setModalScreen(screenNumber);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] relative select-none">
      {/* Floating Pixel Clouds in Background (Image 1) */}
      <div className="absolute top-16 left-6 w-24 opacity-80 pointer-events-none select-none hidden xl:block">
        <img
          src="/assets/environment/cloud.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute top-24 right-8 w-28 opacity-80 pointer-events-none select-none hidden xl:block">
        <img
          src="/assets/environment/cloud.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Main Content Shell */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-1 flex flex-col justify-between">
        {/* Navigation Bar */}
        <LetsChatNav
          onOpenScreen={handleOpenScreen}
          username="Player123"
        />

        {/* Main 2-Column Layout Grid (Left: Info Panel, Right: Video Arena + Start Card) */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 my-6 lg:my-8 items-stretch flex-1">
          {/* Left Column: Info Panel (~380px / 4 cols) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <LetsChatInfoPanel />
          </div>

          {/* Right Column: Video Grid & Start Chat Action Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4 sm:space-y-5 h-full">
            {/* Dual Video Screen Row */}
            <div className="flex-1 flex flex-col justify-center">
              <LetsChatVideoArena isConnecting={isStarting} />
            </div>

            {/* Action Card: Ready to make a new connection? */}
            <LetsChatStartCard
              onStart={handleStart}
              isConnecting={isStarting}
            />
          </div>
        </main>
      </div>

      {/* Living Ground Terrain Footer with Sheep, Yellow Flower, Call Controls, Red Flower, and Full Tree */}
      <LetsChatFooterTerrain
        onNext={handleStart}
        onToggleMute={() => setIsMuted(!isMuted)}
        onEndCall={() => router.push('/')}
        isMuted={isMuted}
      />

      {/* 8-Screen Interactive Reconstructed Features Modal */}
      <LetsChatScreensModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialScreen={modalScreen}
        onStartChatting={handleStart}
        selectedInterests={selectedInterests}
        onInterestsChange={setSelectedInterests}
      />
    </div>
  );
}
