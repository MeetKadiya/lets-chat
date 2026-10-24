'use client';

import React, { useState } from 'react';
import { UserPlus, Circle } from 'lucide-react';

const FRIENDS_LIST = [
  { id: '1', name: 'PixelQueen', avatar: '👧', online: true },
  { id: '2', name: 'AlexBuilder', avatar: '👦', online: true },
  { id: '3', name: 'CraftMaster', avatar: '👨‍🌾', online: false, status: 'Away' },
  { id: '4', name: 'SkyExplorer', avatar: '🧙', online: false, status: 'Offline' },
  { id: '5', name: 'GamingGuru', avatar: '🎮', online: false, status: 'Offline' },
];

export function FriendsTab() {
  const [friendCount, setFriendCount] = useState(12);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#252820]">Friends ({friendCount})</h2>
          <p className="text-xs font-semibold text-slate-600">People you connected with on mingleo.</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Share your profile link to add friends!')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl mingleo-btn-green text-xs font-black"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Add Friend</span>
        </button>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {FRIENDS_LIST.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] hover:bg-[#F4EBD9] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5D5] border-2 border-[#252820] flex items-center justify-center text-xl select-none">
                  {friend.avatar}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#252820] ${
                    friend.online ? 'bg-[#65A843]' : 'bg-slate-400'
                  }`}
                />
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm text-[#252820]">{friend.name}</div>
                <div className="text-[11px] font-bold text-slate-500">
                  {friend.online ? 'Online' : friend.status}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="px-3 py-1 rounded-lg bg-[#EAF5D5] border border-[#252820] text-xs font-bold text-[#252820] hover:bg-[#65A843] hover:text-white transition-colors"
            >
              Chat
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mingleo-btn-white w-full py-2.5 rounded-xl text-xs font-black"
      >
        View All Friends
      </button>
    </div>
  );
}
