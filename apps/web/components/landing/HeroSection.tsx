'use client';

import React, { useState } from 'react';
import { ChatMode } from '@strangerconnect/shared';
import { WebcamPreview } from './WebcamPreview';
import { MatchCard } from './MatchCard';
import { InterestChips } from './InterestChips';

interface HeroSectionProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
  selectedInterests?: string[];
  onOpenInterests?: () => void;
  onInterestsChange?: (interests: string[]) => void;
}

export function HeroSection({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
  selectedInterests = [],
  onOpenInterests = () => {},
  onInterestsChange = () => {},
}: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Central Interactive Arena — 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center justify-center max-w-4xl mx-auto">
        {/* Left Column: Live Frame Preview */}
        <div className="w-full flex justify-center">
          <WebcamPreview
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            onToggleMic={() => setIsMuted(!isMuted)}
            onToggleVideo={() => setIsVideoOff(!isVideoOff)}
          />
        </div>

        {/* Right Column: Social Matchmaker Card */}
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

      {/* Categorized Interest Chips Bar */}
      <div className="max-w-4xl mx-auto">
        <InterestChips
          selectedInterests={selectedInterests}
          onChange={onInterestsChange}
        />
      </div>

      {/* Accessible Start Trigger for Tests & Automation */}
      <button
        type="button"
        onClick={onStart}
        className="sr-only"
      >
        Start Chatting Now
      </button>
    </div>
  );
}
