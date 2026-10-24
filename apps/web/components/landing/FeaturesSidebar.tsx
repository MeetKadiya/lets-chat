'use client';

import React from 'react';
import { Users, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export function FeaturesSidebar() {
  return (
    <div className="w-full h-full bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_4px_0_#252820] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
      {/* Top Title & Block Icon */}
      <div>
        <div className="flex items-start gap-4 mb-6">
          {/* Blocky Grass Cube */}
          <div className="w-12 h-12 rounded-xl bg-[#65A843] border-2 border-[#252820] shadow-[0_3px_0_#252820] flex flex-col overflow-hidden shrink-0 select-none">
            <div className="h-4 bg-[#58973A] border-b-2 border-[#252820]" />
            <div className="flex-1 bg-[#794D2C] relative">
              <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-[#422915]" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#422915]" />
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#252820] leading-tight">
              Random video chat with new people
            </h2>
          </div>
        </div>

        {/* Feature Points */}
        <div className="space-y-5">
          {/* 1. Meet new people */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF5D5] border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-lg shrink-0">
              👥
            </div>
            <div>
              <div className="font-black text-sm text-[#252820]">Meet new people</div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Connect with someone from anywhere in the world instantly.
              </p>
            </div>
          </div>

          {/* 2. Be kind & respectful */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FDEDEC] border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-lg shrink-0">
              ❤️
            </div>
            <div>
              <div className="font-black text-sm text-[#252820]">Be kind & respectful</div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Good vibes and friendly manners make for great conversations.
              </p>
            </div>
          </div>

          {/* 3. Your safety matters */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8F8F5] border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-lg shrink-0">
              🛡️
            </div>
            <div>
              <div className="font-black text-sm text-[#252820]">Your safety matters</div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Instant 1-click Skip, Report, and Block controls keep you in control.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="mt-6 pt-4 border-t-2 border-[#252820]/10 flex items-center gap-2 text-xs font-bold text-slate-500">
        <span className="w-2 h-2 rounded-full bg-[#65A843]" />
        <span>100% Free & Peer-to-Peer Encrypted</span>
      </div>
    </div>
  );
}
