'use client';

import React, { useEffect, useRef } from 'react';
import { User, VideoOff, Wifi } from 'lucide-react';

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
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-[#8CCDF4] rounded-2xl overflow-hidden border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center">
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
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          {/* Subtle pixel clouds */}
          <div className="absolute top-3 left-4 opacity-50 select-none">
            <svg width="40" height="16" viewBox="0 0 20 8" shapeRendering="crispEdges">
              <rect x="4" y="0" width="12" height="4" fill="#FFFFFF" />
              <rect x="0" y="4" width="20" height="4" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="absolute top-4 right-6 opacity-40 select-none">
            <svg width="32" height="14" viewBox="0 0 16 7" shapeRendering="crispEdges">
              <rect x="3" y="0" width="10" height="3" fill="#FFFFFF" />
              <rect x="0" y="3" width="16" height="4" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Center Character Avatar / Icon */}
          <div className="relative z-10 flex flex-col items-center">
            {isVideoOff ? (
              <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center text-rose-500 mb-2">
                <VideoOff className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center text-3xl mb-2 select-none">
                {isLocal ? '👦' : '😎'}
              </div>
            )}

            <span className="text-xs font-black text-[#252820] bg-white/90 px-3 py-1 rounded-xl border border-[#252820] shadow-[0_1px_0_#252820]">
              {isVideoOff ? 'Camera Turned Off' : `Connecting ${label}...`}
            </span>
          </div>

          {/* Blocky ground silhouette at bottom of preview */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#65A843] border-t-2 border-[#252820]" />
        </div>
      )}

      {/* Label Badge */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-white/95 border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black text-[#252820] flex items-center gap-1.5 z-20">
        <span
          className={`w-2 h-2 rounded-full ${
            hasActiveStream ? 'bg-[#65A843]' : 'bg-amber-400 animate-pulse'
          }`}
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
