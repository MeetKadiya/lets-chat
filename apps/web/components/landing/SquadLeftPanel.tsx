'use client';

import React from 'react';
import { WebcamPreview } from './WebcamPreview';

interface SquadLeftPanelProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  squadMemberName?: string | null;
  onInviteClick?: () => void;
}

export function SquadLeftPanel({
  isMuted,
  isVideoOff,
  onToggleMic,
  onToggleVideo,
  squadMemberName = null,
  onInviteClick,
}: SquadLeftPanelProps) {
  return (
    <div className="w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl bg-[#6f47fc] border-2 border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between">
      {/* Top Half: Duo Squad Members Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-white">
        <div className="flex items-center gap-6 sm:gap-8 my-auto">
          {/* My Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-700 border-2 border-emerald-400/40 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-xl">
              M
            </div>
            <span className="text-xs sm:text-sm font-bold text-white/90">Me</span>
          </div>

          {/* Plus Divider */}
          <div className="text-xl sm:text-2xl font-black text-white/80 select-none">
            +
          </div>

          {/* Partner Avatar / Sofa Placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center text-xl sm:text-2xl shadow-xl transition-all ${
              squadMemberName
                ? 'bg-blue-600 border-blue-400 text-white font-black'
                : 'bg-white/15 border-white/20 text-white/80'
            }`}>
              {squadMemberName ? squadMemberName.charAt(0).toUpperCase() : '🛋️'}
            </div>
            <span className="text-xs sm:text-sm font-bold text-white/90">
              {squadMemberName || 'Someone'}
            </span>
          </div>
        </div>

        {/* Invite Bar Banner */}
        <button
          type="button"
          onClick={onInviteClick}
          className="w-full py-2 px-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/10 text-xs sm:text-sm font-semibold text-white/90 text-center transition-colors"
        >
          {squadMemberName
            ? `Squad Ready with ${squadMemberName}!`
            : 'Invite friends to join squad'}
        </button>
      </div>

      {/* Bottom Half: Live Webcam Preview Feed */}
      <div className="p-2 sm:p-3 pt-0">
        <WebcamPreview
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          onToggleMic={onToggleMic}
          onToggleVideo={onToggleVideo}
          compact={true}
        />
      </div>
    </div>
  );
}
