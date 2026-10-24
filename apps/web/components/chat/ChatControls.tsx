'use client';

import React, { useState } from 'react';
import { ArrowRight, LogOut, Flag, ShieldAlert, Circle, Sparkles, Check, X } from 'lucide-react';
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
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  const handleDisconnectClick = () => {
    if (isChatting && !confirmDisconnect) {
      setConfirmDisconnect(true);
      setTimeout(() => setConfirmDisconnect(false), 4000); // Auto revert after 4s
      return;
    }
    setConfirmDisconnect(false);
    onDisconnect();
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0F1626] border-b border-white/10 text-white">
      {/* State Indicator */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          {isChatting ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </>
          ) : isQueued ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500" />
          )}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
          {sessionState === 'CHATTING'
            ? 'Stranger Connected'
            : sessionState === 'QUEUED'
            ? 'Searching for Match...'
            : sessionState === 'ENDED'
            ? 'Conversation Ended'
            : 'Idle'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Next Stranger Button */}
        <button
          type="button"
          onClick={() => {
            setConfirmDisconnect(false);
            onNext();
          }}
          className="btn-electric flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Protected Disconnect */}
        {confirmDisconnect ? (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs animate-in fade-in duration-150">
            <span className="text-[11px] text-rose-300 font-bold px-1.5">End chat?</span>
            <button
              type="button"
              onClick={handleDisconnectClick}
              className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setConfirmDisconnect(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleDisconnectClick}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-white/10 transition-colors"
            title="Leave conversation"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}

        {/* Report & Block (only when in chat) */}
        {isChatting && (
          <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
            <button
              type="button"
              onClick={onReport}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 border border-white/10 transition-colors"
              title="Report stranger for inappropriate behavior"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBlock}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
              title="Block stranger permanently"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
