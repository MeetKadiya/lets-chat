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
    <div className="flex items-center justify-center gap-2 p-2 bg-white/[0.04] border border-white/10 rounded-2xl">
      <button
        type="button"
        onClick={onToggleAudio}
        className={`p-2.5 rounded-xl border transition-all ${
          isAudioMuted
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            : 'bg-white/10 border-white/10 text-slate-200 hover:text-white'
        }`}
        title={isAudioMuted ? 'Unmute microphone' : 'Mute microphone'}
      >
        {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={onToggleVideo}
        className={`p-2.5 rounded-xl border transition-all ${
          isVideoDisabled
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            : 'bg-white/10 border-white/10 text-slate-200 hover:text-white'
        }`}
        title={isVideoDisabled ? 'Turn camera on' : 'Turn camera off'}
      >
        {isVideoDisabled ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
      </button>
    </div>
  );
}
