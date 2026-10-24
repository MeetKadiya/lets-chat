'use client';

import React, { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';

const PRESET_INTERESTS = [
  'gaming',
  'music',
  'anime',
  'movies',
  'technology',
  'sports',
  'philosophy',
  'books',
  'art',
  'travel',
];

interface InterestPickerProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

export function InterestPicker({ selectedInterests, onChange }: InterestPickerProps) {
  const [customInput, setCustomInput] = useState('');

  const toggleInterest = (interest: string) => {
    const lower = interest.toLowerCase().trim();
    if (selectedInterests.includes(lower)) {
      onChange(selectedInterests.filter((i) => i !== lower));
    } else {
      if (selectedInterests.length < 10) {
        onChange([...selectedInterests, lower]);
      }
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim().toLowerCase();
    if (trimmed && !selectedInterests.includes(trimmed) && selectedInterests.length < 10) {
      onChange([...selectedInterests, trimmed]);
      setCustomInput('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface-200/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          Filter By Shared Interests (Optional)
        </h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Matching prioritizes strangers who have selected the same topics as you.
      </p>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESET_INTERESTS.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'bg-surface-100/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      {/* Custom Input */}
      <form onSubmit={handleAddCustom} className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Add custom interest (e.g. quantum physics, chess)..."
          maxLength={30}
          className="flex-1 bg-surface-100/90 border border-slate-700/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!customInput.trim() || selectedInterests.length >= 10}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Selected list */}
      {selectedInterests.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Selected ({selectedInterests.length}/10):</span>
          {selectedInterests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/60 text-cyan-300 text-xs"
            >
              #{interest}
              <button
                type="button"
                onClick={() => toggleInterest(interest)}
                className="hover:text-cyan-100 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
