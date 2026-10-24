'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flag, MoreVertical, Heart, ArrowLeft } from 'lucide-react';

interface Screen2LiveChatProps {
  onNext?: () => void;
  onEnd?: () => void;
  onReport?: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

export function Screen2LiveChat({
  onNext = () => {},
  onEnd = () => {},
  onReport = () => {},
  localStream = null,
  remoteStream = null,
}: Screen2LiveChatProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-4 sm:p-6 shadow-[0_6px_0_#111111] flex flex-col justify-between">
      {/* Top Bar inside Room */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
        <Link href="/" className="flex items-center gap-2 text-xs font-black text-[#111111] hover:text-[#278344]">
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Exit Room</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7">
            <img src="/assets/logo/logo-bubble.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-lg text-[#111111]">Let&apos;s Chat</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5 fill-current" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Dual Video Stream Arena */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {/* Left: You Panel */}
        <div className="relative aspect-[1.42] w-full bg-[#8BC9F6] border-[3px] border-[#111111] rounded-[22px] overflow-hidden shadow-[0_4px_0_#111111] flex items-end justify-center">
          {localStream ? (
            <video
              autoPlay
              playsInline
              muted
              ref={(v) => {
                if (v && localStream) v.srcObject = localStream;
              }}
              className="w-full h-full object-cover -scale-x-100"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-1/2">
                <img src="/assets/environment/cloud.svg" alt="" className="absolute top-3 right-6 w-14 opacity-80" />
              </div>
              <div className="absolute left-3 bottom-5 w-16 h-20 z-0">
                <img src="/assets/environment/pixel-tree.svg" alt="" className="w-full h-full object-contain" />
              </div>
              {/* Character: Blue Sweatshirt Boy */}
              <div className="relative z-10 w-36 h-36 mx-auto -mb-1">
                <img src="/assets/characters/player-blue.svg" alt="You" className="w-full h-full object-contain" />
              </div>
              <div className="w-full h-5 bg-[#58973A] border-t-2 border-[#111111] z-20" />
            </div>
          )}
          {/* Badge: You */}
          <div className="absolute top-3.5 left-3.5 z-30 px-3 py-1 rounded-xl bg-[#2980B9] text-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black">
            You
          </div>
        </div>

        {/* Right: Stranger Panel */}
        <div className="relative aspect-[1.42] w-full bg-[#8BC9F6] border-[3px] border-[#111111] rounded-[22px] overflow-hidden shadow-[0_4px_0_#111111] flex items-end justify-center">
          {remoteStream ? (
            <video
              autoPlay
              playsInline
              ref={(v) => {
                if (v && remoteStream) v.srcObject = remoteStream;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-1/2">
                <img src="/assets/environment/cloud.svg" alt="" className="absolute top-4 left-6 w-14 opacity-80" />
              </div>
              <div className="absolute right-4 bottom-5 w-16 h-20 z-0">
                <img src="/assets/environment/pixel-tree.svg" alt="" className="w-full h-full object-contain" />
              </div>
              {/* Character: Orange Hair + Green Hoodie Stranger */}
              <div className="relative z-10 w-36 h-36 mx-auto -mb-1">
                <img src="/assets/characters/stranger-green.svg" alt="Stranger" className="w-full h-full object-contain" />
              </div>
              <div className="w-full h-5 bg-[#58973A] border-t-2 border-[#111111] z-20" />
            </div>
          )}
          {/* Badge: Stranger */}
          <div className="absolute top-3.5 left-3.5 z-30 px-3 py-1 rounded-xl bg-[#2980B9] text-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black">
            Stranger
          </div>
        </div>
      </div>

      {/* Call Controls: [ 🎤 Mute ] [ → Next ] [ 📞 End ] */}
      <div className="flex items-center justify-center gap-8 sm:gap-12 my-5">
        {/* Mute */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center transition-all active:translate-y-1 ${
              isMuted ? 'bg-amber-100' : 'bg-white'
            }`}
          >
            <img src="/assets/icons/call-mute.svg" alt="Mute" className="w-6 h-6 object-contain" />
          </button>
          <span className="font-black text-xs text-[#111111]">{isMuted ? 'Unmute' : 'Mute'}</span>
        </div>

        {/* Next */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={onNext}
            className="w-16 h-16 rounded-full bg-white border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center transition-all active:translate-y-1"
          >
            <img src="/assets/icons/call-next.svg" alt="Next" className="w-6 h-6 object-contain" />
          </button>
          <span className="font-black text-xs text-[#111111]">Next</span>
        </div>

        {/* End */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={onEnd}
            className="w-16 h-16 rounded-full bg-[#F35E55] border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center transition-all active:translate-y-1"
          >
            <img src="/assets/icons/call-end.svg" alt="End" className="w-7 h-7 object-contain" />
          </button>
          <span className="font-black text-xs text-[#111111]">End</span>
        </div>
      </div>

      {/* Friendly Bottom Banner: 🤍 Be kind. Be respectful. Have fun! */}
      <div className="w-full py-2.5 px-4 bg-[#EAF5D5] border-2 border-[#111111] rounded-xl shadow-[0_2px_0_#111111] text-center font-black text-xs sm:text-sm text-[#111111] flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
        <span>Be kind. Be respectful. Have fun!</span>
      </div>
    </div>
  );
}
