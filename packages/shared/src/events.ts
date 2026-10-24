import {
  ChatMode,
  MatchEndReason,
  PeerConnectionState,
  SdpPayload,
  IceCandidatePayload,
  SocketAck,
} from './types.js';
import {
  SessionInitInput,
  QueueJoinInput,
  QueueCancelInput,
  MatchAckInput,
  ChatSendInput,
  MatchNextInput,
  MatchLeaveInput,
  WebRtcOfferInput,
  WebRtcAnswerInput,
  WebRtcIceInput,
  ReportInput,
  BlockInput,
} from './schemas.js';

export interface ClientToServerEvents {
  'session:init': (
    payload: SessionInitInput,
    callback?: (ack: SocketAck<{ sessionId: string; token: string; expiresAt: string }>) => void
  ) => void;

  'queue:join': (
    payload: QueueJoinInput,
    callback?: (ack: SocketAck<{ status: 'waiting' | 'matched'; matchId?: string }>) => void
  ) => void;

  'queue:cancel': (
    payload: QueueCancelInput,
    callback?: (ack: SocketAck<{ status: 'cancelled' }>) => void
  ) => void;

  'match:ack': (
    payload: MatchAckInput,
    callback?: (ack: SocketAck<{ ready: boolean }>) => void
  ) => void;

  'chat:send': (
    payload: ChatSendInput,
    callback?: (ack: SocketAck<{ messageId: string; sentAt: string }>) => void
  ) => void;

  'match:next': (
    payload: MatchNextInput,
    callback?: (ack: SocketAck<{ status: 'searching' | 'queued' }>) => void
  ) => void;

  'match:leave': (
    payload: MatchLeaveInput,
    callback?: (ack: SocketAck<{ status: 'ended' }>) => void
  ) => void;

  'webrtc:offer': (
    payload: WebRtcOfferInput,
    callback?: (ack: SocketAck) => void
  ) => void;

  'webrtc:answer': (
    payload: WebRtcAnswerInput,
    callback?: (ack: SocketAck) => void
  ) => void;

  'webrtc:ice': (
    payload: WebRtcIceInput,
    callback?: (ack: SocketAck) => void
  ) => void;

  'moderation:report': (
    payload: ReportInput,
    callback?: (ack: SocketAck<{ reportId: string }>) => void
  ) => void;

  'moderation:block': (
    payload: BlockInput,
    callback?: (ack: SocketAck<{ blocked: boolean }>) => void
  ) => void;

  'client:heartbeat': (
    payload: { lastSeenMatchId?: string },
    callback?: (ack: SocketAck) => void
  ) => void;
}

export interface ServerToClientEvents {
  'session:ready': (data: { sessionId: string; expiresAt: string }) => void;
  'queue:status': (data: { status: 'waiting' | 'cancelled' | 'timeout'; requestId?: string }) => void;
  'match:found': (data: { matchId: string; mode: ChatMode; interests: string[]; isOfferer: boolean }) => void;
  'match:ready': (data: { matchId: string }) => void;
  'chat:message': (data: { matchId: string; messageId: string; text: string; sentAt: string }) => void;
  'match:ended': (data: { matchId: string; reason: MatchEndReason }) => void;
  'webrtc:offer': (data: { matchId: string; description: SdpPayload }) => void;
  'webrtc:answer': (data: { matchId: string; description: SdpPayload }) => void;
  'webrtc:ice': (data: { matchId: string; candidate: IceCandidatePayload }) => void;
  'peer:status': (data: { state: PeerConnectionState }) => void;
  'moderation:result': (data: { action: string; status: string }) => void;
  'server:error': (data: { code: string; message: string; retryable?: boolean }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  sessionId?: string;
  matchId?: string;
  authenticatedAt?: number;
}
