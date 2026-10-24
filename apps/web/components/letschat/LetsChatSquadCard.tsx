'use client';

import React, { useState } from 'react';
import { HelpCircle, Search, RefreshCw, Copy, Check, Users, Sparkles } from 'lucide-react';

interface LetsChatSquadCardProps {
  onSelectTab: (tab: 'solo' | 'squad') => void;
  onOpenSquadHelp: () => void;
  onOpenEnterCode: () => void;
  squadMemberName: string | null;
  onStartSquadChat: () => void;
  isConnecting: boolean;
  squadCode?: string;
  onRegenerateCode?: () => void;
}

export function LetsChatSquadCard({
  onSelectTab,
  onOpenSquadHelp,
  onOpenEnterCode,
  squadMemberName,
  onStartSquadChat,
  isConnecting,
  squadCode = '887 123',
  onRegenerateCode = () => {},
}: LetsChatSquadCardProps) {
  const [squadTab, setSquadTab] = useState<'invite' | 'box'>('invite');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(squadCode.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] p-6 sm:p-7 shadow-[0_4px_0_#111111] relative text-center flex flex-col justify-between">
      {/* Top Section: SOLO / SQUAD Switcher */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center p-1 rounded-2xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black">
          <button
            type="button"
            onClick={() => onSelectTab('solo')}
            className="px-4 py-1.5 rounded-xl text-slate-700 hover:text-[#111111] transition-all cursor-pointer"
          >
            SOLO (1v1)
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('squad')}
            className="px-4 py-1.5 rounded-xl bg-[#65C93F] text-white border border-[#111111] shadow-[0_1px_0_#111111] transition-all cursor-pointer"
          >
            SQUAD (2v2)
          </button>
        </div>
      </div>

      {/* Squad Header: My Squad & Search */}
      <div className="flex items-center justify-between border-b-2 border-[#111111]/15 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-[#111111] tracking-wide">
            My Squad Party
          </span>
          <button
            type="button"
            onClick={onOpenSquadHelp}
            className="text-slate-600 hover:text-[#111111] transition-colors cursor-pointer"
            title="Squad Rules & Info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenEnterCode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-[#111111] shadow-[0_1px_0_#111111] text-xs font-black text-[#111111] hover:bg-[#F4EBD9] transition-all cursor-pointer"
          title="Enter Squad Code"
        >
          <Search className="w-3.5 h-3.5 text-[#278344]" />
          <span>Join Code</span>
        </button>
      </div>

      {/* Code Display Area */}
      <div className="bg-white border-2 border-[#111111] rounded-2xl p-4 shadow-[0_2px_0_#111111] mb-4">
        <p className="text-xs font-bold text-slate-600 mb-1">Your 6-Digit Squad Party Code</p>
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#111111] tracking-widest">
            {squadCode}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-[#E8F2DF] border border-[#111111] text-[#278344] hover:bg-[#65C93F] hover:text-white transition-all cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onRegenerateCode}
            className="p-2 rounded-xl bg-[#E8F2DF] border border-[#111111] text-[#278344] hover:bg-[#65C93F] hover:text-white transition-all cursor-pointer"
            title="Generate new code"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] font-semibold text-slate-500 mt-1.5">
          Share this code with your friend so they can join your lobby.
        </p>
      </div>

      {/* Main Start Action */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={onStartSquadChat}
          disabled={isConnecting}
          className="lc-btn w-full max-w-sm justify-center"
        >
          <Users className="w-5 h-5" />
          <span>
            {isConnecting
              ? 'Finding Squad Match...'
              : squadMemberName
              ? `Start Squad Chat with ${squadMemberName}`
              : 'Start 2v2 Squad Chat'}
          </span>
        </button>
      </div>
    </div>
  );
}
