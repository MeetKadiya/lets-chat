import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to StrangerConnect</span>
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Community Safety & Age Policy
          </h1>
          <p className="text-sm text-slate-400">
            StrangerConnect is built to provide an enjoyable, spontaneous environment while maintaining zero tolerance for harm.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <h2>1. Strictly 18+ Platform</h2>
            </div>
            <p>
              StrangerConnect is strictly restricted to adults aged 18 and older. Random video and text chat with strangers is not suitable for minors. Anyone found to be underage will be banned immediately.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <h2>2. Zero Tolerance for Abuse & Illicit Behavior</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
              <li>No non-consensual nudity or sexual harassment.</li>
              <li>No hate speech, racism, threats of violence, or intimidation.</li>
              <li>No spam, scam links, phishing attempts, or automated bot activities.</li>
              <li>No sharing of illegal substances, weapons, or unlawful acts.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Eye className="w-5 h-5" />
              <h2>3. How to Protect Your Identity</h2>
            </div>
            <p>
              Never share identifying details with strangers, including your real full name, phone number, address, workplace, school, social media usernames, or financial credentials. You can skip any stranger at any moment by clicking <strong>Next</strong> or pressing <kbd className="px-1.5 py-0.5 rounded bg-surface-100 border border-slate-700 text-slate-300 font-mono text-[10px]">Esc</kbd>.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <HeartHandshake className="w-5 h-5" />
              <h2>4. Built-in Safety Controls</h2>
            </div>
            <p>
              Every conversation includes direct <strong>Block</strong> and <strong>Report</strong> controls. Blocking a user immediately separates your match and ensures you are never paired again. Reports are actively investigated by our team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
