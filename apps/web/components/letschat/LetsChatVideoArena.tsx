'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LetsChatVideoArenaProps {
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
  isConnecting?: boolean;
  isVideoOff?: boolean;
}

export function LetsChatVideoArena({
  localStream = null,
  remoteStream = null,
  isConnecting = false,
  isVideoOff = false,
}: LetsChatVideoArenaProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const hasLocalVideo = !!localStream && !isVideoOff;
  const hasRemoteVideo = !!remoteStream;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
      {/* 1. Left Video Panel (You) */}
      <div className="relative aspect-[1.42] w-full bg-[#8BC9F6] border-[3px] border-[#111111] rounded-[22px] overflow-hidden shadow-[0_4px_0_#111111] flex items-end justify-center select-none">
        {/* Live Video Feed */}
        {hasLocalVideo ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />
        ) : (
          /* Pixel Environment with Player Character (Green Hoodie) */
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Sky & Clouds */}
            <div className="relative w-full h-1/2">
              <img
                src="/assets/environment/cloud.svg"
                alt=""
                className="absolute top-3 right-6 w-14 opacity-80"
              />
              <img
                src="/assets/environment/cloud.svg"
                alt=""
                className="absolute top-8 left-16 w-10 opacity-60"
              />
            </div>

            {/* Tree on left */}
            <div className="absolute left-3 bottom-5 w-16 h-20 z-0">
              <img
                src="/assets/environment/pixel-tree.svg"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Yellow Flower in ground */}
            <div className="absolute left-20 bottom-5 w-4 h-6 z-0">
              <img
                src="/assets/environment/pixel-flower-yellow.svg"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Player Character (Green Sweatshirt) Centered */}
            <div className="relative z-10 w-36 h-36 mx-auto -mb-1">
              <img
                src="/assets/characters/player-green.svg"
                alt="Player Character"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Grass & Dirt Floor */}
            <div className="w-full h-5 bg-[#58973A] border-t-2 border-[#111111] z-20 relative">
              <div className="w-full h-3 bg-[#794D2C] border-t border-[#111111]" />
            </div>
          </div>
        )}

        {/* Top-Left Badge: .l You */}
        <div className="absolute top-3.5 left-3.5 z-30 px-3 py-1 rounded-xl bg-white/95 border-2 border-[#111111] shadow-[0_2px_0_#111111] flex items-center gap-1.5 text-xs font-black text-[#111111]">
          {/* Signal Bars */}
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-1 h-1.5 bg-[#65C93F] rounded-xs" />
            <span className="w-1 h-2.5 bg-[#65C93F] rounded-xs" />
            <span className="w-1 h-3 bg-[#65C93F] rounded-xs" />
          </div>
          <span>You</span>
        </div>
      </div>

      {/* 2. Right Video Panel (Stranger) */}
      <div className="relative aspect-[1.42] w-full bg-[#8BC9F6] border-[3px] border-[#111111] rounded-[22px] overflow-hidden shadow-[0_4px_0_#111111] flex items-end justify-center select-none">
        {/* Live Video Feed */}
        {hasRemoteVideo ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          /* Pixel Environment with Stranger Character (Orange Hair, Yellow Top) */
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Sky & Clouds */}
            <div className="relative w-full h-1/2">
              <img
                src="/assets/environment/cloud.svg"
                alt=""
                className="absolute top-4 left-6 w-14 opacity-80"
              />
              <img
                src="/assets/environment/cloud.svg"
                alt=""
                className="absolute top-6 right-12 w-12 opacity-70"
              />
            </div>

            {/* Tree on right */}
            <div className="absolute right-4 bottom-5 w-16 h-20 z-0">
              <img
                src="/assets/environment/pixel-tree.svg"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Stranger Character Centered */}
            <div className="relative z-10 w-36 h-36 mx-auto -mb-1">
              <img
                src="/assets/characters/stranger-orange.svg"
                alt="Stranger Character"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Grass & Dirt Floor */}
            <div className="w-full h-5 bg-[#58973A] border-t-2 border-[#111111] z-20 relative">
              <div className="w-full h-3 bg-[#794D2C] border-t border-[#111111]" />
            </div>
          </div>
        )}

        {/* Top-Left Badge: 🟢 Stranger */}
        <div className="absolute top-3.5 left-3.5 z-30 px-3 py-1 rounded-xl bg-white/95 border-2 border-[#111111] shadow-[0_2px_0_#111111] flex items-center gap-1.5 text-xs font-black text-[#111111]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#65C93F] animate-pulse" />
          <span>Stranger</span>
        </div>

        {/* Connecting Spinner Overlay */}
        {isConnecting && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white z-40">
            <div className="w-9 h-9 border-3 border-white border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-black">Connecting...</span>
          </div>
        )}
      </div>
    </div>
  );
}
