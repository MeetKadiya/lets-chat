'use client';

import React from 'react';
import { X, Users, Video, Zap, Check } from 'lucide-react';

interface SquadHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SquadHelpModal({ isOpen, onClose }: SquadHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] shadow-[0_6px_0_#111111] overflow-hidden text-[#111111] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b-2 border-[#111111] bg-white">
          <div className="flex items-center gap-2 font-black text-base text-[#111111]">
            <Users className="w-4 h-4 text-[#278344]" />
            <span>How Squad Mode Works</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-xl border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5 text-xs text-slate-800">
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#111111] shadow-[0_1px_0_#111111]">
              <span className="text-xl">👫</span>
              <div>
                <span className="font-black text-[#111111]">1. Pair with a Friend: </span>
                Share your 6-digit squad code with a friend. Once they enter it, you two are linked together in a squad.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#111111] shadow-[0_1px_0_#111111]">
              <span className="text-xl">🎥</span>
              <div>
                <span className="font-black text-[#111111]">2. Duo Video Matching: </span>
                Both of your video feeds join the same matchmaking session. When matched, you meet stranger duos face-to-face!
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#111111] shadow-[0_1px_0_#111111]">
              <span className="text-xl">⚡</span>
              <div>
                <span className="font-black text-[#111111]">3. Skip Together: </span>
                Either partner can hit &quot;Next&quot; to skip to the next exciting conversation instantly.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#65C93F] border-2 border-[#111111] shadow-[0_3px_0_#111111] font-black text-xs text-white hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            Got it, Let&apos;s Squad Up!
          </button>
        </div>
      </div>
    </div>
  );
}
