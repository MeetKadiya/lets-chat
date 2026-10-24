import { db } from '../config/db.js';
import { ReportCategory } from '@strangerconnect/shared';

export class ModerationRepository {
  async createReport(
    reporterSessionId: string,
    reportedSessionId: string,
    matchId: string,
    category: ReportCategory,
    details?: string
  ): Promise<string> {
    const query = `
      INSERT INTO reports (reporter_session_id, reported_session_id, match_id, category, details, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING id;
    `;
    const res = await db.query(query, [
      reporterSessionId,
      reportedSessionId,
      matchId,
      category,
      details || null,
    ]);
    return res.rows[0].id;
  }

  async createBlock(blockerSessionId: string, blockedSessionId: string): Promise<void> {
    const query = `
      INSERT INTO blocks (blocker_session_id, blocked_session_id)
      VALUES ($1, $2)
      ON CONFLICT (blocker_session_id, blocked_session_id) DO NOTHING;
    `;
    await db.query(query, [blockerSessionId, blockedSessionId]);
  }

  async isBlocked(sessionA: string, sessionB: string): Promise<boolean> {
    const query = `
      SELECT 1 FROM blocks
      WHERE (blocker_session_id = $1 AND blocked_session_id = $2)
         OR (blocker_session_id = $2 AND blocked_session_id = $1)
      LIMIT 1;
    `;
    const res = await db.query(query, [sessionA, sessionB]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const moderationRepository = new ModerationRepository();
