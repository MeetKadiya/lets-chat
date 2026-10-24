'use client';

import React from 'react';

interface LetsChatFooterTerrainProps {
  onNext?: () => void;
  onToggleMute?: () => void;
  onEndCall?: () => void;
  isMuted?: boolean;
}

export function LetsChatFooterTerrain({
  onNext,
  onToggleMute,
  onEndCall,
  isMuted = false,
}: LetsChatFooterTerrainProps) {
  return (
    <div className="w-full relative select-none mt-6">
      {/* Scenery Row: Sheep, Flowers, Call Controls, Full Oak Tree */}
      <div className="max-w-[1540px] mx-auto px-4 sm:px-8 relative min-h-[170px] sm:min-h-[220px] flex items-end justify-between z-10 -mb-[2px]">
        {/* 1. Left Side: Pixel Sheep (sitting on grass under left column) */}
        <div className="relative bottom-0 mb-1 pointer-events-none flex flex-col items-center">
          <div className="w-20 h-16 sm:w-28 sm:h-22 animate-bounce duration-1000 origin-bottom">
            <img
              src="/assets/environment/pixel-sheep.svg"
              alt="Pixel Sheep"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 2. Yellow Flower */}
        <div className="relative bottom-0 mb-1 pointer-events-none hidden sm:block">
          <div className="w-7 h-10 sm:w-8 sm:h-11">
            <img
              src="/assets/environment/pixel-flower-yellow.svg"
              alt="Yellow Flower"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 3. Center Call Controls: [ ⏩ Next ] [ 🎤 Mute ] [ 📞 End ] */}
        <div className="relative z-20 mb-3 flex items-center justify-center gap-7 sm:gap-11">
          {/* Next Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onNext}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center hover:bg-slate-50 transition-all active:translate-y-1 active:shadow-[0_1px_0_#111111] cursor-pointer"
              title="Next Stranger"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7">
                <img
                  src="/assets/icons/call-next.svg"
                  alt="Next"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
            <span className="font-black text-xs sm:text-sm text-[#111111]">
              Next
            </span>
          </div>

          {/* Mute Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onToggleMute}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center transition-all active:translate-y-1 active:shadow-[0_1px_0_#111111] cursor-pointer ${
                isMuted ? 'bg-amber-100' : 'bg-white hover:bg-slate-50'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7">
                <img
                  src="/assets/icons/call-mute.svg"
                  alt="Mute"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
            <span className="font-black text-xs sm:text-sm text-[#111111]">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </div>

          {/* End Call Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onEndCall}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F35E55] border-2 border-[#111111] shadow-[0_4px_0_#111111] flex items-center justify-center hover:bg-[#E5483F] transition-all active:translate-y-1 active:shadow-[0_1px_0_#111111] cursor-pointer"
              title="End Conversation"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8">
                <img
                  src="/assets/icons/call-end.svg"
                  alt="End"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
            <span className="font-black text-xs sm:text-sm text-[#111111]">
              End
            </span>
          </div>
        </div>

        {/* 4. Red Flower */}
        <div className="relative bottom-0 mb-1 pointer-events-none hidden sm:block">
          <div className="w-7 h-10 sm:w-8 sm:h-11">
            <img
              src="/assets/environment/pixel-flower-red.svg"
              alt="Red Flower"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 5. Right Side: Full Blocky Oak Tree (completely unclipped) */}
        <div className="relative bottom-0 -mb-2 pointer-events-none flex flex-col items-center">
          <div className="w-32 h-44 sm:w-44 sm:h-60 md:w-48 md:h-64">
            <img
              src="/assets/environment/pixel-tree.svg"
              alt="Pixel Oak Tree"
              className="w-full h-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* Minecraft Blocky Ground Layers */}
      <div className="w-full pointer-events-none">
        {/* Grass Block Surface Layer with Pixel Teeth */}
        <div className="h-6 sm:h-7 bg-[#58973A] border-t-2 border-b-2 border-[#111111] flex overflow-hidden">
          {Array.from({ length: 160 }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3 bg-[#477C2E] shrink-0 ${
                i % 3 === 0 ? 'mt-1' : i % 2 === 0 ? 'mt-2.5' : 'mt-0'
              }`}
            />
          ))}
        </div>

        {/* Dirt Block Underground Layer */}
        <div className="h-10 sm:h-14 bg-[#794D2C] border-b-4 border-[#111111] relative overflow-hidden">
          <div className="absolute inset-0 opacity-25 flex flex-wrap gap-4 p-2">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-[#492B15]"
                style={{
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
