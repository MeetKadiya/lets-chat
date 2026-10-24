'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Screen5InterestsProps {
  selectedInterests?: string[];
  onChange?: (interests: string[]) => void;
  onSaved?: () => void;
}

const INTERESTS = [
  { id: 'gaming', label: 'Gaming', icon: '/assets/icons/interests/gaming.svg' },
  { id: 'minecraft', label: 'Minecraft', icon: '/assets/icons/interests/minecraft.svg' },
  { id: 'music', label: 'Music', icon: '/assets/icons/interests/music.svg' },
  { id: 'movies', label: 'Movies', icon: '/assets/icons/interests/movies.svg' },
  { id: 'anime', label: 'Anime', icon: '/assets/icons/interests/anime.svg' },
  { id: 'art', label: 'Art', icon: '/assets/icons/interests/art.svg' },
  { id: 'sports', label: 'Sports', icon: '/assets/icons/interests/sports.svg' },
  { id: 'tech', label: 'Tech', icon: '/assets/icons/interests/tech.svg' },
  { id: 'reading', label: 'Reading', icon: '/assets/icons/interests/reading.svg' },
  { id: 'travel', label: 'Travel', icon: '/assets/icons/interests/travel.svg' },
  { id: 'food', label: 'Food', icon: '/assets/icons/interests/food.svg' },
  { id: 'animals', label: 'Animals', icon: '/assets/icons/interests/animals.svg' },
];

export function Screen5Interests({
  selectedInterests = ['gaming', 'minecraft'],
  onChange = () => {},
  onSaved = () => {},
}: Screen5InterestsProps) {
  const [selected, setSelected] = useState<string[]>(selectedInterests);
  const [genderPref, setGenderPref] = useState('Anyone');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(30);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    setSelected(updated);
    onChange(updated);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSaved();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">Your Interests</h2>
        <p className="text-xs font-bold text-slate-600 mt-0.5">Select topics you enjoy</p>
      </div>

      {/* 12 Interest Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {INTERESTS.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleInterest(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 border-[#111111] transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E8F2DF] shadow-[0_3px_0_#111111] font-black'
                  : 'bg-white shadow-[0_2px_0_#111111] font-bold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 shrink-0">
                <img src={item.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs sm:text-sm text-[#111111]">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Matching Preferences Section */}
      <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 sm:p-5 space-y-4">
        <h3 className="text-xs font-black text-[#111111] uppercase tracking-wide">
          Matching Preferences
        </h3>

        {/* Gender / Partner Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">I want to chat with</label>
          <select
            value={genderPref}
            onChange={(e) => setGenderPref(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] font-bold text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#65C93F]"
          >
            <option value="Anyone">Anyone</option>
            <option value="Men">Men Only</option>
            <option value="Women">Women Only</option>
          </select>
        </div>

        {/* Age Range Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">Age Range</span>
            <span className="text-[#278344] font-black">{minAge} — {maxAge}+</span>
          </div>
          <input
            type="range"
            min="18"
            max="60"
            value={maxAge}
            onChange={(e) => setMaxAge(Number(e.target.value))}
            className="w-full accent-[#65C93F] cursor-pointer"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        className="lc-btn w-full py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
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
    </div>
  );
}
