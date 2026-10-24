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
  { id: 'harassment', label: 'Harassment & Bullying', desc: 'Threats, offensive language, or hostility' },
  { id: 'nudity', label: 'Inappropriate Content', desc: 'Sexual behavior or non-consensual imagery' },
  { id: 'spam', label: 'Spam & Solicitation', desc: 'Promotional links, bots, or scams' },
  { id: 'other', label: 'Other Violations', desc: 'Other behavior breaking community rules' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_8px_0_#252820] rounded-3xl p-6 text-[#252820] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-600">
            <Flag className="w-5 h-5 fill-current" />
            <h3 className="font-black text-lg text-[#252820]">Report Stranger</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-[#252820] hover:bg-[#F4EBD9] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-600 mb-4">
          Reports are urgently reviewed by moderators. Private video and chats without reports are never stored.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-50 border-rose-600 text-[#252820] shadow-[0_2px_0_#e11d48]'
                    : 'bg-white border-[#252820] text-slate-700 shadow-[0_2px_0_#252820]'
                }`}
              >
                <input
                  type="radio"
                  name="reportCategory"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => setSelectedCategory(cat.id)}
                  className="mt-1 accent-rose-600"
                />
                <div>
                  <div className="text-xs font-black">{cat.label}</div>
                  <div className="text-[11px] font-medium text-slate-500">{cat.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-black text-[#252820] uppercase tracking-wide mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Tell us what happened..."
              maxLength={1000}
              rows={3}
              className="w-full bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] rounded-xl p-3 text-xs font-semibold text-[#252820] placeholder-slate-400 focus:outline-none focus:border-rose-600 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="mingleo-btn-white px-4 py-2 rounded-xl text-xs font-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs border-2 border-[#252820] shadow-[0_3px_0_#252820] transition-transform active:translate-y-0.5 active:shadow-none"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
