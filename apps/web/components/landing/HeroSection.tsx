'use client';

import React, { useState } from 'react';
import { ChatMode } from '@strangerconnect/shared';
import { WebcamPreview } from './WebcamPreview';
import { StrangerPreviewBox } from './StrangerPreviewBox';
import { FeaturesSidebar } from './FeaturesSidebar';
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
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* 2-Column Responsive Layout (Inspired by Minecraft & Gumroad) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Features & Community Values (lg: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <FeaturesSidebar />
        </div>

        {/* Right Column: Dual Video Stage & Start Action (lg: 8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Dual Video Screen Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left: Your Camera */}
            <WebcamPreview
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              onToggleMic={() => setIsMuted(!isMuted)}
              onToggleVideo={() => setIsVideoOff(!isVideoOff)}
            />

            {/* Right: Stranger Preview */}
            <StrangerPreviewBox isConnecting={isConnecting} />
          </div>

          {/* Action Card: Start Chatting & Chunky Controls */}
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
    </div>
  );
}
