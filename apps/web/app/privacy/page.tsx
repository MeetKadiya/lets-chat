import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Clock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#E8F2DF] text-[#111111] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[0_2px_0_#111111] text-xs font-black text-[#111111] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Let&apos;s Chat</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <img src="/assets/logo/logo-bubble.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-xl text-[#111111]">Let&apos;s Chat</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-2">
            Privacy Policy & Ephemeral Data Architecture
          </h1>
          <p className="text-sm font-semibold text-slate-700">
            Let&apos;s Chat is engineered from the ground up for strict ephemeral privacy.
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#111111] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_4px_0_#111111] space-y-3">
            <div className="flex items-center gap-2.5 text-[#111111] font-black text-lg">
              <span className="text-2xl">👤</span>
              <h2>1. Ephemeral Sessions & Zero Personal Tracking</h2>
            </div>
            <p className="font-medium text-slate-800">
              Let&apos;s Chat does not require registration, email addresses, phone numbers, or social logins to start chatting. Users are assigned a temporary cryptographic session token. The server stores only a one-way cryptographic SHA-256 hash of this token to manage matchmaking and blocklists.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_4px_0_#111111] space-y-3">
            <div className="flex items-center gap-2.5 text-[#111111] font-black text-lg">
              <span className="text-2xl">💬</span>
              <h2>2. Zero Chat Transcript Retention</h2>
            </div>
            <p className="font-medium text-slate-800">
              Text messages exchanged during your conversation exist only in temporary volatile memory and ephemeral Redis cache while the match is active. The instant both participants leave or skip, all conversation buffers are purged and <strong>are never saved to permanent disk storage</strong>.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_4px_0_#111111] space-y-3">
            <div className="flex items-center gap-2.5 text-[#111111] font-black text-lg">
              <span className="text-2xl">📹</span>
              <h2>3. Direct Peer-to-Peer Audio & Video</h2>
            </div>
            <p className="font-medium text-slate-800">
              Video and audio streams travel directly between peers using WebRTC end-to-end encryption. When network conditions require TURN relaying, packets are forwarded in memory without recording, eavesdropping, or persistent buffering.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#FFF9E9] border-2 border-[#111111] shadow-[0_4px_0_#111111] space-y-3">
            <div className="flex items-center gap-2.5 text-[#111111] font-black text-lg">
              <span className="text-2xl">⚖️</span>
              <h2>4. Moderation & Trust</h2>
            </div>
            <p className="font-medium text-slate-800">
              When a participant files an abuse report, only the reported event context (timestamp, category, anonymous match identifier) is retained in an encrypted moderation ledger to enforce safety suspensions and protect the community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
