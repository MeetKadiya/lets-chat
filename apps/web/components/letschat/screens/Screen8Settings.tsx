'use client';

import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

interface Screen8SettingsProps {
  onSaved?: () => void;
}

export function Screen8Settings({ onSaved }: Screen8SettingsProps) {
  const [email, setEmail] = useState('blockybuddy@email.com');
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('(UTC-5) Eastern Time');

  const [msgAlerts, setMsgAlerts] = useState(true);
  const [friendReqs, setFriendReqs] = useState(true);
  const [chatReminders, setChatReminders] = useState(true);
  const [marketing, setMarketing] = useState(false);

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
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">Account Settings</h2>
      </div>

      {/* Account Section */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-[#111111] uppercase tracking-wide">
          Account
        </h4>

        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl divide-y divide-[#111111]/10 overflow-hidden">
          {/* Email Row */}
          <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-700">Email</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#111111]">{email}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Password Row */}
          <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-700">Password</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#111111]">••••••••••••</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Language Row */}
          <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-700">Language</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#111111]">{language}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Time Zone Row */}
          <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-700">Time Zone</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#111111]">{timeZone}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-[#111111] uppercase tracking-wide">
          Notifications
        </h4>

        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 space-y-3 divide-y divide-[#111111]/10">
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs sm:text-sm font-black text-[#111111]">New Message Alerts</span>
            <button
              type="button"
              onClick={() => setMsgAlerts(!msgAlerts)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                msgAlerts ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  msgAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs sm:text-sm font-black text-[#111111]">Friend Requests</span>
            <button
              type="button"
              onClick={() => setFriendReqs(!friendReqs)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                friendReqs ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  friendReqs ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs sm:text-sm font-black text-[#111111]">Chat Reminders</span>
            <button
              type="button"
              onClick={() => setChatReminders(!chatReminders)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                chatReminders ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  chatReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs sm:text-sm font-black text-[#111111]">Marketing Updates</span>
            <button
              type="button"
              onClick={() => setMarketing(!marketing)}
              className={`w-11 h-6 rounded-full border-2 border-[#111111] p-0.5 transition-colors relative cursor-pointer ${
                marketing ? 'bg-[#65C93F]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#111111] shadow-[0_1px_0_#111111] transition-transform ${
                  marketing ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="lc-btn w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Settings Saved!</span>
          </>
        ) : (
          <span>Save Changes</span>
        )}
      </button>
    </form>
  );
}
