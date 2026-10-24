import { describe, it, expect, beforeEach } from 'vitest';
import { matchmakingService } from '../src/services/matchmaking.service.js';
import { redis } from '../src/config/redis.js';

describe('Atomic Matchmaking Engine', () => {
  beforeEach(async () => {
    // Flush mock redis state between tests
    if (typeof redis.flushall === 'function') {
      await redis.flushall();
    }
  });

  it('matches two users with shared interests atomically', async () => {
    const user1 = 'session-user-1';
    const user2 = 'session-user-2';

    // User 1 joins queue
    const res1 = await matchmakingService.joinQueue(user1, 'text', ['gaming', 'music']);
    expect(res1.status).toBe('waiting');

    // User 2 joins queue with shared interest 'gaming'
    const res2 = await matchmakingService.joinQueue(user2, 'text', ['gaming', 'coding']);
    expect(res2.status).toBe('matched');
    expect(res2.match).toBeDefined();
    expect(res2.match?.mode).toBe('text');
    expect(res2.match?.sharedInterests).toContain('gaming');

    // Verify neither user is in queue anymore
    const active1 = await matchmakingService.getActiveMatchId(user1);
    const active2 = await matchmakingService.getActiveMatchId(user2);
    expect(active1).toBe(res2.match?.matchId);
    expect(active2).toBe(res2.match?.matchId);
  });

  it('prevents self-matching if same session attempts to join', async () => {
    const user = 'session-self';
    const res1 = await matchmakingService.joinQueue(user, 'text', ['anime']);
    expect(res1.status).toBe('waiting');

    // Attempt to match self
    const match = await matchmakingService.attemptMatch(user, 'text', ['anime']);
    expect(match).toBeNull();
  });

  it('allows a user to leave a match and resets active state', async () => {
    const user1 = 'user-leave-1';
    const user2 = 'user-leave-2';

    await matchmakingService.joinQueue(user1, 'text', ['sports']);
    const res2 = await matchmakingService.joinQueue(user2, 'text', ['sports']);
    const matchId = res2.match!.matchId;

    const ended = await matchmakingService.leaveMatch(user1, matchId, 'skip');
    expect(ended?.status).toBe('ended');
    expect(ended?.endReason).toBe('skip');

    const active1 = await matchmakingService.getActiveMatchId(user1);
    const active2 = await matchmakingService.getActiveMatchId(user2);
    expect(active1).toBeNull();
    expect(active2).toBeNull();
  });
});
