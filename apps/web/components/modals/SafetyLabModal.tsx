'use client';

import React from 'react';
import { X, ShieldCheck, AlertTriangle, EyeOff, Ban, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface SafetyLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyLabModal({ isOpen, onClose }: SafetyLabModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#161426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
            <span>Safety Lab & Guidelines</span>
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
        <div className="p-6 space-y-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-300 text-sm">Strict 18+ Community</div>
              <p className="mt-0.5 text-slate-300">
                Let&apos;s Chat is designed strictly for adults (18+). Minors are strictly prohibited.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
              <EyeOff className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Ephemeral & Anonymous: </span>
                Video and audio stream directly peer-to-peer. Unflagged conversations are never recorded or stored.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
              <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Zero Tolerance: </span>
                Harassment, hate speech, inappropriate behavior, and non-consensual content result in instant automatic bans.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Instant Moderation Controls: </span>
                Use the 1-click &quot;Next&quot;, &quot;Report&quot;, or &quot;Block&quot; buttons at any moment to disconnect and prevent future pairings.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <Link
              href="/safety"
              onClick={onClose}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Full Safety Guidelines &rarr;
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full brand-yellow-btn font-bold text-xs"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
