import { describe, it, expect, beforeEach } from 'vitest';
import { moderationService } from '../src/services/moderation.service.js';
import { matchmakingService } from '../src/services/matchmaking.service.js';
import { redis } from '../src/config/redis.js';

describe('Moderation & Abuse Controls', () => {
  beforeEach(async () => {
    if (typeof redis.flushall === 'function') {
      await redis.flushall();
    }
  });

  it('enforces token-bucket rate limits on actions', async () => {
    const sessionId = 'spammer-session';

    // queue_join limit is 10/min
    for (let i = 0; i < 10; i++) {
      const check = await moderationService.checkRateLimit(sessionId, 'queue_join');
      expect(check.allowed).toBe(true);
    }

    // 11th should be blocked
    const throttled = await moderationService.checkRateLimit(sessionId, 'queue_join');
    expect(throttled.allowed).toBe(false);
    expect(throttled.remaining).toBe(0);
  });

  it('prevents matching between users when a block exists', async () => {
    const userA = 'user-alpha';
    const userB = 'user-bravo';

    // User A blocks User B
    await moderationService.blockUser(userA, userB);

    const isBlocked = await moderationService.isBlocked(userA, userB);
    expect(isBlocked).toBe(true);

    // Queue both users with identical interests
    await matchmakingService.joinQueue(userA, 'text', ['gaming']);
    const resB = await matchmakingService.joinQueue(userB, 'text', ['gaming']);

    // Matchmaking should NOT pair them because of the block
    expect(resB.status).toBe('waiting');
    expect(resB.match).toBeUndefined();
  });
});
