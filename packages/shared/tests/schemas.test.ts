import { describe, it, expect } from 'vitest';
import {
  ChatSendSchema,
  QueueJoinSchema,
  WebRtcOfferSchema,
  WebRtcIceSchema,
  ReportSchema,
} from '../src/schemas.js';

describe('Shared Zod Schemas Validation', () => {
  it('validates a correct chat message payload', () => {
    const valid = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      messageId: 'msg-1',
      text: 'Hello, stranger!',
    };
    const parsed = ChatSendSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it('rejects an empty chat message or oversized text (>2000 chars)', () => {
    const empty = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      messageId: 'msg-1',
      text: '   ',
    };
    expect(ChatSendSchema.safeParse(empty).success).toBe(false);

    const oversized = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      messageId: 'msg-1',
      text: 'a'.repeat(2001),
    };
    expect(ChatSendSchema.safeParse(oversized).success).toBe(false);
  });

  it('validates queue join with interests array', () => {
    const valid = {
      mode: 'both',
      interests: ['GAMING', 'Coding '],
    };
    const parsed = QueueJoinSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.interests).toEqual(['gaming', 'coding']);
    }
  });

  it('validates WebRTC offer and ICE candidate schemas', () => {
    const validOffer = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      description: {
        type: 'offer',
        sdp: 'v=0\r\no=- 12345 2 IN IP4 127.0.0.1',
      },
    };
    expect(WebRtcOfferSchema.safeParse(validOffer).success).toBe(true);

    const validIce = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      candidate: {
        candidate: 'candidate:1 1 UDP 2130706431 192.168.1.1 50000 typ host',
        sdpMid: '0',
        sdpMLineIndex: 0,
      },
    };
    expect(WebRtcIceSchema.safeParse(validIce).success).toBe(true);
  });

  it('validates moderation report schema', () => {
    const validReport = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      category: 'harassment',
      details: 'Inappropriate language',
    };
    expect(ReportSchema.safeParse(validReport).success).toBe(true);

    const invalidCategory = {
      matchId: '123e4567-e89b-12d3-a456-426614174000',
      category: 'invalid_cat',
    };
    expect(ReportSchema.safeParse(invalidCategory).success).toBe(false);
  });
});
