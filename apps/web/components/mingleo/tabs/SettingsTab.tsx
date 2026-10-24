'use client';

import React, { useState } from 'react';
import { Settings, Bell, Check, Globe, Clock, Mail, ShieldAlert } from 'lucide-react';

interface SettingsTabProps {
  onSaved?: () => void;
}

export function SettingsTab({ onSaved }: SettingsTabProps) {
  const [email, setEmail] = useState('alex@mingleo.app');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');

  // Notification toggles
  const [msgAlerts, setMsgAlerts] = useState(true);
  const [friendAlerts, setFriendAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [marketingAlerts, setMarketingAlerts] = useState(false);

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
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#252820]" />
          <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Account & Settings</h2>
        </div>
        <p className="text-xs font-semibold text-slate-600 mt-0.5">
          Manage your account preferences, notifications, and audio.
        </p>
      </div>

      {/* Account Settings */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-[#252820] uppercase tracking-wide">
          Account Details
        </h3>

        <div className="space-y-2">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#252820] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] font-bold text-xs sm:text-sm text-[#252820] focus:outline-none focus:border-[#65A843]"
            />
          </div>

          {/* Grid: Language & Timezone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#252820] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] font-bold text-xs sm:text-sm text-[#252820] focus:outline-none focus:border-[#65A843]"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#252820] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Time Zone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] font-bold text-xs sm:text-sm text-[#252820] focus:outline-none focus:border-[#65A843]"
              >
                <option value="UTC-8">UTC-8 (Pacific Time)</option>
                <option value="UTC-5">UTC-5 (Eastern Time)</option>
                <option value="UTC+0">UTC+0 (London / GMT)</option>
                <option value="UTC+1">UTC+1 (Central Europe)</option>
                <option value="UTC+5:30">UTC+5:30 (India IST)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-black text-[#252820] uppercase tracking-wide">
            Notifications & Sounds
          </h3>
        </div>

        <div className="space-y-2">
          {/* Toggle 1: New Message Alerts */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">New Message Alerts</p>
              <p className="text-[11px] font-medium text-slate-500">Show notification banner when a friend messages you</p>
            </div>
            <button
              type="button"
              onClick={() => setMsgAlerts(!msgAlerts)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                msgAlerts ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  msgAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Friend Requests */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Friend Requests</p>
              <p className="text-[11px] font-medium text-slate-500">Notify when someone requests to be friends</p>
            </div>
            <button
              type="button"
              onClick={() => setFriendAlerts(!friendAlerts)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                friendAlerts ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  friendAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Sound effects */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Sound Effects</p>
              <p className="text-[11px] font-medium text-slate-500">Play chime when connected to a new stranger</p>
            </div>
            <button
              type="button"
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                soundEffects ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Marketing Updates */}
          <div className="p-3 bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-black text-[#252820]">Mingleo Announcements</p>
              <p className="text-[11px] font-medium text-slate-500">Occasional updates about new features and events</p>
            </div>
            <button
              type="button"
              onClick={() => setMarketingAlerts(!marketingAlerts)}
              className={`w-12 h-6 rounded-full border-2 border-[#252820] p-0.5 transition-colors relative ${
                marketingAlerts ? 'bg-[#65A843]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white border border-[#252820] shadow-[0_1px_0_#252820] transition-transform ${
                  marketingAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
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
            <span>Settings Saved!</span>
          </>
        ) : (
          <span>Save Preferences</span>
        )}
      </button>
    </form>
  );
}
