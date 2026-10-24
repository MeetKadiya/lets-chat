'use client';

import React, { useState } from 'react';
import { ShieldCheck, Flag, ShieldAlert, AlertTriangle } from 'lucide-react';

interface Screen7SafetyProps {
  onOpenReport?: () => void;
}

export function Screen7Safety({ onOpenReport }: Screen7SafetyProps) {
  const [hideProfile, setHideProfile] = useState(false);
  const [blurBackground, setBlurBackground] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">Safety First</h2>
        <p className="text-xs font-bold text-slate-600 mt-0.5">We&apos;re here to keep you safe.</p>
      </div>

      {/* Action Buttons: Report a User & Blocked Users (3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Report a User */}
        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-black text-xs sm:text-sm text-[#111111]">Report User</h4>
            <p className="text-[11px] font-medium text-slate-600 mt-0.5">
              Report inappropriate behavior or content
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenReport}
            className="mt-3.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5 fill-current" />
            <span>Report a User</span>
          </button>
        </div>

        {/* Blocked Users */}
        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-black text-xs sm:text-sm text-[#111111]">Block Users</h4>
            <p className="text-[11px] font-medium text-slate-600 mt-0.5">
              Blocked users can&apos;t see, chat with you
            </p>
          </div>
          <button
            type="button"
            className="mt-3.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Blocked Users (3)</span>
          </button>
        </div>
      </div>

      {/* Privacy Toggles */}
      <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-black text-[#111111] uppercase tracking-wide">
          Privacy
        </h4>

        <div className="space-y-3 divide-y divide-[#111111]/10">
          {/* Toggle 1: Hide profile */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#111111]">Hide my profile from searches</p>
              <p className="text-[11px] font-medium text-slate-500">Only match through random matchmaking</p>
            </div>
            <button
              type="button"
              onClick={() => setHideProfile(!hideProfile)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                hideProfile ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  hideProfile ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Blur background */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#111111]">Blur my background</p>
              <p className="text-[11px] font-medium text-slate-500">Hide your room details during live video chat</p>
            </div>
            <button
              type="button"
              onClick={() => setBlurBackground(!blurBackground)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                blurBackground ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  blurBackground ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Only show verified users */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#111111]">Only show verified users</p>
              <p className="text-[11px] font-medium text-slate-500">Filter out guest accounts and bots</p>
            </div>
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                verifiedOnly ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  verifiedOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Read receipts */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#111111]">Read receipts</p>
              <p className="text-[11px] font-medium text-slate-500">Show message delivered and seen ticks</p>
            </div>
            <button
              type="button"
              onClick={() => setReadReceipts(!readReceipts)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                readReceipts ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  readReceipts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Safety Notice Banner */}
      <div className="p-3.5 bg-[#E8F2DF] border-2 border-[#111111] shadow-[0_2px_0_#111111] rounded-xl flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#278344] shrink-0" />
        <span className="text-xs font-bold text-[#111111]">
          If you see something wrong, report it. We take actions seriously.
        </span>
      </div>
    </div>
  );
}
