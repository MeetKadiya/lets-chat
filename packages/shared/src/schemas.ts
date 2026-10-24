import { z } from 'zod';

export const ChatModeSchema = z.enum(['text', 'video', 'both']);

export const ReportCategorySchema = z.enum(['spam', 'harassment', 'nudity', 'other']);

export const SessionInitSchema = z.object({
  protocolVersion: z.string().optional().default('1.0.0'),
  token: z.string().min(10).optional(),
});

export const QueueJoinSchema = z.object({
  mode: ChatModeSchema,
  interests: z.array(z.string().trim().toLowerCase().min(1).max(30)).max(20).default([]),
});

export const QueueCancelSchema = z.object({
  requestId: z.string().optional(),
});

export const MatchAckSchema = z.object({
  matchId: z.string().uuid(),
});

export const ChatSendSchema = z.object({
  matchId: z.string().uuid(),
  messageId: z.string().min(1).max(64),
  text: z.string().trim().min(1, 'Message cannot be empty').max(2000, 'Message cannot exceed 2000 characters'),
});

export const MatchNextSchema = z.object({
  matchId: z.string().uuid().optional(),
  requestId: z.string().optional(),
});

export const MatchLeaveSchema = z.object({
  matchId: z.string().uuid(),
});

export const WebRtcOfferSchema = z.object({
  matchId: z.string().uuid(),
  description: z.object({
    type: z.literal('offer'),
    sdp: z.string().min(1).max(200000),
  }),
});

export const WebRtcAnswerSchema = z.object({
  matchId: z.string().uuid(),
  description: z.object({
    type: z.literal('answer'),
    sdp: z.string().min(1).max(200000),
  }),
});

export const WebRtcIceSchema = z.object({
  matchId: z.string().uuid(),
  candidate: z.object({
    candidate: z.string().min(1).max(5000),
    sdpMid: z.string().nullable().optional(),
    sdpMLineIndex: z.number().nullable().optional(),
    usernameFragment: z.string().nullable().optional(),
  }),
});

export const ReportSchema = z.object({
  matchId: z.string().uuid(),
  category: ReportCategorySchema,
  details: z.string().max(1000).optional(),
});

export const BlockSchema = z.object({
  matchId: z.string().uuid(),
});

export const ClientHeartbeatSchema = z.object({
  lastSeenMatchId: z.string().uuid().optional(),
});

export type SessionInitInput = z.input<typeof SessionInitSchema>;
export type QueueJoinInput = z.input<typeof QueueJoinSchema>;
export type QueueCancelInput = z.input<typeof QueueCancelSchema>;
export type MatchAckInput = z.input<typeof MatchAckSchema>;
export type ChatSendInput = z.input<typeof ChatSendSchema>;
export type MatchNextInput = z.input<typeof MatchNextSchema>;
export type MatchLeaveInput = z.input<typeof MatchLeaveSchema>;
export type WebRtcOfferInput = z.input<typeof WebRtcOfferSchema>;
export type WebRtcAnswerInput = z.input<typeof WebRtcAnswerSchema>;
export type WebRtcIceInput = z.input<typeof WebRtcIceSchema>;
export type ReportInput = z.input<typeof ReportSchema>;
export type BlockInput = z.input<typeof BlockSchema>;
