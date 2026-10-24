'use client';

import React, { useState } from 'react';
import { ChatMode } from '@strangerconnect/shared';
import { WebcamPreview } from './WebcamPreview';
import { MatchCard } from './MatchCard';

interface HeroSectionProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
  selectedInterests?: string[];
  onOpenInterests?: () => void;
}

export function HeroSection({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
  selectedInterests = [],
  onOpenInterests = () => {},
}: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-6">
      {/* Central Interactive Arena — 2 Columns (Webcam on Left, Match on Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center justify-center max-w-4xl mx-auto">
        {/* Left Column: Live Selfie Camera Preview */}
        <div className="w-full flex justify-center">
          <WebcamPreview
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            onToggleMic={() => setIsMuted(!isMuted)}
            onToggleVideo={() => setIsVideoOff(!isVideoOff)}
          />
        </div>

        {/* Right Column: Matchmaker Social Card */}
        <div className="w-full flex justify-center">
          <MatchCard
            selectedMode={selectedMode}
            onSelectMode={onSelectMode}
            onStart={onStart}
            isConnecting={isConnecting}
            selectedInterests={selectedInterests}
            onOpenInterests={onOpenInterests}
          />
        </div>
      </div>

      {/* Accessible Mode Options & Quick Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
        <button
          type="button"
          onClick={() => onSelectMode('text')}
          className={`px-4 py-2 rounded-full font-bold transition-all ${
            selectedMode === 'text'
              ? 'bg-brand-yellow text-slate-900 shadow-md'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          Text Chat
        </button>
        <button
          type="button"
          onClick={() => onSelectMode('video')}
          className={`px-4 py-2 rounded-full font-bold transition-all ${
            selectedMode === 'video'
              ? 'bg-brand-yellow text-slate-900 shadow-md'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          Video Chat
        </button>
        <button
          type="button"
          onClick={onStart}
          className="sr-only"
        >
          Start Chatting Now
        </button>
      </div>
    </div>
  );
}
