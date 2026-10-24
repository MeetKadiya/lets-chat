'use client';

import React, { useState } from 'react';
import { Check, Minus, Gem, Sparkles } from 'lucide-react';

interface PricingTabProps {
  onClose?: () => void;
}

export function PricingTab({ onClose }: PricingTabProps) {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      onClose?.();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-[#65A843]" />
          <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Choose Your Plan</h2>
        </div>
        <p className="text-xs font-semibold text-slate-600">More features. Better connections.</p>
      </div>

      {/* Two Plan Cards Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Free Plan Card */}
        <div className="p-5 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_4px_0_#252820] flex flex-col justify-between space-y-4">
          <div>
            {/* Block Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#65A843] border-2 border-[#252820] shadow-[0_2px_0_#252820] flex flex-col overflow-hidden mb-3">
              <div className="h-3 bg-[#58973A] border-b border-[#252820]" />
              <div className="flex-1 bg-[#794D2C]" />
            </div>

            <div className="font-black text-lg text-[#252820]">Free</div>
            <div className="text-2xl font-black text-[#252820] mt-1">
              $0 <span className="text-xs font-bold text-slate-500">/ month</span>
            </div>

            {/* Checklist */}
            <ul className="space-y-2 text-xs font-semibold text-slate-700 mt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Random 1-on-1 video chats</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Basic topic filters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Chat history (7 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Add 1 friend at a time</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 rounded-xl bg-[#F4EBD9] border-2 border-[#252820] text-xs font-black text-slate-600 cursor-default"
          >
            Current Plan
          </button>
        </div>

        {/* Plus Plan Card */}
        <div className="relative p-5 rounded-2xl bg-[#EAF5D5] border-2 border-[#252820] shadow-[0_4px_0_#252820] flex flex-col justify-between space-y-4">
          {/* Badge */}
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#65A843] border-2 border-[#252820] text-white text-[10px] font-black uppercase tracking-wider shadow">
            Most Popular
          </div>

          <div>
            {/* Gem Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#8CCDF4] border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-xl mb-3">
              💎
            </div>

            <div className="font-black text-lg text-[#252820]">Mingleo Plus</div>
            <div className="text-2xl font-black text-[#252820] mt-1">
              $4.99 <span className="text-xs font-bold text-slate-600">/ month</span>
            </div>

            {/* Checklist */}
            <ul className="space-y-2 text-xs font-semibold text-slate-700 mt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>All Free features included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Advanced gender & region filters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Unlimited chat history</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Add up to 50 friends</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Priority matching queue</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65A843] stroke-[3]" />
                <span>Ad-free clean experience</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleSubscribe}
            className="mingleo-btn-green w-full py-2.5 rounded-xl text-xs font-black shadow-md"
          >
            {subscribed ? '✓ Subscribed!' : 'Subscribe Now'}
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-4 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] space-y-2 text-xs">
        <div className="grid grid-cols-3 font-black text-[#252820] border-b-2 border-[#252820] pb-2">
          <span>Feature Comparison</span>
          <span className="text-center">Free</span>
          <span className="text-center text-[#65A843]">Plus</span>
        </div>
        <div className="grid grid-cols-3 py-1 font-semibold text-slate-700">
          <span>Random Chats</span>
          <span className="text-center text-[#65A843] font-black">✓</span>
          <span className="text-center text-[#65A843] font-black">✓</span>
        </div>
        <div className="grid grid-cols-3 py-1 font-semibold text-slate-700">
          <span>Advanced Filters</span>
          <span className="text-center text-slate-400 font-bold">—</span>
          <span className="text-center text-[#65A843] font-black">✓</span>
        </div>
        <div className="grid grid-cols-3 py-1 font-semibold text-slate-700">
          <span>Unlimited History</span>
          <span className="text-center text-slate-400 font-bold">—</span>
          <span className="text-center text-[#65A843] font-black">✓</span>
        </div>
      </div>
    </div>
  );
}
