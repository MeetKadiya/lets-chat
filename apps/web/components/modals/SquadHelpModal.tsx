'use client';

import React from 'react';
import { X, Users, Video, ShieldCheck, Sparkles } from 'lucide-react';

interface SquadHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SquadHelpModal({ isOpen, onClose }: SquadHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Users className="w-4 h-4 text-brand-yellow" />
            <span>How Squad Mode Works</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-300">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
              <span className="text-xl">👫</span>
              <div>
                <span className="font-bold text-white">1. Pair with a Friend: </span>
                Share your 6-digit squad code with a friend. Once they enter it, you two are linked together in a squad.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
              <span className="text-xl">🎥</span>
              <div>
                <span className="font-bold text-white">2. Duo Video Matching: </span>
                Both of your video feeds join the same matchmaking session. When matched, you meet stranger duos face-to-face!
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
              <span className="text-xl">⚡</span>
              <div>
                <span className="font-bold text-white">3. Skip Together: </span>
                Either partner can hit &quot;Next&quot; to skip to the next exciting conversation instantly.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full brand-yellow-btn font-bold text-xs"
          >
            Got it, Let&apos;s Squad Up!
          </button>
        </div>
      </div>
    </div>
  );
}
