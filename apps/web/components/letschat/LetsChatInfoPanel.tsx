'use client';

import React from 'react';

export function LetsChatInfoPanel() {
  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-6 sm:p-8 shadow-[0_4px_0_#111111] flex flex-col justify-between h-full">
      {/* Header with 3D Grass Cube and Heading */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 shrink-0">
          <img
            src="/assets/environment/grass-block.svg"
            alt="Grass Block"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="font-black text-2xl sm:text-[26px] text-[#111111] leading-tight tracking-tight">
          Random video chat with new people
        </h1>
      </div>

      {/* 3 Value Proposition Rows */}
      <div className="flex-1 flex flex-col justify-around space-y-6 sm:space-y-8 pb-2">
        {/* Row 1: Meet new people */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-9 shrink-0 mt-0.5">
            <img
              src="/assets/icons/two-faces.svg"
              alt="Meet new people"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-black text-base text-[#111111]">
              Meet new people
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5 leading-snug">
              Connect with someone from anywhere in the world.
            </p>
          </div>
        </div>

        {/* Row 2: Be kind & respectful */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-9 shrink-0 mt-0.5">
            <img
              src="/assets/icons/heart.svg"
              alt="Be kind"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-black text-base text-[#111111]">
              Be kind &amp; respectful
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5 leading-snug">
              Good vibes make for great conversations.
            </p>
          </div>
        </div>

        {/* Row 3: Your safety matters */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 mt-0.5">
            <img
              src="/assets/icons/shield.svg"
              alt="Your safety matters"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-black text-base text-[#111111]">
              Your safety matters
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5 leading-snug">
              Please report anything inappropriate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
