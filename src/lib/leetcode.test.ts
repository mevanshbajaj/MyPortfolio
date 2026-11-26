import { describe, expect, it } from 'vitest';
import { buildStatsUrl, parseLeetCodeStats } from './leetcode';

describe('parseLeetCodeStats', () => {
  it('parses a valid payload', () => {
    expect(parseLeetCodeStats({ totalSolved: 10, easySolved: 5, mediumSolved: 4, hardSolved: 1 })).toEqual({ total: 10, easy: 5, medium: 4, hard: 1 });
  });
  it('rejects missing, negative or non-numeric fields', () => {
    expect(parseLeetCodeStats({})).toBeNull();
    expect(parseLeetCodeStats(null)).toBeNull();
    expect(parseLeetCodeStats({ totalSolved: '10', easySolved: 5, mediumSolved: 4, hardSolved: 1 })).toBeNull();
    expect(parseLeetCodeStats({ totalSolved: 10, easySolved: -1, mediumSolved: 4, hardSolved: 1 })).toBeNull();
  });
});

describe('buildStatsUrl', () => {
  it('substitutes the username and returns null when unset', () => {
    expect(buildStatsUrl('https://api.example.com/{username}', 'Vansh Bajaj')).toBe('https://api.example.com/Vansh%20Bajaj');
    expect(buildStatsUrl(undefined, 'x')).toBeNull();
  });
});
