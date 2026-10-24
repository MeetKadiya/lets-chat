'use client';

import React, { useState } from 'react';
import { X, Crown, Check, Minus, Sparkles, Shield, Zap } from 'lucide-react';

interface PlusSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlusSubscriptionModal({ isOpen, onClose }: PlusSubscriptionModalProps) {
  const [activeTier, setActiveTier] = useState<'plus' | 'plusplus'>('plus');
  const [selectedPlan, setSelectedPlan] = useState<'7days' | '30days'>('7days');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm mt-12 sm:mt-16 bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
          <h2 className="text-base font-bold tracking-tight">Let&apos;s Chat Plus</h2>
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
          {/* Tier Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-white/[0.04] rounded-xl border border-white/5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTier('plus')}
              className={`py-2 rounded-lg transition-all ${
                activeTier === 'plus'
                  ? 'bg-brand-yellow text-slate-900 shadow font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Let&apos;s Chat Plus
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('plusplus')}
              className={`py-2 rounded-lg transition-all ${
                activeTier === 'plusplus'
                  ? 'bg-brand-yellow text-slate-900 shadow font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Plus+ Elite
            </button>
          </div>

          {/* Comparison Card */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs text-slate-400 font-medium">Features</div>
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Crown className="w-4 h-4 fill-amber-300" />
                <span>{activeTier === 'plus' ? 'Plus' : 'Plus+'}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-300">Filter-Both (All Modes)</span>
                <span className="font-bold text-white">Unlimited</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-300">Filter-Gender Priority</span>
                <span className="font-bold text-amber-300">
                  {activeTier === 'plus' ? '150 matches' : 'Unlimited'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-300">Strict Match Preference</span>
                {activeTier === 'plus' ? (
                  <Minus className="w-4 h-4 text-slate-500" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-400 font-extrabold" />
                )}
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-300">Zero Interruptions / Ads</span>
                <Check className="w-4 h-4 text-emerald-400 font-extrabold" />
              </div>
            </div>
          </div>

          {/* Duration Options */}
          <div className="space-y-2 pt-1">
            {/* 7 Days */}
            <div
              onClick={() => setSelectedPlan('7days')}
              className={`relative p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedPlan === '7days'
                  ? 'border-brand-yellow bg-yellow-400/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="absolute -top-2 left-3 px-2 py-0.2 bg-rose-500 text-white font-extrabold text-[9px] rounded-full uppercase tracking-wider">
                30% OFF
              </div>
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === '7days' ? 'border-brand-yellow' : 'border-slate-500'
                }`}>
                  {selectedPlan === '7days' && <div className="w-2 h-2 rounded-full bg-brand-yellow" />}
                </div>
                <span className="text-xs font-bold text-white">7 days pass</span>
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeTier === 'plus' ? '₹ 618' : '₹ 1239'}
              </div>
            </div>

            {/* 30 Days */}
            <div
              onClick={() => setSelectedPlan('30days')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedPlan === '30days'
                  ? 'border-brand-yellow bg-yellow-400/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === '30days' ? 'border-brand-yellow' : 'border-slate-500'
                }`}>
                  {selectedPlan === '30days' && <div className="w-2 h-2 rounded-full bg-brand-yellow" />}
                </div>
                <span className="text-xs font-bold text-white">30 days VIP pass</span>
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeTier === 'plus' ? '₹ 1239' : '₹ 2480'}
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <button
            type="button"
            onClick={() => {
              setIsSubscribed(true);
              setTimeout(() => {
                setIsSubscribed(false);
                onClose();
              }, 1500);
            }}
            className="w-full py-3 rounded-full brand-yellow-btn font-extrabold text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>{isSubscribed ? 'Activated! Enjoy Plus' : 'Unlock Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
