'use client';

import React, { useState } from 'react';
import { X, User, Tag, MessageSquare, Users, ShieldCheck, Settings, Gem } from 'lucide-react';
import { ProfileTab } from './tabs/ProfileTab';
import { InterestsTab } from './tabs/InterestsTab';
import { ChatsTab } from './tabs/ChatsTab';
import { FriendsTab } from './tabs/FriendsTab';
import { SafetyTab } from './tabs/SafetyTab';
import { SettingsTab } from './tabs/SettingsTab';
import { PricingTab } from './tabs/PricingTab';

export type MingleoTab = 'profile' | 'interests' | 'chats' | 'friends' | 'safety' | 'settings' | 'pricing';

interface MingleoDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: MingleoTab;
  selectedInterests?: string[];
  onInterestsChange?: (interests: string[]) => void;
}

export function MingleoDashboardModal({
  isOpen,
  onClose,
  initialTab = 'profile',
  selectedInterests = [],
  onInterestsChange = () => {},
}: MingleoDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<MingleoTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_8px_0_#252820] rounded-3xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        {/* Left Sidebar Nav */}
        <aside className="w-full md:w-60 bg-[#EAF5D5] border-b-2 md:border-b-0 md:border-r-2 border-[#252820] p-4 sm:p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* Header / Brand in Modal */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-[#65A843] border-2 border-[#252820] flex items-center justify-center text-sm shadow-[0_2px_0_#252820]">
                💬
              </div>
              <span className="font-black text-lg text-[#252820] lowercase">mingleo</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'profile'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <User className="w-4 h-4 text-[#65A843]" />
                <span>Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interests')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'interests'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Tag className="w-4 h-4 text-[#65A843]" />
                <span>Interests</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('chats')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'chats'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#65A843]" />
                <span>Chats</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('friends')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'friends'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Users className="w-4 h-4 text-[#65A843]" />
                <span>Friends</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'pricing'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Gem className="w-4 h-4 text-[#65A843]" />
                <span>Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('safety')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'safety'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#65A843]" />
                <span>Safety</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  activeTab === 'settings'
                    ? 'bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-[#252820]'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Settings className="w-4 h-4 text-[#252820]" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Blocky Grass Cube with Yellow Flower (bottom left decoration from wireframe) */}
          <div className="hidden md:flex items-end gap-2 pt-6">
            <svg width="48" height="48" viewBox="0 0 24 24" shapeRendering="crispEdges">
              {/* Flower */}
              <rect x="11" y="2" width="2" height="6" fill="#4B8B2E" />
              <rect x="9" y="0" width="6" height="4" fill="#F5C518" stroke="#252820" strokeWidth="0.5" />
              {/* Cube Top (Grass) */}
              <polygon points="12,8 22,13 12,18 2,13" fill="#65A843" stroke="#252820" strokeWidth="0.8" />
              {/* Left Side (Dirt) */}
              <polygon points="2,13 12,18 12,24 2,19" fill="#794D2C" stroke="#252820" strokeWidth="0.8" />
              {/* Right Side (Dirt) */}
              <polygon points="12,18 22,13 22,19 12,24" fill="#5C3A20" stroke="#252820" strokeWidth="0.8" />
            </svg>
            <div className="text-[10px] font-bold text-slate-500">
              mingleo v1.0
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto relative flex flex-col justify-between">
          {/* Close 'X' Button on top-right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-[#252820] hover:bg-[#F4EBD9] transition-all z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Tab Views */}
          <div className="flex-1">
            {activeTab === 'profile' && <ProfileTab onSaved={onClose} />}
            {activeTab === 'interests' && (
              <InterestsTab
                selectedInterests={selectedInterests}
                onChange={onInterestsChange}
                onSaved={onClose}
              />
            )}
            {activeTab === 'chats' && <ChatsTab />}
            {activeTab === 'friends' && <FriendsTab />}
            {activeTab === 'pricing' && <PricingTab onClose={onClose} />}
            {activeTab === 'safety' && <SafetyTab onClose={onClose} />}
            {activeTab === 'settings' && <SettingsTab onSaved={onClose} />}
          </div>
        </main>
      </div>
    </div>
  );
}
