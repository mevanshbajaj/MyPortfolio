export interface LeetCodeStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

const isCount = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;

/**
 * Accepts the common community-API shape ({ totalSolved, easySolved, mediumSolved, hardSolved })
 * and returns null for anything else, so malformed data is never displayed.
 */
export function parseLeetCodeStats(json: unknown): LeetCodeStats | null {
  const data = json as Record<string, unknown> | null;
  if (!data || typeof data !== 'object') return null;
  const { totalSolved, easySolved, mediumSolved, hardSolved } = data;
  if (![totalSolved, easySolved, mediumSolved, hardSolved].every(isCount)) return null;
  return { total: totalSolved as number, easy: easySolved as number, medium: mediumSolved as number, hard: hardSolved as number };
}

export function buildStatsUrl(template: string | undefined, username: string): string | null {
  if (!template) return null;
  return template.replace('{username}', encodeURIComponent(username));
}
