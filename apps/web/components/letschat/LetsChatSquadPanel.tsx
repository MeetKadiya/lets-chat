'use client';

import React from 'react';
import { Users, Copy, Sparkles, UserPlus } from 'lucide-react';

interface LetsChatSquadPanelProps {
  squadMemberName?: string | null;
  squadCode?: string;
  onCopyCode?: () => void;
  onOpenEnterCode?: () => void;
}

export function LetsChatSquadPanel({
  squadMemberName = null,
  squadCode = '887 123',
  onCopyCode = () => {},
  onOpenEnterCode = () => {},
}: LetsChatSquadPanelProps) {
  return (
    <div className="w-full h-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-6 sm:p-7 shadow-[0_4px_0_#111111] flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2DF] border border-[#111111] text-xs font-black text-[#278344] mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Squad Party Mode (2v2)</span>
        </div>

        <h2 className="font-black text-2xl sm:text-3xl text-[#111111] tracking-tight mb-2">
          Team up with a friend.
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
          Share your 6-digit squad code with a friend. Once they join, you two will match together into 2v2 stranger video rooms!
        </p>
      </div>

      {/* Duo Member Visualizer Box */}
      <div className="my-4 p-4 rounded-2xl bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 sm:gap-8 my-2">
          {/* Member 1: You */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-xl bg-[#8BC9F6] border-2 border-[#111111] shadow-[0_3px_0_#111111] overflow-hidden flex items-center justify-center p-1">
              <img
                src="/assets/characters/avatar-player123.svg"
                alt="Me"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-black text-[#111111]">You (Host)</span>
          </div>

          {/* Plus Divider */}
          <div className="text-2xl font-black text-[#278344] select-none">
            +
          </div>

          {/* Member 2: Partner / Empty Slot */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-14 h-14 rounded-xl border-2 border-[#111111] shadow-[0_3px_0_#111111] flex items-center justify-center p-1 transition-all ${
                squadMemberName ? 'bg-[#FFDE59]' : 'bg-slate-100 border-dashed'
              }`}
            >
              {squadMemberName ? (
                <img
                  src="/assets/characters/avatar-stranger.svg"
                  alt="Partner"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl">🛋️</span>
              )}
            </div>
            <span className="text-xs font-black text-[#111111]">
              {squadMemberName || 'Waiting...'}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-3 w-full py-1.5 px-3 rounded-xl bg-[#E8F2DF] border border-[#111111] text-center text-xs font-black text-[#278344]">
          {squadMemberName
            ? `✓ Ready with ${squadMemberName}!`
            : 'Waiting for partner to enter code...'}
        </div>
      </div>

      {/* Bottom Action Prompts */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onCopyCode}
          className="w-full py-2.5 px-4 rounded-xl bg-[#65C93F] border-2 border-[#111111] shadow-[0_3px_0_#111111] text-xs font-black text-white hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Squad Code ({squadCode})</span>
        </button>

        <button
          type="button"
          onClick={onOpenEnterCode}
          className="w-full py-2 px-4 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-[#F4EBD9] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#278344]" />
          <span>Have a friend&apos;s code? Join squad</span>
        </button>
      </div>
    </div>
  );
}
