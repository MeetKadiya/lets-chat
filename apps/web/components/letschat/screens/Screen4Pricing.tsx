'use client';

import React, { useState } from 'react';
import { Check, Gem, Sparkles } from 'lucide-react';

interface Screen4PricingProps {
  onClose?: () => void;
}

export function Screen4Pricing({ onClose }: Screen4PricingProps) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">Choose Your Plan</h2>
        <p className="text-xs font-bold text-slate-600 mt-0.5">More features. Better connections.</p>
      </div>

      {/* Two Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Plan 1: Free */}
        <div className="bg-white border-2 border-[#111111] shadow-[0_4px_0_#111111] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 mb-3">
              <img src="/assets/environment/grass-block.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-black text-[#111111]">$0</span>
              <span className="text-xs font-bold text-slate-500">/ month</span>
            </div>

            <ul className="space-y-2 text-xs font-bold text-[#111111]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65C93F] stroke-[3]" />
                <span>Random chats</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65C93F] stroke-[3]" />
                <span>Basic filters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65C93F] stroke-[3]" />
                <span>Chat history (7 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65C93F] stroke-[3]" />
                <span>1 friend at a time</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              type="button"
              disabled
              className="w-full py-2.5 rounded-xl bg-slate-100 border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-slate-600 cursor-default"
            >
              Current Plan
            </button>
          </div>
        </div>

        {/* Plan 2: Plus ($4.99/mo) */}
        <div className="bg-[#E8F2DF] border-2 border-[#111111] shadow-[0_4px_0_#111111] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          {/* Most Popular Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#65C93F] border border-[#111111] text-[10px] font-black text-white shadow-[0_1px_0_#111111]">
            Most Popular
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-6 h-6 text-[#278344]" />
              <h3 className="font-black text-lg text-[#111111]">Plus</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-black text-[#111111]">$4.99</span>
              <span className="text-xs font-bold text-slate-600">/ month</span>
            </div>

            <ul className="space-y-2 text-xs font-black text-[#111111]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>All Free features</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>Advanced filters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>Unlimited chat history</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>Add up to 50 friends</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>Priority matching</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#278344] stroke-[3]" />
                <span>Ad-free experience</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setSubscribed(true)}
              className="lc-btn w-full py-2.5 text-xs sm:text-sm font-black"
            >
              {subscribed ? '✓ Subscribed to Plus!' : 'Subscribe Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4">
        <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider mb-3">
          Compare Plans
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-[#111111]/20 font-black text-[#111111]">
                <th className="text-left py-1.5">Feature</th>
                <th className="text-center py-1.5 w-20">Free</th>
                <th className="text-center py-1.5 w-20">Plus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]/10 font-bold text-slate-800">
              <tr>
                <td className="py-2">Random Chats</td>
                <td className="text-center py-2 text-[#65C93F] font-black">✓</td>
                <td className="text-center py-2 text-[#278344] font-black">✓</td>
              </tr>
              <tr>
                <td className="py-2">Advanced Filters</td>
                <td className="text-center py-2 text-slate-400">—</td>
                <td className="text-center py-2 text-[#278344] font-black">✓</td>
              </tr>
              <tr>
                <td className="py-2">Unlimited History</td>
                <td className="text-center py-2 text-slate-400">—</td>
                <td className="text-center py-2 text-[#278344] font-black">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
