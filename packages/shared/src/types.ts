export type ChatMode = 'text' | 'video' | 'both';

export type SessionStatus = 'active' | 'expired' | 'revoked';

export type MatchStatus = 'connecting' | 'active' | 'ended';

export type MatchEndReason = 'skip' | 'disconnect' | 'ban' | 'error';

export type ReportCategory = 'spam' | 'harassment' | 'nudity' | 'other';

export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';

export type ModerationActionType = 'warning' | 'temporary ban' | 'permanent ban';

export type PeerConnectionState = 'connected' | 'reconnecting' | 'disconnected';

export interface AnonymousSession {
  id: string;
  tokenHash: string;
  createdAt: string;
  expiresAt: string;
  status: SessionStatus;
}

export interface Interest {
  id: number;
  slug: string;
  label: string;
  isActive: boolean;
}

export interface MatchState {
  matchId: string;
  sessionA: string;
  sessionB: string;
  mode: ChatMode;
  status: MatchStatus;
  startedAt: string;
  endedAt?: string | null;
  endReason?: MatchEndReason | null;
  sharedInterests: string[];
}

export interface IceCandidatePayload {
  candidate: string;
  sdpMid: string | null;
  sdpMLineIndex: number | null;
  usernameFragment?: string | null;
}

export interface SdpPayload {
  type: 'offer' | 'answer';
  sdp: string;
}

export interface SocketAck<T = unknown> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
