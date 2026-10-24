'use client';

import React, { useState } from 'react';
import { X, Users, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] shadow-[0_6px_0_#111111] overflow-hidden text-[#111111] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b-2 border-[#111111] bg-white">
          <div className="flex items-center gap-2 font-black text-base text-[#111111]">
            <Users className="w-4 h-4 text-[#278344]" />
            <span>Join Friend&apos;s Squad</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-xl border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
            Ask your friend for their 6-digit squad code to group up and meet stranger duos together.
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
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#111111] text-center font-mono text-2xl font-black tracking-widest text-[#111111] placeholder-slate-400 shadow-[0_2px_0_#111111] focus:outline-none focus:ring-2 focus:ring-[#65C93F]"
              autoFocus
            />
            {error && <p className="text-xs font-bold text-rose-600 mt-1.5 text-center">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#65C93F] border-2 border-[#111111] shadow-[0_3px_0_#111111] font-black text-sm text-white hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Join Friend&apos;s Squad</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
}
