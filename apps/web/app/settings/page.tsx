'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LetsChatNav } from '../../components/letschat/LetsChatNav';
import { LetsChatFooterTerrain } from '../../components/letschat/LetsChatFooterTerrain';
import { LetsChatFeatureShell } from '../../components/letschat/screens/LetsChatFeatureShell';
import { Screen8Settings } from '../../components/letschat/screens/Screen8Settings';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] select-none">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <LetsChatNav onOpenScreen={(num) => {
          if (num === 3) router.push('/profile');
          if (num === 4) router.push('/pricing');
          if (num === 5) router.push('/interests');
          if (num === 6) router.push('/friends');
          if (num === 7) router.push('/safety');
        }} />

        <div className="my-6">
          <LetsChatFeatureShell
            activeTab="settings"
            onTabChange={(tab) => {
              if (tab === 'profile') router.push('/profile');
              if (tab === 'pricing') router.push('/pricing');
              if (tab === 'interests') router.push('/interests');
              if (tab === 'chats' || tab === 'friends') router.push('/friends');
              if (tab === 'safety') router.push('/safety');
            }}
          >
            <Screen8Settings onSaved={() => router.push('/')} />
          </LetsChatFeatureShell>
        </div>
      </div>

      <LetsChatFooterTerrain />
    </div>
  );
}
