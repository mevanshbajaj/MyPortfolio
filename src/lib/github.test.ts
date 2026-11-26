import { describe, expect, it } from 'vitest';
import { describeEvent, parseContributions, pickFeaturedRepos, relativeTime, summarizeLanguages, type GitHubRepo } from './github';

const repo = (over: Partial<GitHubRepo>): GitHubRepo => ({
  id: 1, name: 'r', html_url: 'https://github.com/x/r', description: null, language: 'Java', stargazers_count: 0,
  forks_count: 0, fork: false, archived: false, pushed_at: '2026-01-01T00:00:00Z', ...over,
});

describe('summarizeLanguages', () => {
  it('counts non-fork repos by language and ignores missing languages', () => {
    const result = summarizeLanguages([
      repo({ id: 1, language: 'Java' }), repo({ id: 2, language: 'Java' }), repo({ id: 3, language: 'TypeScript' }),
      repo({ id: 4, language: 'Python', fork: true }), repo({ id: 5, language: null }),
    ]);
    expect(result.map((l) => l.language)).toEqual(['Java', 'TypeScript']);
    expect(result[0].percent).toBe(67);
  });
  it('returns an empty list for no data', () => {
    expect(summarizeLanguages([])).toEqual([]);
  });
});

describe('pickFeaturedRepos', () => {
  it('skips forks and archived repos and sorts by recent push', () => {
    const picked = pickFeaturedRepos([
      repo({ id: 1, name: 'old', pushed_at: '2025-01-01T00:00:00Z' }),
      repo({ id: 2, name: 'new', pushed_at: '2026-06-01T00:00:00Z' }),
      repo({ id: 3, name: 'fork', fork: true }),
      repo({ id: 4, name: 'arch', archived: true }),
    ]);
    expect(picked.map((r) => r.name)).toEqual(['new', 'old']);
  });
});

describe('describeEvent', () => {
  it('describes pushes and ignores unknown types', () => {
    const push = describeEvent({ id: '1', type: 'PushEvent', repo: { name: 'me/app' }, created_at: '2026-01-01T00:00:00Z', payload: { size: 3 } });
    expect(push?.text).toBe('Pushed 3 commits to');
    expect(push?.repo).toBe('app');
    expect(describeEvent({ id: '2', type: 'GollumEvent', repo: { name: 'me/app' }, created_at: '' })).toBeNull();
  });
});

describe('relativeTime', () => {
  const now = new Date('2026-06-10T12:00:00Z').getTime();
  it('formats units', () => {
    expect(relativeTime('2026-06-10T11:59:50Z', now)).toBe('just now');
    expect(relativeTime('2026-06-10T10:00:00Z', now)).toBe('2 hours ago');
    expect(relativeTime('2026-06-09T12:00:00Z', now)).toBe('1 day ago');
  });
});

describe('parseContributions', () => {
  it('builds Sunday-aligned week columns and totals', () => {
    const data = parseContributions({
      contributions: [
        { date: '2026-06-03', count: 2, level: 1 }, // Wednesday
        { date: '2026-06-04', count: 0, level: 0 },
        { date: '2026-06-07', count: 5, level: 4 }, // Sunday starts the next column
      ],
    });
    expect(data?.total).toBe(7);
    expect(data?.weeks).toHaveLength(2);
    expect(data?.weeks[0][0]).toBeNull();
    expect(data?.weeks[0][3]?.count).toBe(2);
    expect(data?.weeks[1][0]?.count).toBe(5);
  });
  it('rejects malformed payloads', () => {
    expect(parseContributions(null)).toBeNull();
    expect(parseContributions({ contributions: [] })).toBeNull();
    expect(parseContributions({ contributions: [{ date: 1 }] })).toBeNull();
  });
});
