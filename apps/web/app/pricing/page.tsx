'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LetsChatNav } from '../../components/letschat/LetsChatNav';
import { LetsChatFooterTerrain } from '../../components/letschat/LetsChatFooterTerrain';
import { LetsChatFeatureShell } from '../../components/letschat/screens/LetsChatFeatureShell';
import { Screen4Pricing } from '../../components/letschat/screens/Screen4Pricing';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] select-none">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <LetsChatNav onOpenScreen={(num) => {
          if (num === 3) router.push('/profile');
          if (num === 5) router.push('/interests');
          if (num === 6) router.push('/friends');
          if (num === 7) router.push('/safety');
          if (num === 8) router.push('/settings');
        }} />

        <div className="my-6">
          <LetsChatFeatureShell
            activeTab="pricing"
            onTabChange={(tab) => {
              if (tab === 'profile') router.push('/profile');
              if (tab === 'interests') router.push('/interests');
              if (tab === 'chats' || tab === 'friends') router.push('/friends');
              if (tab === 'safety') router.push('/safety');
              if (tab === 'settings') router.push('/settings');
            }}
          >
            <Screen4Pricing />
          </LetsChatFeatureShell>
        </div>
      </div>

      <LetsChatFooterTerrain />
    </div>
  );
}
