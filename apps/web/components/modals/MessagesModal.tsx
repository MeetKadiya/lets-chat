'use client';

import React from 'react';
import { X, Search, ChevronRight, MessageSquare, Bell, Users, Sparkles } from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessagesModal({ isOpen, onClose }: MessagesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm mt-12 sm:mt-16 bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <h2 className="text-base font-bold tracking-tight">Message</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-1">
          {/* Friends Section */}
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-xl shadow-md">
              👫
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white group-hover:text-brand-yellow transition-colors">
                Friends
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">
                Gather your friends and chat! 💬
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>

          {/* System Bot Notification */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors cursor-pointer relative">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-xl shadow-md border-2 border-yellow-300/40">
              👑
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Let&apos;s Chat Bot</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-cyan-400 text-[10px]">Official</span>
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">
                Welcome to Let&apos;s Chat! Enjoy meeting new friends face-to-face...
              </div>
            </div>
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-extrabold shadow">
              4
            </span>
          </div>

          {/* Guidelines Notice */}
          <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200/80">
            <div className="font-semibold text-purple-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Safe & Ephemeral</span>
            </div>
            Direct chat logs with strangers expire immediately when sessions close to guarantee your privacy.
          </div>
        </div>
      </div>
    </div>
  );
}
