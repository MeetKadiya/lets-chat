import { describe, it, expect } from 'vitest';
import { sessionService } from '../src/services/session.service.js';

describe('Anonymous Session Service', () => {
  it('creates an anonymous session with hashed token and expiry', async () => {
    const { session, token } = await sessionService.createSession();

    expect(session.id).toBeDefined();
    expect(session.tokenHash).toBeDefined();
    expect(session.status).toBe('active');
    expect(token).toBeDefined();
    expect(token.length).toBe(64); // 32 bytes hex
  });

  it('validates a valid session token', async () => {
    const { session, token } = await sessionService.createSession();
    const validated = await sessionService.validateToken(token);

    expect(validated).not.toBeNull();
    expect(validated?.id).toBe(session.id);
  });

  it('rejects an invalid or fake token', async () => {
    const fakeToken = '0000000000000000000000000000000000000000000000000000000000000000';
    const validated = await sessionService.validateToken(fakeToken);
    expect(validated).toBeNull();
  });

  it('revokes a session and removes from active cache', async () => {
    const { session, token } = await sessionService.createSession();
    await sessionService.revokeSession(session.id);

    const validated = await sessionService.validateToken(token);
    expect(validated).toBeNull();
  });
});
