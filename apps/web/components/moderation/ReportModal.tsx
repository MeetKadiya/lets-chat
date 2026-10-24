'use client';

import React, { useState } from 'react';
import { X, Flag, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ReportCategory } from '@strangerconnect/shared';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: ReportCategory, details: string) => void;
}

const CATEGORIES: { id: ReportCategory; label: string; desc: string }[] = [
  { id: 'harassment', label: 'Harassment & Abuse', desc: 'Bullying, hate speech, or aggressive behavior' },
  { id: 'nudity', label: 'Inappropriate Content', desc: 'Non-consensual exposure, nudity, or adult media' },
  { id: 'spam', label: 'Spam & Commercial Scams', desc: 'Automated bots, phishing links, or advertising' },
  { id: 'other', label: 'Other Guidelines Violation', desc: 'Other behavior violating community safety rules' },
];

export function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('harassment');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(selectedCategory, details);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0F1626] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl text-white glass-panel animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-400">
            <Flag className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Report Conversation</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Submit an incident report for moderator review. False reports or harassment of strangers are subject to penalties.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'border-rose-500/50 bg-rose-500/10 text-white'
                    : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/15'
                }`}
              >
                <input
                  type="radio"
                  name="report-category"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => setSelectedCategory(cat.id)}
                  className="mt-1 text-rose-500 focus:ring-rose-500 bg-slate-900 border-slate-700"
                />
                <div className="text-left">
                  <div className="font-semibold text-xs text-white">{cat.label}</div>
                  <div className="text-[11px] text-slate-400">{cat.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 text-left">
              Optional Context / Details:
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any relevant details for the moderation audit..."
              maxLength={500}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 transition-all"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
