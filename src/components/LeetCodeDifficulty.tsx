import { leetcode, leetcodeDifficulty } from '../data/problemSolving';
import { useAsync } from '../hooks/useAsync';
import { buildStatsUrl, parseLeetCodeStats, type LeetCodeStats } from '../lib/leetcode';
import Reveal from './Reveal';

const url = buildStatsUrl(import.meta.env.VITE_LEETCODE_STATS_URL, leetcode.username);

const staticStats: LeetCodeStats | null = leetcodeDifficulty
  ? { ...leetcodeDifficulty, total: leetcodeDifficulty.easy + leetcodeDifficulty.medium + leetcodeDifficulty.hard }
  : null;

const rows = [
  { key: 'easy', label: 'Easy', bar: 'bg-accent' },
  { key: 'medium', label: 'Medium', bar: 'bg-amber' },
  { key: 'hard', label: 'Hard', bar: 'bg-danger' },
] as const;

function Bars({ stats, source }: { stats: LeetCodeStats; source: string }) {
  const total = stats.easy + stats.medium + stats.hard || 1;
  return (
    <Reveal>
      <div className="spotlight mt-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-faint">Difficulty breakdown</h3>
          <p className="text-xs text-faint">{source}</p>
        </div>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-line-strong/60" role="img" aria-label={`${stats.easy} easy, ${stats.medium} medium, ${stats.hard} hard`}>
          {rows.map((r) => (
            <span key={r.key} className={r.bar} style={{ width: `${(stats[r.key] / total) * 100}%` }} />
          ))}
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-4">
          {rows.map((r) => (
            <div key={r.key}>
              <dd className="text-2xl font-semibold tracking-tight text-ink">{stats[r.key]}</dd>
              <dt className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-faint">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${r.bar}`} />
                {r.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

function Live({ endpoint }: { endpoint: string }) {
  const state = useAsync<LeetCodeStats>(`leetcode:${endpoint}`, async (signal) => {
    const response = await fetch(endpoint, { signal });
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const parsed = parseLeetCodeStats(await response.json());
    if (!parsed) throw new Error('Unexpected response');
    return parsed;
  });

  if (state.status === 'loading') {
    return <div aria-hidden="true" className="mt-4 h-32 animate-pulse rounded-xl border border-line bg-surface" />;
  }
  if (state.status === 'error') {
    return (
      <p role="status" className="mt-4 rounded-lg border border-line bg-surface2/60 px-4 py-3 text-sm text-mute">
        Live LeetCode statistics are unavailable right now. The profile link above has the current numbers.
      </p>
    );
  }
  return <Bars stats={state.data} source="Live from the configured stats endpoint" />;
}

/** Shows difficulty-wise stats only when they are live (env endpoint) or verified (data file). Never invents numbers. */
export default function LeetCodeDifficulty() {
  if (url) return <Live endpoint={url} />;
  if (staticStats) return <Bars stats={staticStats} source="From my LeetCode profile" />;
  return null;
}
