'use client';

import React, { useEffect, useRef } from 'react';
import { VideoOff } from 'lucide-react';

interface VideoPanelProps {
  stream: MediaStream | null;
  isLocal: boolean;
  label: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
}

export function VideoPanel({
  stream,
  isLocal,
  label,
  isMuted = false,
  isVideoOff = false,
}: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const hasActiveStream = !!stream && !isVideoOff;

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-[#8BC9F6] rounded-[22px] overflow-hidden border-[3px] border-[#111111] shadow-[0_4px_0_#111111] flex items-end justify-center select-none">
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal || isMuted}
        className={`w-full h-full object-cover ${isLocal ? '-scale-x-100' : ''} ${
          hasActiveStream ? 'block' : 'hidden'
        }`}
      />

      {/* Fallback Graphic (when stream not active or video turned off) */}
      {!hasActiveStream && (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Sky & Clouds */}
          <div className="relative w-full h-1/2">
            <img
              src="/assets/environment/cloud.svg"
              alt=""
              className="absolute top-3 right-6 w-14 opacity-80"
            />
          </div>

          {/* Tree on side */}
          <div className={`absolute bottom-5 w-16 h-20 z-0 ${isLocal ? 'left-3' : 'right-4'}`}>
            <img
              src="/assets/environment/pixel-tree.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Character Illustration */}
          <div className="relative z-10 w-36 h-36 mx-auto -mb-1 flex flex-col items-center justify-end">
            {isVideoOff ? (
              <div className="w-16 h-16 rounded-2xl bg-white/95 border-2 border-[#111111] shadow-[0_3px_0_#111111] flex items-center justify-center text-rose-500 mb-6">
                <VideoOff className="w-8 h-8" />
              </div>
            ) : (
              <img
                src={isLocal ? '/assets/characters/player-blue.svg' : '/assets/characters/stranger-green.svg'}
                alt={label}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Ground */}
          <div className="w-full h-5 bg-[#58973A] border-t-2 border-[#111111] z-20" />
        </div>
      )}

      {/* Top-Left Label Badge */}
      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-white/95 border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] flex items-center gap-1.5 z-30">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            hasActiveStream ? 'bg-[#65C93F]' : 'bg-amber-400 animate-pulse'
          }`}
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
