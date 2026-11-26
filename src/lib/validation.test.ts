import { describe, expect, it } from 'vitest';
import { LIMITS, buildMailto, validateContact } from './validation';

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello, I would like to talk about a role.' };

describe('validateContact', () => {
  it('accepts valid input', () => {
    expect(validateContact(valid)).toEqual({});
  });
  it('requires every field', () => {
    const errors = validateContact({ name: ' ', email: '', message: '' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
  });
  it('rejects malformed emails', () => {
    expect(validateContact({ ...valid, email: 'not-an-email' }).email).toBeTruthy();
    expect(validateContact({ ...valid, email: 'a@b' }).email).toBeTruthy();
  });
  it('enforces message length', () => {
    expect(validateContact({ ...valid, message: 'short' }).message).toBeTruthy();
    expect(validateContact({ ...valid, message: 'x'.repeat(LIMITS.messageMax + 1) }).message).toBeTruthy();
  });
});

describe('buildMailto', () => {
  it('encodes subject and body', () => {
    const url = buildMailto('me@example.com', valid);
    expect(url.startsWith('mailto:me@example.com?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('ada@example.com'));
    expect(url).not.toContain(' ');
  });
});
