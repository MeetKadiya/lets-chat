import { Redis } from 'ioredis';
import { env } from './env.js';

let redisInstance: any;

if (process.env.NODE_ENV === 'test') {
  try {
    // Dynamic require for ioredis-mock in test
    const RedisMock = (await import('ioredis-mock')).default;
    redisInstance = new RedisMock();
  } catch {
    redisInstance = new Redis(env.REDIS_URL, { lazyConnect: true });
  }
} else {
  redisInstance = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 100, 3000);
      return delay;
    },
    lazyConnect: true,
  });

  redisInstance.on('error', (err: any) => {
    console.warn('Redis notice:', err.message);
  });
}

export const redis = redisInstance;

export async function checkRedisConnection(): Promise<boolean> {
  try {
    const pong = await redis.ping();
    return pong === 'PONG';
  } catch {
    return false;
  }
}
