import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { redis } from '../config/redis.js';
import { matchRepository } from '../repositories/match.repository.js';
import { moderationService } from './moderation.service.js';
import { ChatMode, MatchState, MatchEndReason } from '@strangerconnect/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const luaScriptPath = path.resolve(__dirname, '../scripts/reserve_match.lua');

let reserveMatchLua: string = '';
try {
  reserveMatchLua = fs.readFileSync(luaScriptPath, 'utf-8');
} catch {
  reserveMatchLua = `
    local queueKey = KEYS[1]
    local sessionA = ARGV[1]
    local sessionB = ARGV[2]
    local matchId = ARGV[3]
    local matchJson = ARGV[4]
    local ttlSeconds = tonumber(ARGV[5])
    if sessionA == sessionB then return 0 end
    local aActive = redis.call('GET', 'session:' .. sessionA .. ':match')
    local bActive = redis.call('GET', 'session:' .. sessionB .. ':match')
    if aActive or bActive then return 0 end
    redis.call('ZREM', queueKey, sessionA, sessionB)
    redis.call('ZREM', 'queue:text', sessionA, sessionB)
    redis.call('ZREM', 'queue:video', sessionA, sessionB)
    redis.call('ZREM', 'queue:both', sessionA, sessionB)
    redis.call('SETEX', 'match:' .. matchId, ttlSeconds, matchJson)
    redis.call('SETEX', 'session:' .. sessionA .. ':match', ttlSeconds, matchId)
    redis.call('SETEX', 'session:' .. sessionB .. ':match', ttlSeconds, matchId)
    redis.call('SETEX', 'recent:' .. sessionA .. ':' .. sessionB, 600, '1')
    redis.call('SETEX', 'recent:' .. sessionB .. ':' .. sessionA, 600, '1')
    return 1
  `;
}

export class MatchmakingService {
  private calculateJaccard(interestsA: string[], interestsB: string[]): { score: number; common: string[] } {
    if (!interestsA.length || !interestsB.length) return { score: 0, common: [] };
    const setA = new Set(interestsA);
    const setB = new Set(interestsB);
    const intersection = [...setA].filter((x) => setB.has(x));
    const union = new Set([...interestsA, ...interestsB]);
    const score = union.size === 0 ? 0 : intersection.length / union.size;
    return { score, common: intersection };
  }

  async joinQueue(
    sessionId: string,
    mode: ChatMode,
    interests: string[]
  ): Promise<{ status: 'waiting' | 'matched'; match?: MatchState }> {
    // 1. Check if user already has an active match
    const existingMatchId = await this.getActiveMatchId(sessionId);
    if (existingMatchId) {
      const match = await this.getMatchState(existingMatchId);
      if (match && match.status === 'active') {
        return { status: 'matched', match };
      }
    }

    // 2. Save user preferences in Redis
    const normalizedInterests = interests.map((i) => i.trim().toLowerCase());
    await redis.setex(`session:${sessionId}:interests`, 1800, JSON.stringify(normalizedInterests));
    await redis.setex(`session:${sessionId}:mode`, 1800, mode);

    const queueKey = `queue:${mode}`;
    const now = Date.now();
    await redis.zadd(queueKey, now, sessionId);

    // 3. Attempt immediate matching
    const match = await this.attemptMatch(sessionId, mode, normalizedInterests);
    if (match) {
      return { status: 'matched', match };
    }

    return { status: 'waiting' };
  }

  async cancelQueue(sessionId: string): Promise<void> {
    await redis.zrem('queue:text', sessionId);
    await redis.zrem('queue:video', sessionId);
    await redis.zrem('queue:both', sessionId);
    await redis.del(`session:${sessionId}:interests`);
    await redis.del(`session:${sessionId}:mode`);
  }

  async attemptMatch(
    sessionId: string,
    mode: ChatMode,
    userInterests: string[]
  ): Promise<MatchState | null> {
    const queueKey = `queue:${mode}`;
    const candidates = await redis.zrange(queueKey, 0, 50);

    let bestCandidate: string | null = null;
    let bestScore = -1;
    let bestCommon: string[] = [];

    const now = Date.now();

    for (const candidateId of candidates) {
      if (candidateId === sessionId) continue;

      // Check recent match exclusion
      const isRecent = await redis.get(`recent:${sessionId}:${candidateId}`);
      if (isRecent) continue;

      // Check block status using ModerationService (checks Redis cache + DB)
      const isBlocked = await moderationService.isBlocked(sessionId, candidateId);
      if (isBlocked) continue;

      // Candidate wait time
      const queuedScore = await redis.zscore(queueKey, candidateId);
      const waitSeconds = queuedScore ? (now - Number(queuedScore)) / 1000 : 0;

      // Candidate interests
      const candidateInterestsRaw = await redis.get(`session:${candidateId}:interests`);
      const candidateInterests: string[] = candidateInterestsRaw ? JSON.parse(candidateInterestsRaw) : [];

      const { score: jaccard, common } = this.calculateJaccard(userInterests, candidateInterests);

      // Score formula from spec: 0.7 * J + 0.3 * W
      const normalizedWait = Math.min(waitSeconds / 30, 1.0);
      const compositeScore = 0.7 * jaccard + 0.3 * normalizedWait;

      // Relaxation rules
      if (waitSeconds < 10) {
        if (userInterests.length > 0 && common.length === 0) continue;
      }

      if (compositeScore > bestScore) {
        bestScore = compositeScore;
        bestCandidate = candidateId;
        bestCommon = common;
      }
    }

    if (!bestCandidate) {
      return null;
    }

    // Atomic reservation via Redis Lua script
    const matchId = crypto.randomUUID();
    const matchState: MatchState = {
      matchId,
      sessionA: sessionId,
      sessionB: bestCandidate,
      mode,
      status: 'active',
      startedAt: new Date().toISOString(),
      sharedInterests: bestCommon,
    };

    const matchJson = JSON.stringify(matchState);
    const ttlSeconds = 7200;

    const result = await redis.eval(
      reserveMatchLua,
      1,
      queueKey,
      sessionId,
      bestCandidate,
      matchId,
      matchJson,
      ttlSeconds
    );

    if (Number(result) === 1) {
      try {
        await matchRepository.createMatch(matchId, sessionId, bestCandidate, mode);
      } catch (err) {
        console.warn('Failed to insert match record into DB:', err);
      }
      return matchState;
    }

    return null;
  }

  async getActiveMatchId(sessionId: string): Promise<string | null> {
    return redis.get(`session:${sessionId}:match`);
  }

  async getMatchState(matchId: string): Promise<MatchState | null> {
    const raw = await redis.get(`match:${matchId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  }

  async leaveMatch(
    sessionId: string,
    matchId: string,
    reason: MatchEndReason = 'skip'
  ): Promise<MatchState | null> {
    const match = await this.getMatchState(matchId);
    if (!match) return null;

    if (match.sessionA !== sessionId && match.sessionB !== sessionId) {
      return null;
    }

    match.status = 'ended';
    match.endedAt = new Date().toISOString();
    match.endReason = reason;

    await redis.setex(`match:${matchId}`, 300, JSON.stringify(match));
    await redis.del(`session:${match.sessionA}:match`);
    await redis.del(`session:${match.sessionB}:match`);

    try {
      await matchRepository.endMatch(matchId, reason);
    } catch (err) {
      console.warn('Error updating match end in DB:', err);
    }

    return match;
  }
}

export const matchmakingService = new MatchmakingService();
