'use client';

import React, { useState } from 'react';
import { UserPlus, MessageCircle, Clock } from 'lucide-react';

export function Screen6Friends() {
  const [activeFriend, setActiveFriend] = useState<string | null>(null);

  const recentChats = [
    { id: '1', name: 'AlexBuilder', avatar: '👦', message: 'That build looks awesome!', time: '10m ago' },
    { id: '2', name: 'PixelQueen', avatar: '👸', message: "Let's play together!", time: '1h ago' },
    { id: '3', name: 'CraftMaster', avatar: '🧙‍♂️', message: 'Nice to meet you!', time: 'Yesterday' },
    { id: '4', name: 'SkyExplorer', avatar: '🧑‍🚀', message: 'Where are you from?', time: '2d ago' },
    { id: '5', name: 'RedstonePro', avatar: '🤖', message: 'Good chat!', time: '3d ago' },
  ];

  const friends = [
    { id: '1', name: 'PixelQueen', avatar: '👸', status: 'Online', statusColor: 'bg-emerald-500' },
    { id: '2', name: 'AlexBuilder', avatar: '👦', status: 'Online', statusColor: 'bg-emerald-500' },
    { id: '3', name: 'CraftMaster', avatar: '🧙‍♂️', status: 'Away', statusColor: 'bg-amber-400' },
    { id: '4', name: 'SkyExplorer', avatar: '🧑‍🚀', status: 'Offline', statusColor: 'bg-slate-400' },
    { id: '5', name: 'GamingGuru', avatar: '🎮', status: 'Offline', statusColor: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6">
      {/* 2 Sub-Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Sub-column 1: Recent Chats */}
        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <h3 className="text-base font-black text-[#111111]">Recent Chats</h3>
              <p className="text-[11px] font-bold text-slate-500">Messages from matches</p>
            </div>

            <div className="space-y-2">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#111111]/20 hover:bg-[#E8F2DF] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-[#111111] flex items-center justify-center text-sm">
                      {chat.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#111111]">{chat.name}</p>
                      <p className="text-[11px] font-medium text-slate-600 truncate max-w-[140px] sm:max-w-[170px]">
                        {chat.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button
              type="button"
              className="w-full py-2 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-slate-50 transition-all cursor-pointer"
            >
              View All History
            </button>
          </div>
        </div>

        {/* Sub-column 2: Friends (12) */}
        <div className="bg-white border-2 border-[#111111] shadow-[0_3px_0_#111111] rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black text-[#111111]">Friends (12)</h3>
                <p className="text-[11px] font-bold text-slate-500">Connected peers</p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8F2DF] border border-[#111111] text-[11px] font-black text-[#278344] hover:bg-[#65C93F] hover:text-white transition-colors cursor-pointer"
              >
                <UserPlus className="w-3 h-3" />
                <span>+ Add Friend</span>
              </button>
            </div>

            <div className="space-y-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#111111]/20 hover:bg-[#E8F2DF] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-[#111111] flex items-center justify-center text-sm relative">
                      {friend.avatar}
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${friend.statusColor}`} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#111111]">{friend.name}</p>
                      <p className="text-[10px] font-semibold text-slate-500">{friend.status}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-white border border-[#111111] hover:bg-slate-100 text-[#111111]"
                    title="Send Message"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button
              type="button"
              className="w-full py-2 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-slate-50 transition-all cursor-pointer"
            >
              View All Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
