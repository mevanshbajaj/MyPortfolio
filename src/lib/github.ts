export interface GitHubUser {
  login: string;
  name: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics?: string[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { size?: number; commits?: unknown[]; action?: string; ref_type?: string };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type GitHubErrorKind = 'rate-limit' | 'not-found' | 'network' | 'http';

export class GitHubError extends Error {
  constructor(
    public kind: GitHubErrorKind,
    message: string,
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

/** Fetches JSON and converts failures into typed errors (rate limit, 404, offline, other HTTP). */
export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new GitHubError('network', 'Could not reach the service.');
  }
  if (response.ok) return (await response.json()) as T;
  if (response.status === 404) throw new GitHubError('not-found', 'Not found.');
  if (response.status === 429 || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')) {
    throw new GitHubError('rate-limit', 'GitHub API rate limit reached. Try again later.');
  }
  throw new GitHubError('http', `Request failed (${response.status}).`);
}

export function errorMessage(error: unknown): string {
  if (error instanceof GitHubError) return error.message;
  return 'Something went wrong.';
}

export interface LanguageShare {
  language: string;
  count: number;
  percent: number;
}

/** Share of (non-fork) repositories per primary language. This is a repo count, not lines of code. */
export function summarizeLanguages(repos: GitHubRepo[]): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  return Array.from(counts, ([language, count]) => ({ language, count, percent: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count || a.language.localeCompare(b.language))
    .slice(0, 6);
}

export function pickFeaturedRepos(repos: GitHubRepo[], limit = 6): GitHubRepo[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, limit);
}

export interface ActivityItem {
  id: string;
  text: string;
  repo: string;
  date: string;
}

/** Turns a public event into a short sentence, or null for event types we do not display. */
export function describeEvent(event: GitHubEvent): ActivityItem | null {
  const repo = event.repo.name.split('/').pop() ?? event.repo.name;
  let text: string | null = null;
  switch (event.type) {
    case 'PushEvent': {
      const n = event.payload?.size ?? event.payload?.commits?.length;
      text = n ? `Pushed ${n} commit${n === 1 ? '' : 's'} to` : 'Pushed to';
      break;
    }
    case 'CreateEvent':
      text = `Created a ${event.payload?.ref_type ?? 'repository'} in`;
      break;
    case 'PullRequestEvent':
      text = `${event.payload?.action === 'closed' ? 'Closed' : 'Opened'} a pull request in`;
      break;
    case 'IssuesEvent':
      text = 'Worked on an issue in';
      break;
    case 'ForkEvent':
      text = 'Forked';
      break;
    case 'WatchEvent':
      text = 'Starred';
      break;
    default:
      return null;
  }
  return { id: event.id, text, repo, date: event.created_at };
}

export function relativeTime(iso: string, now = Date.now()): string {
  const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  const units: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];
  for (const [size, name] of units) {
    if (seconds >= size) {
      const value = Math.floor(seconds / size);
      return `${value} ${name}${value === 1 ? '' : 's'} ago`;
    }
  }
  return 'just now';
}

export interface ContributionData {
  total: number;
  weeks: (ContributionDay | null)[][];
}

/** Parses the response of a contributions service (list of { date, count, level }) into week columns. */
export function parseContributions(json: unknown): ContributionData | null {
  const list = (json as { contributions?: unknown })?.contributions;
  if (!Array.isArray(list) || list.length === 0) return null;
  const days: ContributionDay[] = [];
  for (const entry of list) {
    const { date, count, level } = entry as Partial<ContributionDay>;
    if (typeof date !== 'string' || typeof count !== 'number') return null;
    days.push({ date, count, level: (typeof level === 'number' && level >= 0 && level <= 4 ? level : 0) as ContributionDay['level'] });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Place each day by its weekday so gaps in the data never shift a column.
  const weeks: (ContributionDay | null)[][] = [];
  let column: (ContributionDay | null)[] = [];
  const flush = () => {
    while (column.length < 7) column.push(null);
    weeks.push(column);
    column = [];
  };
  for (const day of days) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 && column.length > 0) flush();
    while (column.length < weekday) column.push(null);
    column[weekday] = day;
  }
  if (column.length > 0) flush();
  return { total: days.reduce((sum, d) => sum + d.count, 0), weeks };
}
