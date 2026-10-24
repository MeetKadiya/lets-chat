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
    <div className="flex items-center justify-center gap-3 p-2 bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-2xl">
      <button
        type="button"
        onClick={onToggleAudio}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black transition-all active:translate-y-0.5 active:shadow-none ${
          isAudioMuted
            ? 'bg-rose-100 text-rose-700'
            : 'bg-white text-[#252820] hover:bg-[#EAF5D5]'
        }`}
        title={isAudioMuted ? 'Unmute microphone' : 'Mute microphone'}
      >
        {isAudioMuted ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-[#65A843]" />}
        <span>{isAudioMuted ? 'Unmute' : 'Mute'}</span>
      </button>

      <button
        type="button"
        onClick={onToggleVideo}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black transition-all active:translate-y-0.5 active:shadow-none ${
          isVideoDisabled
            ? 'bg-rose-100 text-rose-700'
            : 'bg-white text-[#252820] hover:bg-[#EAF5D5]'
        }`}
        title={isVideoDisabled ? 'Turn camera on' : 'Turn camera off'}
      >
        {isVideoDisabled ? <VideoOff className="w-4 h-4 text-rose-600" /> : <Video className="w-4 h-4 text-[#65A843]" />}
        <span>{isVideoDisabled ? 'Start Video' : 'Stop Video'}</span>
      </button>
    </div>
  );
}
