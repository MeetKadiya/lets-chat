import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

export const db = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

db.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const res = await db.query('SELECT 1 as healthy');
    return res.rows[0]?.healthy === 1;
  } catch (err) {
    console.error('PostgreSQL health check failed:', err);
    return false;
  }
}
