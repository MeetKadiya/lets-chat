import crypto from 'crypto';
import { redis } from '../config/redis.js';
import { moderationRepository } from '../repositories/moderation.repository.js';
import { ReportCategory } from '@strangerconnect/shared';

export interface RateLimitConfig {
  max: number;
  windowSeconds: number;
}

export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  queue_join: { max: 10, windowSeconds: 60 },
  chat_message: { max: 35, windowSeconds: 60 },
  signaling: { max: 70, windowSeconds: 60 },
  report: { max: 5, windowSeconds: 600 },
};

export class ModerationService {
  async checkRateLimit(sessionId: string, action: string): Promise<{ allowed: boolean; remaining: number }> {
    const config = RATE_LIMITS[action] || { max: 60, windowSeconds: 60 };
    const key = `rate:${sessionId}:${action}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, config.windowSeconds);
    }

    if (current > config.max) {
      return { allowed: false, remaining: 0 };
    }

    return { allowed: true, remaining: config.max - current };
  }

  async reportUser(
    reporterSessionId: string,
    reportedSessionId: string,
    matchId: string,
    category: ReportCategory,
    details?: string
  ): Promise<string> {
    try {
      return await moderationRepository.createReport(
        reporterSessionId,
        reportedSessionId,
        matchId,
        category,
        details
      );
    } catch (err) {
      console.warn('PostgreSQL report insertion deferred:', err);
      return crypto.randomUUID();
    }
  }

  async blockUser(blockerSessionId: string, blockedSessionId: string): Promise<void> {
    try {
      await moderationRepository.createBlock(blockerSessionId, blockedSessionId);
    } catch (err) {
      console.warn('PostgreSQL block insertion deferred:', err);
    }

    // Cache block pair in Redis for fast matching check
    await redis.set(`block:${blockerSessionId}:${blockedSessionId}`, '1');
    await redis.set(`block:${blockedSessionId}:${blockerSessionId}`, '1');
  }

  async isBlocked(sessionA: string, sessionB: string): Promise<boolean> {
    const cached = await redis.get(`block:${sessionA}:${sessionB}`);
    if (cached) return true;

    try {
      return await moderationRepository.isBlocked(sessionA, sessionB);
    } catch {
      return false;
    }
  }
}

export const moderationService = new ModerationService();
