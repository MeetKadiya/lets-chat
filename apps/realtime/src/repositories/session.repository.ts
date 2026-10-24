import { db } from '../config/db.js';
import { AnonymousSession, SessionStatus } from '@strangerconnect/shared';

export class SessionRepository {
  async createSession(tokenHash: string, expiresAt: Date): Promise<AnonymousSession> {
    const query = `
      INSERT INTO anonymous_sessions (token_hash, expires_at, status)
      VALUES ($1, $2, 'active')
      RETURNING id, token_hash as "tokenHash", created_at as "createdAt", expires_at as "expiresAt", status;
    `;
    const res = await db.query(query, [tokenHash, expiresAt.toISOString()]);
    return res.rows[0];
  }

  async findByTokenHash(tokenHash: string): Promise<AnonymousSession | null> {
    const query = `
      SELECT id, token_hash as "tokenHash", created_at as "createdAt", expires_at as "expiresAt", status
      FROM anonymous_sessions
      WHERE token_hash = $1 AND status = 'active' AND expires_at > NOW();
    `;
    const res = await db.query(query, [tokenHash]);
    return res.rows[0] || null;
  }

  async findById(id: string): Promise<AnonymousSession | null> {
    const query = `
      SELECT id, token_hash as "tokenHash", created_at as "createdAt", expires_at as "expiresAt", status
      FROM anonymous_sessions
      WHERE id = $1;
    `;
    const res = await db.query(query, [id]);
    return res.rows[0] || null;
  }

  async revokeSession(id: string): Promise<boolean> {
    const query = `
      UPDATE anonymous_sessions
      SET status = 'revoked'
      WHERE id = $1;
    `;
    const res = await db.query(query, [id]);
    return (res.rowCount ?? 0) > 0;
  }

  async updateExpiry(id: string, expiresAt: Date): Promise<boolean> {
    const query = `
      UPDATE anonymous_sessions
      SET expires_at = $2
      WHERE id = $1 AND status = 'active';
    `;
    const res = await db.query(query, [id, expiresAt.toISOString()]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const sessionRepository = new SessionRepository();
