'use client';

import React from 'react';
import { User, Tag, MessageSquare, Users, ShieldCheck, Settings, Gem, X } from 'lucide-react';

export type FeatureTabId = 'profile' | 'interests' | 'chats' | 'friends' | 'pricing' | 'safety' | 'settings';

interface LetsChatFeatureShellProps {
  activeTab: FeatureTabId;
  onTabChange: (tab: FeatureTabId) => void;
  onClose?: () => void;
  children: React.ReactNode;
}

export function LetsChatFeatureShell({
  activeTab,
  onTabChange,
  onClose,
  children,
}: LetsChatFeatureShellProps) {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'interests', label: 'Interests', icon: Tag },
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'pricing', label: 'Subscription', icon: Gem },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="w-full bg-[#FFF9E9] border-2 border-[#111111] rounded-[22px] shadow-[0_6px_0_#111111] overflow-hidden flex flex-col md:flex-row min-h-[580px]">
      {/* Left Sidebar Navigation */}
      <aside className="w-full md:w-56 bg-[#FFF9E9] border-b-2 md:border-b-0 md:border-r-2 border-[#111111] p-4 sm:p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Header with Grass Cube */}
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b-2 border-[#111111]/15">
            <div className="w-7 h-7 shrink-0">
              <img src="/assets/environment/grass-block.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-lg text-[#111111] tracking-tight">Let&apos;s Chat</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id as FeatureTabId)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E8F2DF] border-2 border-[#111111] shadow-[0_2px_0_#111111] text-[#111111]'
                      : 'text-slate-700 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#278344]' : 'text-slate-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left: 3D Floating Grass Block with Yellow Flower */}
        <div className="hidden md:flex flex-col items-start pt-6">
          <div className="w-16 h-16">
            <img
              src="/assets/environment/floating-island-3d.svg"
              alt="Floating Block with Flower"
              className="w-full h-full object-contain animate-bounce duration-1000"
            />
          </div>
        </div>
      </aside>

      {/* Right Content Panel */}
      <main className="flex-1 p-5 sm:p-8 overflow-y-auto relative bg-[#FFF9E9]">
        {/* Optional Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] flex items-center justify-center text-[#111111] hover:bg-slate-100 transition-all cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {children}
      </main>
    </div>
  );
}
