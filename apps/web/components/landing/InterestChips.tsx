'use client';

import React, { useState } from 'react';
import { Hash, Plus, Check, X, Sparkles } from 'lucide-react';

interface InterestChipsProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

const CATEGORIZED_INTERESTS: Record<string, string[]> = {
  'Trending': ['gaming', 'music', 'coding', 'anime', 'tech', 'movies'],
  'Lifestyle': ['fitness', 'travel', 'food', 'sports', 'fashion'],
  'Creative': ['art', 'photography', 'writing', 'crypto', 'science'],
};

export function InterestChips({ selectedInterests, onChange }: InterestChipsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Trending');
  const [customTag, setCustomTag] = useState('');

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
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 space-y-4">
      {/* Category Tabs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Shared Interests
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono">
            {selectedInterests.length}/10
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {Object.keys(CATEGORIZED_INTERESTS).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chip Cloud for Active Category */}
      <div className="flex flex-wrap gap-2 min-h-[44px]">
        {CATEGORIZED_INTERESTS[activeCategory].map((topic) => {
          const isSelected = selectedInterests.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => toggleInterest(topic)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-md shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
              }`}
            >
              <span>#{topic}</span>
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
            </button>
          );
        })}
      </div>

      {/* Selected Chips Strip & Custom Tag Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
        {/* Custom Tag Form */}
        <form onSubmit={handleAddCustom} className="flex items-center gap-2 max-w-xs">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-2 text-slate-500 text-xs font-mono">#</span>
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add custom topic..."
              maxLength={25}
              className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!customTag.trim()}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs disabled:opacity-40 transition-colors"
          >
            Add
          </button>
        </form>

        {/* Clear All or Selection Feedback */}
        {selectedInterests.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 self-end sm:self-auto"
          >
            <X className="w-3 h-3" />
            <span>Clear interests ({selectedInterests.length})</span>
          </button>
        )}
      </div>
    </div>
  );
}
