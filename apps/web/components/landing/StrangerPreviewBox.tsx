'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface StrangerPreviewBoxProps {
  isConnecting?: boolean;
}

export function StrangerPreviewBox({ isConnecting = false }: StrangerPreviewBoxProps) {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl bg-[#8CCDF4] border-2 border-[#252820] shadow-[0_4px_0_#252820] overflow-hidden flex flex-col items-center justify-center">
      {/* Sky Pixel Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" shapeRendering="crispEdges">
          <rect x="180" y="24" width="56" height="16" fill="#FFFFFF" rx="4" />
          <rect x="40" y="50" width="48" height="14" fill="#FFFFFF" rx="4" />
        </svg>
      </div>

      {/* Blocky Green Hills in Background */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-[#65A843] border-t-2 border-[#252820]">
        {/* Tiny Blocky Trees */}
        <div className="absolute -top-10 left-6">
          <svg width="24" height="32" viewBox="0 0 12 16" shapeRendering="crispEdges">
            <rect x="2" y="0" width="8" height="8" fill="#58973A" stroke="#252820" strokeWidth="0.8" />
            <rect x="5" y="8" width="2" height="8" fill="#794D2C" />
          </svg>
        </div>
        <div className="absolute -top-8 right-8">
          <svg width="20" height="28" viewBox="0 0 10 14" shapeRendering="crispEdges">
            <rect x="1" y="0" width="8" height="7" fill="#58973A" stroke="#252820" strokeWidth="0.8" />
            <rect x="4" y="7" width="2" height="7" fill="#794D2C" />
          </svg>
        </div>
      </div>

      {/* Stranger Indicator Badge */}
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center gap-1.5 text-xs font-black text-[#252820]">
        <span className={`w-2 h-2 rounded-full ${isConnecting ? 'bg-amber-400 animate-ping' : 'bg-[#65A843]'}`} />
        <span>Stranger</span>
      </div>

      {/* Center Character (Pixel Art Friendly Stranger) */}
      <div className="relative z-10 flex flex-col items-center">
        {isConnecting ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-xl bg-white border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center text-3xl animate-bounce">
              🔍
            </div>
            <div className="px-3 py-1 bg-white border-2 border-[#252820] rounded-xl text-xs font-black text-[#252820] shadow-[0_2px_0_#252820]">
              Finding a friendly stranger...
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Pixel Character Face */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#E67E22] border-2 border-[#252820] shadow-[0_3px_0_#252820] p-1 flex items-center justify-center relative overflow-hidden select-none">
              {/* Hair */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#D35400] border-b border-[#252820]" />
              {/* Face Center */}
              <div className="w-full h-full flex flex-col items-center justify-center pt-3">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-3 bg-[#252820] rounded-sm" />
                  <div className="w-2.5 h-3 bg-[#252820] rounded-sm" />
                </div>
                <div className="w-4 h-2 bg-[#C0392B] rounded-full mt-2" />
              </div>
            </div>
            {/* Clothing */}
            <div className="w-14 h-6 bg-[#F1C40F] border-2 border-t-0 border-[#252820] rounded-b-lg -mt-1" />
          </div>
        )}
      </div>
    </div>
  );
}
