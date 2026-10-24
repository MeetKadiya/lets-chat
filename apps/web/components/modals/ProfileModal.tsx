'use client';

import React, { useState } from 'react';
import { X, Edit2, Copy, Check, Crown, ChevronRight, Cake, Sparkles, Globe } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlus: () => void;
}

export function ProfileModal({ isOpen, onClose, onOpenPlus }: ProfileModalProps) {
  const [copied, setCopied] = useState(false);
  const [displayName, setDisplayName] = useState('Meet Kadiya');
  const [isEditingName, setIsEditingName] = useState(false);
  const anonymousId = '329188065';

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(anonymousId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm mt-12 sm:mt-16 bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
          <h2 className="text-base font-bold tracking-tight">My Profile</h2>
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
          {/* User Card */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-emerald-700 border-2 border-emerald-400/30 flex items-center justify-center text-2xl font-black text-white shadow-inner">
              M
            </div>
            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    className="w-full px-2 py-0.5 bg-black/50 border border-brand-yellow/50 rounded text-sm text-white focus:outline-none"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base truncate">{displayName}</span>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <span>ID: {anonymousId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="hover:text-white transition-colors"
                  title="Copy ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Plus VIP Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#6b3ff8] to-[#4323b0] flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
                <Crown className="w-5 h-5 fill-amber-300" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">Let&apos;s Chat Plus</div>
                <div className="text-[11px] text-white/70">Get More Gender & Topic Filters</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPlus();
              }}
              className="px-3 py-1.5 rounded-full bg-brand-yellow text-slate-900 font-extrabold text-xs shadow hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Join
            </button>
          </div>

          {/* Wallet Bar */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-center text-xs">
            <div className="flex items-center justify-center gap-1.5 py-1 border-r border-white/10 font-bold">
              <span className="text-base">🪙</span>
              <span className="text-yellow-300 text-sm">150</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1 font-bold">
              <span className="text-base">💎</span>
              <span className="text-pink-300 text-sm">25</span>
            </div>
          </div>

          {/* Info Items */}
          <div className="space-y-2.5 text-xs text-slate-300 pt-1">
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="flex items-center gap-2 text-slate-400">
                <span>🎂</span>
                <span>Birthday</span>
              </span>
              <span className="font-medium text-white">2000-01-01</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="flex items-center gap-2 text-slate-400">
                <span>🦁</span>
                <span>Gender</span>
              </span>
              <span className="font-medium text-white capitalize">Male</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="flex items-center gap-2 text-slate-400">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Location</span>
              </span>
              <span className="font-medium text-white">Global (Connected)</span>
            </div>
          </div>

          {/* Bottom Footer Item */}
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-between py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>More Preferences</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
