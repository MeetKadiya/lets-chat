'use client';

import React from 'react';

export function BlockyTerrain() {
  return (
    <div className="w-full relative select-none pointer-events-none mt-auto overflow-hidden">
      {/* Grassland Surface Items (Flowers, Sheep, Tree) */}
      <div className="max-w-6xl mx-auto px-6 relative h-16 flex items-end justify-between z-10">
        {/* Left Side: Pixel Sheep */}
        <div className="relative bottom-0 animate-bounce duration-1000">
          <svg width="44" height="36" viewBox="0 0 22 18" shapeRendering="crispEdges">
            {/* Sheep Body (White Wool) */}
            <rect x="5" y="4" width="13" height="9" fill="#FFFFFF" stroke="#252820" strokeWidth="1" />
            {/* Head */}
            <rect x="1" y="2" width="6" height="6" fill="#F4EBD9" stroke="#252820" strokeWidth="1" />
            <rect x="2" y="4" width="1" height="1" fill="#252820" /> {/* Eye */}
            {/* Legs */}
            <rect x="6" y="13" width="2" height="4" fill="#252820" />
            <rect x="9" y="13" width="2" height="4" fill="#252820" />
            <rect x="13" y="13" width="2" height="4" fill="#252820" />
            <rect x="16" y="13" width="2" height="4" fill="#252820" />
          </svg>
        </div>

        {/* Center: Yellow and Red Pixel Flowers */}
        <div className="flex items-end gap-12 sm:gap-24 pb-1">
          {/* Yellow Flower */}
          <svg width="24" height="28" viewBox="0 0 12 14" shapeRendering="crispEdges">
            <rect x="5" y="6" width="2" height="8" fill="#4B8B2E" /> {/* Stem */}
            <rect x="3" y="2" width="6" height="6" fill="#F5C518" stroke="#252820" strokeWidth="0.8" />
            <rect x="5" y="4" width="2" height="2" fill="#E67E22" />
          </svg>

          {/* Red Flower */}
          <svg width="24" height="28" viewBox="0 0 12 14" shapeRendering="crispEdges">
            <rect x="5" y="6" width="2" height="8" fill="#4B8B2E" /> {/* Stem */}
            <rect x="3" y="2" width="6" height="6" fill="#E74C3C" stroke="#252820" strokeWidth="0.8" />
            <rect x="5" y="4" width="2" height="2" fill="#F39C12" />
          </svg>
        </div>

        {/* Right Side: Blocky Tree */}
        <div className="relative bottom-0 hidden sm:block">
          <svg width="64" height="80" viewBox="0 0 32 40" shapeRendering="crispEdges">
            {/* Tree Leaves Canopy */}
            <rect x="4" y="0" width="24" height="20" fill="#65A843" stroke="#252820" strokeWidth="1" />
            <rect x="8" y="4" width="16" height="12" fill="#58973A" />
            <rect x="12" y="8" width="8" height="4" fill="#78BF53" />
            {/* Tree Trunk */}
            <rect x="13" y="20" width="6" height="20" fill="#794D2C" stroke="#252820" strokeWidth="1" />
            <rect x="15" y="22" width="2" height="16" fill="#5C3A20" />
          </svg>
        </div>
      </div>

      {/* Blocky Dirt Ground */}
      <div className="w-full">
        {/* Grass Top Border */}
        <div className="h-4 bg-[#65A843] border-t-2 border-b-2 border-[#252820] flex overflow-hidden">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-2 bg-[#58973A] ${i % 3 === 0 ? 'mt-1' : i % 2 === 0 ? 'mt-2' : ''}`}
            />
          ))}
        </div>
        {/* Dirt Underlayer */}
        <div className="h-6 sm:h-8 bg-[#794D2C] border-b-4 border-[#252820] relative">
          <div className="absolute inset-0 opacity-20 flex flex-wrap gap-3 p-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#422915]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
