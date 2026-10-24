'use client';

import React from 'react';

interface LetsChatCallControlsProps {
  onNext?: () => void;
  onToggleMute?: () => void;
  onEndCall?: () => void;
  isMuted?: boolean;
}

export function LetsChatCallControls({
  onNext,
  onToggleMute,
  onEndCall,
  isMuted = false,
}: LetsChatCallControlsProps) {
  return (
    <div className="flex items-center justify-center gap-9 sm:gap-12 my-3 select-none">
      {/* 1. Next Button */}
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

      {/* 2. Mute Button */}
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

      {/* 3. End Call Button */}
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
  );
}
