'use client';

import React from 'react';
import { ArrowRight, LogOut, Flag, ShieldAlert, Circle, Sparkles } from 'lucide-react';
import { SessionState } from '../../hooks/useChatSession';

interface ChatControlsProps {
  sessionState: SessionState;
  onNext: () => void;
  onDisconnect: () => void;
  onReport: () => void;
  onBlock: () => void;
}

export function ChatControls({
  sessionState,
  onNext,
  onDisconnect,
  onReport,
  onBlock,
}: ChatControlsProps) {
  const isChatting = sessionState === 'CHATTING';
  const isQueued = sessionState === 'QUEUED';

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#161426] border-b border-white/10 text-white">
      {/* State Indicator */}
      <div className="flex items-center gap-2">
        <Circle
          className={`w-2.5 h-2.5 fill-current ${
            isChatting
              ? 'text-emerald-400 animate-pulse'
              : isQueued
              ? 'text-amber-400 animate-ping'
              : 'text-slate-500'
          }`}
        />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
          {sessionState === 'CHATTING'
            ? 'Stranger Connected'
            : sessionState === 'QUEUED'
            ? 'Finding Stranger...'
            : sessionState === 'ENDED'
            ? 'Chat Ended'
            : 'Idle'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Next Stranger Button (Yellow Monkey Style) */}
        <button
          type="button"
          onClick={onNext}
          className="brand-yellow-btn flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider transition-all"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Disconnect */}
        <button
          type="button"
          onClick={onDisconnect}
          className="p-1.5 rounded-full bg-white/10 hover:bg-rose-600 hover:text-white text-slate-300 border border-white/10 transition-colors"
          title="Disconnect and exit"
        >
          <LogOut className="w-4 h-4" />
        </button>

        {/* Report & Block (only when in chat) */}
        {isChatting && (
          <>
            <button
              type="button"
              onClick={onReport}
              className="p-1.5 rounded-full bg-white/10 hover:bg-amber-500/20 text-amber-400 border border-white/10 transition-colors"
              title="Report stranger"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBlock}
              className="p-1.5 rounded-full bg-white/10 hover:bg-rose-500/20 text-rose-400 border border-white/10 transition-colors"
              title="Block stranger"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
