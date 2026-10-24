'use client';

import React from 'react';
import { MessageSquare, Video, Sparkles, ShieldCheck } from 'lucide-react';
import { ChatMode } from '@strangerconnect/shared';

interface HeroSectionProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
}

export function HeroSection({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
}: HeroSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4 py-8">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-slate-700/60 text-xs font-medium text-cyan-400 mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Next-Generation Anonymous Social Web</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
        Talk to strangers with <br />
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
          shared interests.
        </span>
      </h1>

      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
        No accounts, no phone numbers, no tracking. Select your favorite topics, pick text or video, and meet someone new across the globe in seconds.
      </p>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
        <button
          type="button"
          onClick={() => onSelectMode('text')}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all ${
            selectedMode === 'text'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
              : 'bg-surface-200/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <div className="text-left">
            <div className="font-semibold text-sm">Text Chat</div>
            <div className="text-xs text-slate-400">Casual messaging</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('video')}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all ${
            selectedMode === 'video'
              ? 'bg-cyan-600/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
              : 'bg-surface-200/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Video className="w-5 h-5 text-cyan-400" />
          <div className="text-left">
            <div className="font-semibold text-sm">Video Chat</div>
            <div className="text-xs text-slate-400">Cam & microphone</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('both')}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border transition-all ${
            selectedMode === 'both'
              ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
              : 'bg-surface-200/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <div className="text-left">
            <div className="font-semibold text-sm">Combined</div>
            <div className="text-xs text-slate-400">Video + text room</div>
          </div>
        </button>
      </div>

      {/* Start Button */}
      <div className="mb-6">
        <button
          type="button"
          disabled={isConnecting}
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Start Chatting Now'}
        </button>
      </div>

      {/* Safety Notice */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>By starting, you agree you are at least 18 years old and abide by our Community Guidelines.</span>
      </div>
    </div>
  );
}
