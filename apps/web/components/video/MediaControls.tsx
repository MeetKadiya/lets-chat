'use client';

import React from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface MediaControlsProps {
  isAudioMuted: boolean;
  isVideoDisabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
}

export function MediaControls({
  isAudioMuted,
  isVideoDisabled,
  onToggleAudio,
  onToggleVideo,
}: MediaControlsProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-surface-200/90 border border-slate-800 rounded-xl">
      <button
        type="button"
        onClick={onToggleAudio}
        className={`p-2 rounded-lg border transition-all ${
          isAudioMuted
            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
            : 'bg-surface-100 border-slate-700 text-slate-200 hover:text-white'
        }`}
        title={isAudioMuted ? 'Unmute microphone' : 'Mute microphone'}
      >
        {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={onToggleVideo}
        className={`p-2 rounded-lg border transition-all ${
          isVideoDisabled
            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
            : 'bg-surface-100 border-slate-700 text-slate-200 hover:text-white'
        }`}
        title={isVideoDisabled ? 'Turn camera on' : 'Turn camera off'}
      >
        {isVideoDisabled ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
      </button>
    </div>
  );
}
