'use client';

import React from 'react';
import { VideoPanel } from './VideoPanel';
import { MediaControls } from './MediaControls';
import { AlertCircle } from 'lucide-react';

interface VideoContainerProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  permissionError: string | null;
  isAudioMuted: boolean;
  isVideoDisabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  sessionState?: string;
}

export function VideoContainer({
  localStream,
  remoteStream,
  permissionError,
  isAudioMuted,
  isVideoDisabled,
  onToggleAudio,
  onToggleVideo,
}: VideoContainerProps) {
  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Camera/Mic Permission alert if denied */}
      {permissionError && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-100 border-2 border-[#252820] shadow-[0_2px_0_#252820] text-amber-900 text-xs font-bold">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <span>{permissionError}</span>
        </div>
      )}

      {/* Video Panels Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-[260px]">
        {/* Remote stranger video */}
        <VideoPanel
          stream={remoteStream}
          isLocal={false}
          label="Stranger"
        />

        {/* Local user video */}
        <VideoPanel
          stream={localStream}
          isLocal={true}
          label="You"
          isMuted={true}
          isVideoOff={isVideoDisabled}
        />
      </div>

      {/* Local Media Toggles */}
      <div className="flex justify-center pt-1">
        <MediaControls
          isAudioMuted={isAudioMuted}
          isVideoDisabled={isVideoDisabled}
          onToggleAudio={onToggleAudio}
          onToggleVideo={onToggleVideo}
        />
      </div>
    </div>
  );
}
