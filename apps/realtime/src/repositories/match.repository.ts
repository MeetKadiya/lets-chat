import { db } from '../config/db.js';
import { ChatMode, MatchStatus, MatchEndReason, MatchState } from '@strangerconnect/shared';

export class MatchRepository {
  async createMatch(
    id: string,
    sessionA: string,
    sessionB: string,
    mode: ChatMode
  ): Promise<void> {
    const query = `
      INSERT INTO matches (id, session_a, session_b, mode, status, started_at)
      VALUES ($1, $2, $3, $4, 'active', NOW());
    `;
    await db.query(query, [id, sessionA, sessionB, mode]);
  }

  async endMatch(id: string, reason: MatchEndReason): Promise<void> {
    const query = `
      UPDATE matches
      SET status = 'ended', ended_at = NOW(), end_reason = $2
      WHERE id = $1 AND status <> 'ended';
    `;
    await db.query(query, [id, reason]);
  }

  async findById(id: string): Promise<MatchState | null> {
    const query = `
      SELECT id as "matchId", session_a as "sessionA", session_b as "sessionB",
             mode, status, started_at as "startedAt", ended_at as "endedAt",
             end_reason as "endReason"
      FROM matches
      WHERE id = $1;
    `;
    const res = await db.query(query, [id]);
    if (!res.rows[0]) return null;
    return {
      ...res.rows[0],
      sharedInterests: [],
    };
  }
}

export const matchRepository = new MatchRepository();
