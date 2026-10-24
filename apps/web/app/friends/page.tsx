'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LetsChatNav } from '../../components/letschat/LetsChatNav';
import { LetsChatFooterTerrain } from '../../components/letschat/LetsChatFooterTerrain';
import { LetsChatFeatureShell } from '../../components/letschat/screens/LetsChatFeatureShell';
import { Screen6Friends } from '../../components/letschat/screens/Screen6Friends';

export default function FriendsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] select-none">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <LetsChatNav onOpenScreen={(num) => {
          if (num === 3) router.push('/profile');
          if (num === 4) router.push('/pricing');
          if (num === 5) router.push('/interests');
          if (num === 7) router.push('/safety');
          if (num === 8) router.push('/settings');
        }} />

        <div className="my-6">
          <LetsChatFeatureShell
            activeTab="friends"
            onTabChange={(tab) => {
              if (tab === 'profile') router.push('/profile');
              if (tab === 'pricing') router.push('/pricing');
              if (tab === 'interests') router.push('/interests');
              if (tab === 'safety') router.push('/safety');
              if (tab === 'settings') router.push('/settings');
            }}
          >
            <Screen6Friends />
          </LetsChatFeatureShell>
        </div>
      </div>

      <LetsChatFooterTerrain />
    </div>
  );
}
