'use client';

import React, { useState } from 'react';
import { Sparkles, MessageSquare, Video, ChevronDown, Check, Hash } from 'lucide-react';
import { ChatMode } from '@strangerconnect/shared';

interface MatchCardProps {
  selectedMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  onStart: () => void;
  isConnecting: boolean;
  selectedInterests: string[];
  onOpenInterests: () => void;
}

export function MatchCard({
  selectedMode,
  onSelectMode,
  onStart,
  isConnecting,
  selectedInterests,
  onOpenInterests,
}: MatchCardProps) {
  const [filterGender, setFilterGender] = useState<'both' | 'male' | 'female'>('both');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl bg-[#6f47fc] border-2 border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-between text-white">
      {/* Top Mode Toggle: [ SOLO ] [ SQUAD / TEXT ] */}
      <div className="flex items-center p-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-bold">
        <button
          type="button"
          onClick={() => onSelectMode('video')}
          className={`px-4 sm:px-5 py-1.5 rounded-full transition-all ${
            selectedMode === 'video' || selectedMode === 'both'
              ? 'bg-brand-yellow text-slate-900 font-extrabold shadow'
              : 'text-white/80 hover:text-white'
          }`}
        >
          SOLO
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('text')}
          className={`px-4 sm:px-5 py-1.5 rounded-full transition-all ${
            selectedMode === 'text'
              ? 'bg-brand-yellow text-slate-900 font-extrabold shadow'
              : 'text-white/80 hover:text-white'
          }`}
        >
          TEXT CHAT
        </button>
      </div>

      {/* Center Mascot & Identity */}
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 my-auto">
        {/* Mascot App Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 border-2 border-white/20 shadow-2xl flex items-center justify-center text-4xl sm:text-5xl transform hover:scale-105 transition-transform select-none">
          🐵
        </div>

        {/* Title & Slogan */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
            Let&apos;s Chat
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium">
            Make new friends face-to-face
          </p>
        </div>

        {/* Selected Interests Pill (if any) */}
        {selectedInterests.length > 0 && (
          <button
            type="button"
            onClick={onOpenInterests}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
          >
            <Hash className="w-3 h-3 text-brand-yellow" />
            <span>{selectedInterests.slice(0, 2).join(', ')}{selectedInterests.length > 2 ? ` +${selectedInterests.length - 2}` : ''}</span>
          </button>
        )}
      </div>

      {/* Bottom Controls: Filter Pill & Yellow CTA Button */}
      <div className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center space-y-3">
        {/* Filter Pill */}
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="w-full py-2.5 px-4 rounded-full bg-white text-slate-800 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-sm">
              {filterGender === 'both' ? '👫 Both' : filterGender === 'male' ? '🙋‍♂️ Male' : '🙋‍♀️ Female'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Gender Filter Dropdown */}
          {isFilterDropdownOpen && (
            <div className="absolute bottom-12 left-0 right-0 p-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 text-xs font-bold z-20 animate-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => {
                  setFilterGender('both');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl flex items-center justify-between hover:bg-slate-100 ${
                  filterGender === 'both' ? 'text-brand-purple bg-purple-50' : ''
                }`}
              >
                <span>👫 Both (All)</span>
                {filterGender === 'both' && <Check className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterGender('male');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl flex items-center justify-between hover:bg-slate-100 ${
                  filterGender === 'male' ? 'text-brand-purple bg-purple-50' : ''
                }`}
              >
                <span>🙋‍♂️ Male Only</span>
                {filterGender === 'male' && <Check className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterGender('female');
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl flex items-center justify-between hover:bg-slate-100 ${
                  filterGender === 'female' ? 'text-brand-purple bg-purple-50' : ''
                }`}
              >
                <span>🙋‍♀️ Female Only</span>
                {filterGender === 'female' && <Check className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* Primary Start Button */}
        <button
          type="button"
          onClick={onStart}
          disabled={isConnecting}
          className="w-full py-3.5 sm:py-4 rounded-full brand-yellow-btn font-black text-sm sm:text-base tracking-wide text-black uppercase shadow-[0_5px_0_#ccb700] hover:shadow-[0_6px_0_#ccb700] active:shadow-[0_2px_0_#ccb700] transition-all flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <span>Connecting...</span>
          ) : (
            <span>{selectedMode === 'text' ? 'Start Text Chat' : 'Start Video Chat'}</span>
          )}
        </button>
      </div>
    </div>
  );
}
