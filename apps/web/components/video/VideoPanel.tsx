'use client';

import React, { useEffect, useRef } from 'react';
import { User, VideoOff } from 'lucide-react';

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
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
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

      {/* Fallback Placeholder */}
      {!hasActiveStream && (
        <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
          {isVideoOff ? (
            <VideoOff className="w-10 h-10 text-slate-600" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center border border-slate-800">
              <User className="w-8 h-8 text-slate-400" />
            </div>
          )}
          <span className="text-xs font-medium">
            {isVideoOff ? 'Camera turned off' : `Connecting ${label}...`}
          </span>
        </div>
      )}

      {/* Label Badge */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            hasActiveStream ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'
          }`}
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
