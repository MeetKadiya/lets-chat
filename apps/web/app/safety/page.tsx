import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { MingleoLogo } from '../../components/common/MingleoLogo';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#252820] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] text-xs font-black text-[#252820] hover:bg-[#F4EBD9] transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to mingleo</span>
          </Link>
          <MingleoLogo size="sm" href="/" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#252820] tracking-tight mb-2">
            Safety & Community Guidelines
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            mingleo is built to make meeting strangers friendly, delightful, and safe with zero tolerance for harm.
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#252820] leading-relaxed">
          <section className="p-6 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_4px_0_#252820] space-y-3">
            <div className="flex items-center gap-2.5 text-[#252820] font-black text-lg">
              <span className="text-2xl">🛑</span>
              <h2>1. Strictly 18+ Social Discovery</h2>
            </div>
            <p className="font-medium text-slate-700">
              mingleo is strictly restricted to adults aged 18 and older. Random video and text conversation with strangers is not suitable for minors. Anyone found to be underage will have their session terminated and device blocked immediately.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_4px_0_#252820] space-y-3">
            <div className="flex items-center gap-2.5 text-[#252820] font-black text-lg">
              <span className="text-2xl">🛡️</span>
              <h2>2. Zero Tolerance for Abuse & Harassment</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs font-bold text-slate-700">
              <li>No non-consensual nudity, sexual acts, or inappropriate gestures.</li>
              <li>No hate speech, racism, slurs, threats of violence, or intimidation.</li>
              <li>No spam, scam links, external payment solicitations, or automated bots.</li>
              <li>No displaying illegal substances, weapons, or promoting self-harm.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_4px_0_#252820] space-y-3">
            <div className="flex items-center gap-2.5 text-[#252820] font-black text-lg">
              <span className="text-2xl">🔒</span>
              <h2>3. Protect Your Identity</h2>
            </div>
            <p className="font-medium text-slate-700">
              Never share personally identifiable information with strangers: real full name, phone number, physical address, workplace, school, social media handles, or passwords. You can skip any stranger at any moment by clicking <strong>Next Stranger</strong> or pressing <kbd className="px-1.5 py-0.5 rounded bg-[#EAF5D5] border border-[#252820] text-[#252820] font-mono text-[11px] font-bold">Esc</kbd>.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-white border-2 border-[#252820] shadow-[0_4px_0_#252820] space-y-3">
            <div className="flex items-center gap-2.5 text-[#252820] font-black text-lg">
              <span className="text-2xl">⚡</span>
              <h2>4. Built-in Safety Controls</h2>
            </div>
            <p className="font-medium text-slate-700">
              Every live conversation includes immediate <strong>Block</strong> and <strong>Report</strong> controls. Blocking a user ends the chat instantly and guarantees you will never be paired with that peer again.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
