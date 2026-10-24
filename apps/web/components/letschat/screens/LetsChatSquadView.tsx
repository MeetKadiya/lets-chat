'use client';

import React, { useState } from 'react';
import { LetsChatSquadPanel } from '../LetsChatSquadPanel';
import { LetsChatSquadCard } from '../LetsChatSquadCard';
import { EnterSquadCodeModal } from '../../modals/EnterSquadCodeModal';
import { SquadHelpModal } from '../../modals/SquadHelpModal';

interface LetsChatSquadViewProps {
  onStartSquad?: () => void;
  onSwitchSolo?: () => void;
}

export function LetsChatSquadView({
  onStartSquad = () => {},
  onSwitchSolo = () => {},
}: LetsChatSquadViewProps) {
  const [squadCode, setSquadCode] = useState('887 123');
  const [squadMemberName, setSquadMemberName] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEnterCodeOpen, setIsEnterCodeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleRegenerateCode = () => {
    const firstPart = Math.floor(100 + Math.random() * 900);
    const secondPart = Math.floor(100 + Math.random() * 900);
    setSquadCode(`${firstPart} ${secondPart}`);
  };

  const handleJoinCode = (code: string) => {
    // Simulated friend join
    setSquadMemberName('Alex_Gamer');
    setIsEnterCodeOpen(false);
  };

  const handleStart = () => {
    setIsConnecting(true);
    onStartSquad();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Duo Squad Visualizer (4 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <LetsChatSquadPanel
            squadMemberName={squadMemberName}
            squadCode={squadCode}
            onCopyCode={() => {
              navigator.clipboard.writeText(squadCode.replace(/\s+/g, ''));
            }}
            onOpenEnterCode={() => setIsEnterCodeOpen(true)}
          />
        </div>

        {/* Right Column: Squad Party Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <LetsChatSquadCard
            onSelectTab={(tab) => {
              if (tab === 'solo') onSwitchSolo();
            }}
            onOpenSquadHelp={() => setIsHelpOpen(true)}
            onOpenEnterCode={() => setIsEnterCodeOpen(true)}
            squadMemberName={squadMemberName}
            onStartSquadChat={handleStart}
            isConnecting={isConnecting}
            squadCode={squadCode}
            onRegenerateCode={handleRegenerateCode}
          />
        </div>
      </div>

      {/* Modals */}
      <EnterSquadCodeModal
        isOpen={isEnterCodeOpen}
        onClose={() => setIsEnterCodeOpen(false)}
        onJoin={handleJoinCode}
      />

      <SquadHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
