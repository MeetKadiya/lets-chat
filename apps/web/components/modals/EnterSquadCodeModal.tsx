'use client';

import React, { useState } from 'react';
import { X, Users, ArrowRight, Sparkles } from 'lucide-react';

interface EnterSquadCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export function EnterSquadCodeModal({
  isOpen,
  onClose,
  onJoin,
}: EnterSquadCodeModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.replace(/\s+/g, '');
    if (clean.length < 6) {
      setError('Please enter a valid 6-digit squad code.');
      return;
    }
    onJoin(clean);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Users className="w-4 h-4 text-brand-yellow" />
            <span>Enter Friend&apos;s Squad Code</span>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-300">
            Ask your friend for their 6-digit code or invite link to group up and chat with strangers together.
          </p>

          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="e.g. 887 123"
              maxLength={8}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-center font-mono text-xl font-bold tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              autoFocus
            />
            {error && <p className="text-xs text-rose-400 mt-1.5 text-center">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full brand-yellow-btn font-extrabold text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <span>Join Friend&apos;s Squad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
