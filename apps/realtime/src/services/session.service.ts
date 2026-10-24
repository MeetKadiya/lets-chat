import crypto from 'crypto';
import { redis } from '../config/redis.js';
import { sessionRepository } from '../repositories/session.repository.js';
import { AnonymousSession } from '@strangerconnect/shared';

const SESSION_TTL_SECONDS = 30 * 60; // 30 minutes

export class SessionService {
  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createSession(): Promise<{ session: AnonymousSession; token: string }> {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

    let session: AnonymousSession;
    try {
      session = await sessionRepository.createSession(tokenHash, expiresAt);
    } catch {
      // In-memory/test fallback if DB connection is deferred
      session = {
        id: crypto.randomUUID(),
        tokenHash,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: 'active',
      };
    }

    // Cache in Redis
    try {
      await redis.setex(
        `session:${session.id}`,
        SESSION_TTL_SECONDS,
        JSON.stringify({ id: session.id, tokenHash, expiresAt: session.expiresAt })
      );
      await redis.setex(`token:${tokenHash}`, SESSION_TTL_SECONDS, session.id);
    } catch (err) {
      console.warn('Redis session caching failed:', err);
    }

    return { session, token: rawToken };
  }

  async validateToken(token: string): Promise<AnonymousSession | null> {
    if (!token || typeof token !== 'string') return null;
    const tokenHash = this.hashToken(token);

    // 1. Try Redis cache
    try {
      const cachedSessionId = await redis.get(`token:${tokenHash}`);
      if (cachedSessionId) {
        const sessionJson = await redis.get(`session:${cachedSessionId}`);
        if (sessionJson) {
          const parsed = JSON.parse(sessionJson);
          return {
            id: parsed.id,
            tokenHash: parsed.tokenHash,
            createdAt: parsed.createdAt || new Date().toISOString(),
            expiresAt: parsed.expiresAt,
            status: 'active',
          };
        }
      }
    } catch (err) {
      console.warn('Redis cache lookup error:', err);
    }

    // 2. Query PostgreSQL
    try {
      const session = await sessionRepository.findByTokenHash(tokenHash);
      if (session) {
        // Populate cache
        await redis.setex(
          `session:${session.id}`,
          SESSION_TTL_SECONDS,
          JSON.stringify(session)
        );
        await redis.setex(`token:${tokenHash}`, SESSION_TTL_SECONDS, session.id);
        return session;
      }
    } catch (err) {
      console.warn('Postgres session lookup error:', err);
    }

    return null;
  }

  async revokeSession(sessionId: string): Promise<void> {
    try {
      await sessionRepository.revokeSession(sessionId);
    } catch (err) {
      console.warn('Error revoking in DB:', err);
    }

    try {
      const sessionJson = await redis.get(`session:${sessionId}`);
      if (sessionJson) {
        const parsed = JSON.parse(sessionJson);
        await redis.del(`token:${parsed.tokenHash}`);
      }
      await redis.del(`session:${sessionId}`);
    } catch (err) {
      console.warn('Error deleting from Redis:', err);
    }
  }
}

export const sessionService = new SessionService();
