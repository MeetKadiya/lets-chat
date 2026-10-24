'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, RefreshCw, Copy, Check, Users, Sparkles } from 'lucide-react';

interface SquadCardProps {
  onSelectTab: (tab: 'solo' | 'squad') => void;
  onOpenSquadHelp: () => void;
  onOpenEnterCode: () => void;
  squadMemberName: string | null;
  onStartSquadChat: () => void;
  isConnecting: boolean;
}

export function SquadCard({
  onSelectTab,
  onOpenSquadHelp,
  onOpenEnterCode,
  squadMemberName,
  onStartSquadChat,
  isConnecting,
}: SquadCardProps) {
  const [squadTab, setSquadTab] = useState<'invite' | 'box'>('invite');
  const [squadCode, setSquadCode] = useState('887 123');
  const [copied, setCopied] = useState(false);
  const [expireMinutes, setExpireMinutes] = useState(26);

  // Generate random 6-digit squad code
  const regenerateCode = () => {
    const firstPart = Math.floor(100 + Math.random() * 900);
    const secondPart = Math.floor(100 + Math.random() * 900);
    setSquadCode(`${firstPart} ${secondPart}`);
    setExpireMinutes(30);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(squadCode.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl bg-[#161426] border-2 border-white/10 shadow-2xl p-5 sm:p-6 flex flex-col justify-between text-white overflow-hidden">
      {/* Top Section: SOLO / SQUAD Switcher */}
      <div className="flex justify-center mb-3">
        <div className="flex items-center p-1 rounded-full bg-white/[0.08] border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => onSelectTab('solo')}
            className="px-5 py-1.5 rounded-full text-white/80 hover:text-white transition-all"
          >
            SOLO
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('squad')}
            className="px-5 py-1.5 rounded-full bg-brand-yellow text-slate-900 font-extrabold shadow transition-all"
          >
            SQUAD
          </button>
        </div>
      </div>

      {/* Squad Header: My Squad & Search */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-white tracking-wide">My Squad</span>
          <button
            type="button"
            onClick={onOpenSquadHelp}
            className="text-slate-400 hover:text-white transition-colors"
            title="Squad Rules & Info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={onOpenEnterCode}
          className="text-slate-400 hover:text-white transition-colors"
          title="Search Squads"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-Tabs: Invite Friends / Squad Box */}
      <div className="flex items-center gap-6 text-xs font-bold pt-1 border-b border-white/5 pb-2">
        <button
          type="button"
          onClick={() => setSquadTab('invite')}
          className={`pb-1 transition-all ${
            squadTab === 'invite'
              ? 'text-white border-b-2 border-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Invite Friends
        </button>
        <button
          type="button"
          onClick={() => setSquadTab('box')}
          className={`pb-1 transition-all ${
            squadTab === 'box'
              ? 'text-white border-b-2 border-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Squad Box
        </button>
      </div>

      {/* Center Mascot & Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center my-auto">
        {squadMemberName ? (
          <div className="space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center text-3xl mx-auto shadow-lg">
              🎉
            </div>
            <div className="text-base font-bold text-white">Squad Formed!</div>
            <p className="text-xs text-slate-300 max-w-[240px]">
              You and <span className="text-brand-yellow font-bold">{squadMemberName}</span> are ready to match with stranger pairs.
            </p>
            <button
              type="button"
              onClick={onStartSquadChat}
              disabled={isConnecting}
              className="px-6 py-2.5 rounded-full brand-yellow-btn font-extrabold text-xs tracking-wider uppercase mt-2 shadow-lg"
            >
              {isConnecting ? 'Finding Strangers...' : 'Start Squad Chat'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Mascot Grid Icon */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-radial from-white/[0.08] to-transparent" />
              <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-4xl shadow-inner select-none">
                🐵
              </div>
              <span className="absolute -top-1 right-3 text-lg font-black text-white/40">???</span>
            </div>
            <div className="text-sm font-bold text-white/50 tracking-wider">
              {squadTab === 'invite' ? 'Nothing yet' : 'Squad Box Empty'}
            </div>
            <p className="text-xs text-slate-400 max-w-[220px]">
              Share your squad code with a friend or enter their code below to pair up!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Code & Action Bar */}
      <div className="pt-3 border-t border-white/5 space-y-2">
        <div className="text-[11px] text-slate-400 text-center font-medium">
          Your Squad Code: Expires in {expireMinutes} m
        </div>

        <div className="flex items-center justify-between gap-2 bg-white/[0.03] p-2.5 rounded-2xl border border-white/5">
          {/* 6-Digit Squad Code with Refresh */}
          <div className="flex items-center gap-2 font-mono font-black text-sm sm:text-base text-white pl-1">
            <span>{squadCode}</span>
            <button
              type="button"
              onClick={regenerateCode}
              className="text-slate-400 hover:text-white transition-colors"
              title="Generate new squad code"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy and Enter Code Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-full brand-yellow-btn font-extrabold text-xs text-slate-900 shadow transition-all"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={onOpenEnterCode}
              className="px-3.5 py-1.5 rounded-full bg-transparent border border-brand-yellow text-brand-yellow font-extrabold text-xs hover:bg-brand-yellow/10 transition-colors"
            >
              Enter Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
