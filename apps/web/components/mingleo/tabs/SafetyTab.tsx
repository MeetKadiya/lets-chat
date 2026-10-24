'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserX, AlertTriangle, Check, Lock } from 'lucide-react';

interface SafetyTabProps {
  onClose?: () => void;
}

export function SafetyTab({ onClose }: SafetyTabProps) {
  const [hideProfile, setHideProfile] = useState(false);
  const [blurBackground, setBlurBackground] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);

  const [blockedUsers, setBlockedUsers] = useState([
    { id: '1', name: 'pixel_troll', avatar: '🧟', reason: 'Inappropriate language' },
    { id: '2', name: 'spammer_99', avatar: '🤖', reason: 'Spamming links' },
    { id: '3', name: 'creeper_bad', avatar: '👺', reason: 'Harassment' },
  ]);

  const handleUnblock = (id: string) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#65A843]" />
          <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Safety & Privacy</h2>
        </div>
        <p className="text-xs font-semibold text-slate-600 mt-0.5">
          Your safety, security, and privacy are our top priorities on mingleo.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-3.5 bg-[#FFF2E2] border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-[#252820]">
          <span className="font-black">Stay Safe:</span> Never share sensitive personal info, real names, phone numbers, home addresses, or passwords with strangers.
        </div>
      </div>

      {/* Privacy Switches */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-[#252820] uppercase tracking-wide">
          Privacy Preferences
        </h3>

        <div className="space-y-2">
          {/* Toggle 1: Hide profile */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Hide profile from public searches</p>
              <p className="text-[11px] font-medium text-slate-500">Only match with peers during active matchmaking</p>
            </div>
            <button
              type="button"
              onClick={() => setHideProfile(!hideProfile)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                hideProfile ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  hideProfile ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Blur background */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Blur background during video chat</p>
              <p className="text-[11px] font-medium text-slate-500">Protect your room and surroundings automatically</p>
            </div>
            <button
              type="button"
              onClick={() => setBlurBackground(!blurBackground)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                blurBackground ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  blurBackground ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Only show verified users */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Only match with verified users</p>
              <p className="text-[11px] font-medium text-slate-500">Filters out unverified or guest accounts</p>
            </div>
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                verifiedOnly ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  verifiedOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Read receipts */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Send read receipts</p>
              <p className="text-[11px] font-medium text-slate-500">Show message delivery and read indicators in text chat</p>
            </div>
            <button
              type="button"
              onClick={() => setReadReceipts(!readReceipts)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                readReceipts ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  readReceipts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Blocked Users Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-[#252820] uppercase tracking-wide">
            Blocked Users ({blockedUsers.length})
          </h3>
          <span className="text-[11px] font-bold text-slate-500">
            Blocked users cannot call or match with you
          </span>
        </div>

        {blockedUsers.length === 0 ? (
          <div className="p-4 bg-white/70 border-2 border-dashed border-[#252820]/40 rounded-xl text-center text-xs font-bold text-slate-500">
            No blocked users. Everyone is behaving well! 🎉
          </div>
        ) : (
          <div className="space-y-2">
            {blockedUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border-2 border-[#252820] flex items-center justify-center text-base">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#252820]">@{user.name}</p>
                    <p className="text-[10px] font-semibold text-slate-500">{user.reason}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleUnblock(user.id)}
                  className="px-3 py-1 rounded-lg bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] hover:bg-slate-100 text-[11px] font-black text-[#252820] transition-transform active:translate-y-0.5 active:shadow-none"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Guidelines Link / Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onClose}
          className="mingleo-btn-white w-full py-2.5 rounded-xl text-xs sm:text-sm font-black"
        >
          Done
        </button>
      </div>
    </div>
  );
}
