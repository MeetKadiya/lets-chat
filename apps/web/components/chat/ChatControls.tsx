'use client';

import React from 'react';
import { ArrowRight, LogOut, Flag, ShieldAlert, Circle } from 'lucide-react';
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
    <div className="flex items-center justify-between px-4 py-3 bg-surface-200 border-b border-slate-800">
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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {sessionState === 'CHATTING'
            ? 'Stranger Connected'
            : sessionState === 'QUEUED'
            ? 'Matching...'
            : sessionState === 'ENDED'
            ? 'Disconnected'
            : 'Idle'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Next Stranger */}
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Disconnect */}
        <button
          type="button"
          onClick={onDisconnect}
          className="p-1.5 rounded-lg bg-surface-100 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
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
              className="p-1.5 rounded-lg bg-surface-100 hover:bg-amber-950/40 text-amber-400 hover:text-amber-300 border border-amber-900/40 transition-colors"
              title="Report stranger"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBlock}
              className="p-1.5 rounded-lg bg-surface-100 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 border border-rose-900/40 transition-colors"
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
