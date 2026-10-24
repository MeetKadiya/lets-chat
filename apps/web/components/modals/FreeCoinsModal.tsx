'use client';

import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Share2, Calendar } from 'lucide-react';

interface FreeCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FreeCoinsModal({ isOpen, onClose }: FreeCoinsModalProps) {
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-base">
            <span className="text-xl">🎁</span>
            <span>Free Coins & Perks</span>
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
        <div className="p-5 space-y-4">
          {/* Daily Reward Box */}
          <div className="p-4 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-yellow-400/20 text-center space-y-2">
            <div className="text-3xl">🪙 50</div>
            <div className="font-bold text-sm text-yellow-300">Daily Login Reward</div>
            <p className="text-xs text-slate-300">
              Claim daily bonus coins to unlock priority matchmaking and fun reaction filters!
            </p>
            <button
              type="button"
              disabled={claimed}
              onClick={() => setClaimed(true)}
              className={`w-full py-2.5 rounded-full font-bold text-xs transition-all ${
                claimed
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'brand-yellow-btn'
              }`}
            >
              {claimed ? '✓ Claimed Today (+50 Coins)' : 'Claim Free Coins'}
            </button>
          </div>

          {/* Additional Tasks */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold text-white">Share with Friends</div>
                  <div className="text-[11px] text-slate-400">Get +100 bonus coins</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  alert('Invite link copied to clipboard!');
                }}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
