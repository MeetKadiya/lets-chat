'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface InterestsTabProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
  onSaved?: () => void;
}

const TOPICS = [
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'minecraft', label: 'Minecraft', icon: '⛏️' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'anime', label: 'Anime', icon: '🍙' },
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'tech', label: 'Tech', icon: '💻' },
  { id: 'reading', label: 'Reading', icon: '📚' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'food', label: 'Food', icon: '🍕' },
  { id: 'animals', label: 'Animals', icon: '🐱' },
];

export function InterestsTab({ selectedInterests, onChange, onSaved }: InterestsTabProps) {
  const [preferenceGender, setPreferenceGender] = useState('Anyone');
  const [ageRange, setAgeRange] = useState(24);
  const [saved, setSaved] = useState(false);

  const toggleTopic = (id: string) => {
    if (selectedInterests.includes(id)) {
      onChange(selectedInterests.filter((t) => t !== id));
    } else {
      if (selectedInterests.length < 10) {
        onChange([...selectedInterests, id]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSaved?.();
    }, 1200);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Your Interests</h2>
        <p className="text-xs font-semibold text-slate-600">Select topics you enjoy to match with like-minded friends.</p>
      </div>

      {/* Grid of Blocky Interest Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {TOPICS.map((topic) => {
          const isSelected = selectedInterests.includes(topic.id);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => toggleTopic(topic.id)}
              className={`p-2.5 rounded-xl border-2 border-[#252820] flex items-center justify-between font-bold text-xs transition-all ${
                isSelected
                  ? 'bg-[#65A843] text-white shadow-[0_3px_0_#252820] translate-y-[-1px]'
                  : 'bg-white text-[#252820] shadow-[0_2px_0_#252820] hover:bg-[#EAF5D5]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{topic.icon}</span>
                <span>{topic.label}</span>
              </div>
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
          );
        })}
      </div>

      {/* Matching Preferences */}
      <div className="p-4 rounded-2xl bg-[#EAF5D5] border-2 border-[#252820] shadow-[0_2px_0_#252820] space-y-4">
        <div className="font-black text-xs uppercase tracking-wider text-[#252820]">
          Matching Preferences
        </div>

        {/* Gender Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#252820]">I want to chat with</label>
          <select
            value={preferenceGender}
            onChange={(e) => setPreferenceGender(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-bold text-[#252820] focus:outline-none"
          >
            <option value="Anyone">Anyone</option>
            <option value="Women">Women Only</option>
            <option value="Men">Men Only</option>
          </select>
        </div>

        {/* Age Range Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#252820]">
            <span>Age Range</span>
            <span>18 - {ageRange}+</span>
          </div>
          <input
            type="range"
            min={18}
            max={40}
            value={ageRange}
            onChange={(e) => setAgeRange(Number(e.target.value))}
            className="w-full accent-[#65A843] cursor-pointer"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="mingleo-btn-green w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Preferences Saved!</span>
          </>
        ) : (
          <span>Save Preferences</span>
        )}
      </button>
    </form>
  );
}
