'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LetsChatNav } from '../../components/letschat/LetsChatNav';
import { LetsChatFooterTerrain } from '../../components/letschat/LetsChatFooterTerrain';
import { LetsChatFeatureShell } from '../../components/letschat/screens/LetsChatFeatureShell';
import { Screen7Safety } from '../../components/letschat/screens/Screen7Safety';
import { ReportModal } from '../../components/moderation/ReportModal';

export default function SafetyPage() {
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E8F2DF] text-[#111111] select-none">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <LetsChatNav onOpenScreen={(num) => {
          if (num === 3) router.push('/profile');
          if (num === 4) router.push('/pricing');
          if (num === 5) router.push('/interests');
          if (num === 6) router.push('/friends');
          if (num === 8) router.push('/settings');
        }} />

        <div className="my-6">
          <LetsChatFeatureShell
            activeTab="safety"
            onTabChange={(tab) => {
              if (tab === 'profile') router.push('/profile');
              if (tab === 'pricing') router.push('/pricing');
              if (tab === 'interests') router.push('/interests');
              if (tab === 'chats' || tab === 'friends') router.push('/friends');
              if (tab === 'settings') router.push('/settings');
            }}
          >
            <Screen7Safety onOpenReport={() => setIsReportOpen(true)} />
          </LetsChatFeatureShell>
        </div>
      </div>

      <LetsChatFooterTerrain />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={(category, details) => {
          alert(`Report submitted: ${category} - ${details}`);
          setIsReportOpen(false);
        }}
      />
    </div>
  );
}
