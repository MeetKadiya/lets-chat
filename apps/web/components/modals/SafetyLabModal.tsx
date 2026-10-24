'use client';

import React from 'react';
import { X, ShieldCheck, AlertTriangle, EyeOff, Ban, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SafetyLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyLabModal({ isOpen, onClose }: SafetyLabModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0F1626] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Safety Guidelines & Ethics</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-300 text-sm">Strict 18+ Adult Platform</div>
              <p className="mt-0.5 text-slate-300 leading-relaxed">
                Let&apos;s Chat is designed solely for consenting adults. Underage access is strictly prohibited and immediately restricted.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <EyeOff className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Peer-to-Peer Privacy: </span>
                Video and audio stream directly between browsers. Routine conversations are never recorded or stored on disk.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Zero Tolerance Policy: </span>
                Harassment, hate speech, automated spam, and unconsented exposure result in permanent bans.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Authoritative Block & Report: </span>
                Click &quot;Next&quot;, &quot;Report&quot;, or &quot;Block&quot; at any time. Blocked strangers are stored in PostgreSQL and will never be paired with you again.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <Link
              href="/safety"
              onClick={onClose}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Full Community Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl btn-electric text-xs font-bold"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
