'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LetsChatNav } from '../../components/letschat/LetsChatNav';
import { LetsChatSquadView } from '../../components/letschat/screens/LetsChatSquadView';
import { LetsChatFooterTerrain } from '../../components/letschat/LetsChatFooterTerrain';
import { LetsChatScreensModal } from '../../components/letschat/LetsChatScreensModal';

export default function SquadPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['gaming', 'minecraft']);

  const handleStartSquad = () => {
    router.push('/chat?mode=squad');
  };

  const handleOpenScreen = (screenNumber: number) => {
    setModalScreen(screenNumber);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] relative select-none">
      {/* Floating Pixel Clouds */}
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

      {/* Top Main Shell */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-1 flex flex-col justify-between">
        {/* Navigation Bar */}
        <LetsChatNav
          onOpenScreen={handleOpenScreen}
          username="Player123"
          activeMode="squad"
          onSelectMode={(mode) => {
            if (mode === 'solo') router.push('/');
          }}
        />

        {/* Main Content Area */}
        <main className="my-6 lg:my-8 flex-1 flex flex-col justify-center">
          <LetsChatSquadView
            onStartSquad={handleStartSquad}
            onSwitchSolo={() => router.push('/')}
          />
        </main>
      </div>

      {/* Living Ground Terrain Footer */}
      <LetsChatFooterTerrain
        onNext={handleStartSquad}
        onToggleMute={() => setIsMuted(!isMuted)}
        onEndCall={() => router.push('/')}
        isMuted={isMuted}
      />

      {/* Feature Screens Modal */}
      <LetsChatScreensModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialScreen={modalScreen}
        onStartChatting={handleStartSquad}
        selectedInterests={selectedInterests}
        onInterestsChange={setSelectedInterests}
      />
    </div>
  );
}
