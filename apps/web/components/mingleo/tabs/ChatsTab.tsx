'use client';

import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

const RECENT_CHATS = [
  { id: '1', name: 'PixelBuilder', avatar: '👦', snippet: 'That build looks awesome!', time: '10m ago' },
  { id: '2', name: 'PixelQueen', avatar: '👧', snippet: "Let's play together!", time: '2h ago' },
  { id: '3', name: 'CraftMaster', avatar: '👨‍🌾', snippet: 'Nice to meet you!', time: 'Yesterday' },
  { id: '4', name: 'SkyExplorer', avatar: '🧙', snippet: 'Where are you from?', time: '2d ago' },
  { id: '5', name: 'RedstonePro', avatar: '🤖', snippet: 'Good chat!', time: '3d ago' },
];

export function ChatsTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Recent Chats</h2>
        <p className="text-xs font-semibold text-slate-600">Your recent conversation connections.</p>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {RECENT_CHATS.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] hover:bg-[#F4EBD9] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5D5] border-2 border-[#252820] flex items-center justify-center text-xl select-none shrink-0">
                {chat.avatar}
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm text-[#252820]">{chat.name}</div>
                <div className="text-[11px] font-medium text-slate-600 truncate max-w-[180px] sm:max-w-[240px]">
                  {chat.snippet}
                </div>
              </div>
            </div>
            <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              <span>{chat.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mingleo-btn-white w-full py-2.5 rounded-xl text-xs font-black"
      >
        View All History
      </button>
    </div>
  );
}
