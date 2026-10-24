'use client';

import React, { useState } from 'react';
import { X, Flag, AlertTriangle } from 'lucide-react';
import { ReportCategory } from '@strangerconnect/shared';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: ReportCategory, details: string) => void;
}

const CATEGORIES: { id: ReportCategory; label: string; desc: string }[] = [
  { id: 'harassment', label: 'Harassment & Abuse', desc: 'Bullying, hate speech, or threats' },
  { id: 'nudity', label: 'Inappropriate Content', desc: 'Non-consensual sexual content or nudity' },
  { id: 'spam', label: 'Spam & Advertising', desc: 'Automated bots, promotional links, or scams' },
  { id: 'other', label: 'Other Violations', desc: 'Other behavior violating community guidelines' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-surface-200 border border-slate-700/80 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-400">
            <Flag className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Report Stranger</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Reports are reviewed by human moderators. Unflagged private chats are never stored.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500/10 border-rose-500/80 text-white'
                    : 'bg-surface-100/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="reportCategory"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => setSelectedCategory(cat.id)}
                  className="mt-1 accent-rose-500"
                />
                <div>
                  <div className="text-xs font-semibold">{cat.label}</div>
                  <div className="text-[11px] text-slate-400">{cat.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context for moderation..."
              maxLength={1000}
              rows={3}
              className="w-full bg-surface-100 border border-slate-700/60 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-lg shadow-rose-600/20 transition-all"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
