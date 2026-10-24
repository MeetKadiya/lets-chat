'use client';

import React from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface BlockConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function BlockConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: BlockConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#FFF9ED] border-2 border-[#252820] shadow-[0_8px_0_#252820] rounded-3xl p-6 text-[#252820] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5 fill-current" />
            <h3 className="font-black text-lg text-[#252820]">Block Stranger</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-[#252820] hover:bg-[#F4EBD9] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-6">
          Blocking will immediately end this chat and permanently prevent you and this stranger from ever being matched together again on mingleo.
        </p>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="mingleo-btn-white px-4 py-2 rounded-xl text-xs font-black"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs border-2 border-[#252820] shadow-[0_3px_0_#252820] transition-transform active:translate-y-0.5 active:shadow-none"
          >
            Confirm Block
          </button>
        </div>
      </div>
    </div>
  );
}
