'use client';

import React from 'react';
import { FastForward, PhoneOff, Flag, ShieldAlert, Circle, Tag } from 'lucide-react';
import { SessionState } from '../../hooks/useChatSession';

interface ChatControlsProps {
  sessionState: SessionState;
  onNext: () => void;
  onDisconnect: () => void;
  onReport: () => void;
  onBlock: () => void;
  sharedInterests?: string[];
}

export function ChatControls({
  sessionState,
  onNext,
  onDisconnect,
  onReport,
  onBlock,
  sharedInterests = [],
}: ChatControlsProps) {
  const isChatting = sessionState === 'CHATTING';
  const isQueued = sessionState === 'QUEUED';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#EAF5D5] border-b-2 border-[#252820] text-[#252820]">
      {/* State & Shared Interests */}
      <div className="flex items-center gap-3">
        {/* State Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820]">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isChatting
                ? 'bg-[#65A843] animate-pulse'
                : isQueued
                ? 'bg-amber-400 animate-ping'
                : 'bg-slate-400'
            }`}
          />
          <span className="text-xs font-black uppercase tracking-wider text-[#252820]">
            {isChatting
              ? 'Stranger Connected'
              : isQueued
              ? 'Finding Stranger...'
              : sessionState === 'ENDED'
              ? 'Chat Ended'
              : 'Ready'}
          </span>
        </div>

        {/* Shared interests if matching */}
        {sharedInterests.length > 0 && isChatting && (
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Matched on:</span>
            {sharedInterests.map((interest) => (
              <span
                key={interest}
                className="px-2 py-0.5 rounded-lg bg-white border border-[#252820] text-[11px] font-black text-[#252820]"
              >
                #{interest}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Next Stranger Button */}
        <button
          type="button"
          onClick={onNext}
          className="mingleo-btn-green flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider"
        >
          <FastForward className="w-4 h-4 fill-current" />
          <span>Next Stranger</span>
        </button>

        {/* End / Disconnect Button */}
        <button
          type="button"
          onClick={onDisconnect}
          className="p-2 rounded-xl bg-[#E74C3C] hover:bg-[#C0392B] text-white border-2 border-[#252820] shadow-[0_2px_0_#252820] transition-transform active:translate-y-0.5 active:shadow-none"
          title="End conversation"
        >
          <PhoneOff className="w-4 h-4" />
        </button>

        {/* Report & Block (only when actively chatting) */}
        {isChatting && (
          <>
            <button
              type="button"
              onClick={onReport}
              className="p-2 rounded-xl bg-white hover:bg-amber-50 text-amber-700 border-2 border-[#252820] shadow-[0_2px_0_#252820] transition-transform active:translate-y-0.5 active:shadow-none"
              title="Report user"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBlock}
              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border-2 border-[#252820] shadow-[0_2px_0_#252820] transition-transform active:translate-y-0.5 active:shadow-none"
              title="Block user"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
