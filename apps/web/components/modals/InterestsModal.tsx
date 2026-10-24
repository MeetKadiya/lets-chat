'use client';

import React, { useState } from 'react';
import { X, Hash, Plus, Check, Sparkles } from 'lucide-react';

interface InterestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

const DEFAULT_POPULAR_TOPICS = [
  'gaming',
  'music',
  'coding',
  'anime',
  'movies',
  'tech',
  'travel',
  'fitness',
  'crypto',
  'sports',
  'art',
  'reading',
  'memes',
  'fashion',
  'science',
];

export function InterestsModal({
  isOpen,
  onClose,
  selectedInterests,
  onChange,
}: InterestsModalProps) {
  const [customTag, setCustomTag] = useState('');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    const normalized = interest.toLowerCase().trim();
    if (selectedInterests.includes(normalized)) {
      onChange(selectedInterests.filter((i) => i !== normalized));
    } else {
      if (selectedInterests.length < 10) {
        onChange([...selectedInterests, normalized]);
      }
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTag.trim()) {
      toggleInterest(customTag);
      setCustomTag('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-sm mt-12 sm:mt-16 bg-[#0F1626] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200 glass-panel">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold tracking-tight">Favorite Topics & Interests</h2>
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
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Select up to 10 interests to prioritize matching with strangers who share your passions.
          </p>

          {/* Add custom tag input */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">#</span>
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom topic..."
                maxLength={30}
                className="w-full pl-7 pr-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={!customTag.trim()}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs disabled:opacity-40 transition-colors"
            >
              Add
            </button>
          </form>

          {/* Popular Tag Cloud */}
          <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
            {DEFAULT_POPULAR_TOPICS.map((topic) => {
              const isSelected = selectedInterests.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleInterest(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
                  }`}
                >
                  <span>#{topic}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>

          {/* Footer stats & Done button */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              {selectedInterests.length}/10 selected
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl btn-electric text-xs font-bold"
            >
              Apply Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
