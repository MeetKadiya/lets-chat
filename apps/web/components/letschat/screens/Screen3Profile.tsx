'use client';

import React, { useState } from 'react';
import { Camera, Check } from 'lucide-react';

interface Screen3ProfileProps {
  onSaved?: () => void;
}

export function Screen3Profile({ onSaved }: Screen3ProfileProps) {
  const [displayName, setDisplayName] = useState('BlockyBuddy');
  const [bio, setBio] = useState('Love gaming, building, and meeting new people! Let\'s have some fun chats!');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSaved?.();
    }, 1200);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-lg mx-auto">
      {/* Title */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">Your Profile</h2>
        <p className="text-xs font-bold text-slate-600 mt-0.5">Customize how you appear to others on Let&apos;s Chat.</p>
      </div>

      {/* Big Circular Avatar with Edit Camera */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#8BC9F6] border-4 border-[#111111] shadow-[0_4px_0_#111111] overflow-hidden flex items-center justify-center">
            <img
              src="/assets/characters/player-blue.svg"
              alt="Profile Avatar"
              className="w-full h-full object-cover scale-110 mt-2"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] flex items-center justify-center text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Change Avatar"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Display Name Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-black text-[#111111] uppercase tracking-wide">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={30}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] font-bold text-sm text-[#111111] focus:outline-none focus:border-[#65C93F]"
        />
      </div>

      {/* Bio Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#111111] uppercase tracking-wide">
            Bio
          </label>
          <span className="text-[11px] font-bold text-slate-500">
            {bio.length}/120
          </span>
        </div>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={120}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] font-medium text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#65C93F] resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="lc-btn w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Profile Saved!</span>
          </>
        ) : (
          <span>Save Changes</span>
        )}
      </button>
    </form>
  );
}
