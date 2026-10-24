import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Clock } from 'lucide-react';

export default function PrivacyPage() {
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
            Privacy Policy & Data Retention
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: October 2026. StrangerConnect is engineered from the ground up for strict ephemeral privacy.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <EyeOff className="w-5 h-5" />
              <h2>1. No Registration & No Personal Identifiers</h2>
            </div>
            <p>
              StrangerConnect never asks for your real name, email address, phone number, social media handles, or profile photos. All users are assigned a temporary cryptographic session token. The server stores only a one-way cryptographic SHA-256 hash of this token.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Clock className="w-5 h-5" />
              <h2>2. Ephemeral Chat Transcripts</h2>
            </div>
            <p>
              Text messages exchanged during your conversation exist in volatile memory and ephemeral Redis cache solely to handle transient network reconnects during the active match. Once both users skip or disconnect, the conversation buffer is destroyed and is <strong>never written to permanent disk storage</strong>.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Server className="w-5 h-5" />
              <h2>3. Audio and Video Streams</h2>
            </div>
            <p>
              Media travels directly peer-to-peer using WebRTC end-to-end encryption. In cases where network firewalls require TURN relaying, media packets are relayed in real-time without buffering, recording, or inspection. We do not record or archive audio or video under any circumstances.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Shield className="w-5 h-5" />
              <h2>4. Moderation Reports & Policy Enforcement</h2>
            </div>
            <p>
              When a user submits an abuse report (such as harassment or illicit content), the report metadata (time, category, anonymous session ID) is retained in an encrypted moderation ledger for up to 30 days to enforce bans and prevent repeated abuse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
