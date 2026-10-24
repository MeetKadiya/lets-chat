'use client';

import React from 'react';

export function LetsChatFooterTerrain() {
  return (
    <div className="w-full relative select-none pointer-events-none mt-auto overflow-hidden">
      {/* Environmental Surface Items (Sheep, Flowers, Tree) */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-12 relative h-20 sm:h-24 flex items-end justify-between z-10">
        {/* Left Side: Pixel Sheep */}
        <div className="relative bottom-0 animate-bounce duration-1000 origin-bottom">
          <div className="w-16 h-13 sm:w-20 sm:h-16">
            <img
              src="/assets/environment/pixel-sheep.svg"
              alt="Pixel Sheep"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Center: Yellow and Red Pixel Flowers */}
        <div className="flex items-end gap-16 sm:gap-32 pb-0.5">
          {/* Yellow Flower */}
          <div className="w-6 h-8 sm:w-7 sm:h-9">
            <img
              src="/assets/environment/pixel-flower-yellow.svg"
              alt="Yellow Flower"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Grass Tufts */}
          <div className="hidden md:flex items-end gap-1 pb-1">
            <div className="w-1 h-3 bg-[#4E9A34]" />
            <div className="w-1 h-5 bg-[#65C93F]" />
            <div className="w-1 h-2 bg-[#4E9A34]" />
          </div>

          {/* Red Flower */}
          <div className="w-6 h-8 sm:w-7 sm:h-9">
            <img
              src="/assets/environment/pixel-flower-red.svg"
              alt="Red Flower"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Blocky Tree */}
        <div className="relative bottom-0">
          <div className="w-20 h-28 sm:w-28 sm:h-36">
            <img
              src="/assets/environment/pixel-tree.svg"
              alt="Pixel Tree"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Blocky Ground Layers */}
      <div className="w-full">
        {/* Grass Block Surface Layer with Pixel Teeth */}
        <div className="h-6 sm:h-7 bg-[#58973A] border-t-2 border-b-2 border-[#111111] flex overflow-hidden">
          {Array.from({ length: 140 }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3 bg-[#477C2E] shrink-0 ${
                i % 3 === 0 ? 'mt-1' : i % 2 === 0 ? 'mt-2.5' : 'mt-0'
              }`}
            />
          ))}
        </div>

        {/* Dirt Block Underground Layer */}
        <div className="h-8 sm:h-12 bg-[#794D2C] border-b-4 border-[#111111] relative">
          <div className="absolute inset-0 opacity-25 flex flex-wrap gap-4 p-2">
            {Array.from({ length: 60 }).map((_, i) => (
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
