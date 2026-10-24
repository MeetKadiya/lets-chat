import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  REALTIME_PORT: z.coerce.number().optional(),
  WEB_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/letschat'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  SESSION_SECRET: z.string().min(16).default('dev-session-secret-change-in-production-min-32-chars'),
  TURN_URL: z.string().default('turn:localhost:3478'),
  TURN_USERNAME: z.string().default('stranger'),
  TURN_CREDENTIAL: z.string().default('connectsecret'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.format());
  throw new Error('Invalid environment configuration');
}

export const env = {
  ...parsed.data,
  PORT: parsed.data.REALTIME_PORT || parsed.data.PORT,
};
