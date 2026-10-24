'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Screen1Home } from './screens/Screen1Home';
import { Screen2LiveChat } from './screens/Screen2LiveChat';
import { Screen3Profile } from './screens/Screen3Profile';
import { Screen4Pricing } from './screens/Screen4Pricing';
import { Screen5Interests } from './screens/Screen5Interests';
import { Screen6Friends } from './screens/Screen6Friends';
import { Screen7Safety } from './screens/Screen7Safety';
import { Screen8Settings } from './screens/Screen8Settings';
import { LetsChatFeatureShell, FeatureTabId } from './screens/LetsChatFeatureShell';

interface LetsChatScreensModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScreen?: number;
  onStartChatting?: () => void;
  selectedInterests?: string[];
  onInterestsChange?: (interests: string[]) => void;
}

export function LetsChatScreensModal({
  isOpen,
  onClose,
  initialScreen = 3,
  onStartChatting = () => {},
  selectedInterests = ['gaming', 'minecraft'],
  onInterestsChange = () => {},
}: LetsChatScreensModalProps) {
  const [currentScreen, setCurrentScreen] = useState<number>(initialScreen);

  // Sync initialScreen if changed
  React.useEffect(() => {
    setCurrentScreen(initialScreen);
  }, [initialScreen]);

  if (!isOpen) return null;

  // Map screen number to FeatureTabId
  const getTabIdForScreen = (screen: number): FeatureTabId => {
    switch (screen) {
      case 3: return 'profile';
      case 4: return 'pricing';
      case 5: return 'interests';
      case 6: return 'friends';
      case 7: return 'safety';
      case 8: return 'settings';
      default: return 'profile';
    }
  };

  const handleTabChange = (tab: FeatureTabId) => {
    switch (tab) {
      case 'profile': setCurrentScreen(3); break;
      case 'pricing': setCurrentScreen(4); break;
      case 'interests': setCurrentScreen(5); break;
      case 'chats':
      case 'friends': setCurrentScreen(6); break;
      case 'safety': setCurrentScreen(7); break;
      case 'settings': setCurrentScreen(8); break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-5xl max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top 8-Screen Quick Navigation Pill Bar */}
        <div className="bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_4px_0_#111111] rounded-2xl px-3 py-2 mb-3 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-black text-xs text-[#111111] mr-1 hidden sm:inline">Reference Screens:</span>
            {[
              { num: 1, label: '1. Home' },
              { num: 2, label: '2. Live Chat' },
              { num: 3, label: '3. Profile' },
              { num: 4, label: '4. Pricing' },
              { num: 5, label: '5. Interests' },
              { num: 6, label: '6. Friends' },
              { num: 7, label: '7. Safety' },
              { num: 8, label: '8. Settings' },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentScreen(s.num)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currentScreen === s.num
                    ? 'bg-[#65C93F] text-white border border-[#111111] shadow-[0_1px_0_#111111]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white border border-[#111111] shadow-[0_1px_0_#111111] flex items-center justify-center text-[#111111] hover:bg-slate-100 shrink-0 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen View */}
        <div className="overflow-y-auto rounded-[22px]">
          {currentScreen === 1 && (
            <Screen1Home
              onStartChatting={() => {
                onClose();
                onStartChatting();
              }}
            />
          )}

          {currentScreen === 2 && (
            <Screen2LiveChat
              onNext={onStartChatting}
              onEnd={onClose}
            />
          )}

          {currentScreen >= 3 && currentScreen <= 8 && (
            <LetsChatFeatureShell
              activeTab={getTabIdForScreen(currentScreen)}
              onTabChange={handleTabChange}
              onClose={onClose}
            >
              {currentScreen === 3 && <Screen3Profile onSaved={onClose} />}
              {currentScreen === 4 && <Screen4Pricing onClose={onClose} />}
              {currentScreen === 5 && (
                <Screen5Interests
                  selectedInterests={selectedInterests}
                  onChange={onInterestsChange}
                  onSaved={onClose}
                />
              )}
              {currentScreen === 6 && <Screen6Friends />}
              {currentScreen === 7 && <Screen7Safety />}
              {currentScreen === 8 && <Screen8Settings onSaved={onClose} />}
            </LetsChatFeatureShell>
          )}
        </div>
      </div>
    </div>
  );
}
