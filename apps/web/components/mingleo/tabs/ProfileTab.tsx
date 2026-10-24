'use client';

import React, { useState } from 'react';
import { Camera, Check } from 'lucide-react';

interface ProfileTabProps {
  onSaved?: () => void;
}

export function ProfileTab({ onSaved }: ProfileTabProps) {
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
    <form onSubmit={handleSave} className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Your Profile</h2>
        <p className="text-xs font-semibold text-slate-600">Customize how you appear to others on mingleo.</p>
      </div>

      {/* Avatar & Edit Icon */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#3498DB] border-4 border-[#252820] shadow-[0_4px_0_#252820] flex items-center justify-center text-4xl select-none overflow-hidden">
            👦
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-[#252820] hover:bg-[#EAF5D5] transition-colors"
            title="Change Avatar"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Display Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-black text-[#252820] uppercase tracking-wide">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={30}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] font-bold text-sm text-[#252820] focus:outline-none focus:border-[#65A843]"
        />
      </div>

      {/* Bio Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#252820] uppercase tracking-wide">
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
          className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] font-medium text-xs sm:text-sm text-[#252820] focus:outline-none focus:border-[#65A843] resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="mingleo-btn-green w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
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
