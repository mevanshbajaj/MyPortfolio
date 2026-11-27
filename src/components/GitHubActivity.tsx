import { useMemo, type ReactNode } from 'react';
import { profile } from '../data/profile';
import { useAsync } from '../hooks/useAsync';
import {
  describeEvent,
  errorMessage,
  fetchJson,
  parseContributions,
  pickFeaturedRepos,
  relativeTime,
  summarizeLanguages,
  type ContributionData,
  type GitHubEvent,
  type GitHubRepo,
  type GitHubUser,
} from '../lib/github';
import Button from './Button';
import { ForkIcon, GitHubIcon, StarIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

const API = 'https://api.github.com';
const user = profile.githubUsername;

const levelClass = ['bg-line-strong/60', 'bg-accent/25', 'bg-accent/45', 'bg-accent/70', 'bg-accent'] as const;

function Card({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`spotlight rounded-xl border border-line bg-surface p-5 sm:p-6 ${className}`}>
      <h3 className="font-mono text-xs uppercase tracking-wider text-faint">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-md bg-line-strong/50 ${className}`} />;
}

function Unavailable({ error }: { error: unknown }) {
  return (
    <p role="status" className="rounded-lg border border-line bg-surface2/60 px-4 py-3 text-sm text-mute">
      {errorMessage(error)} <span className="text-faint">You can still browse everything on GitHub directly.</span>
    </p>
  );
}

function ContributionGraph() {
  const state = useAsync<ContributionData>(`contrib:${user}`, async (signal) => {
    const json = await fetchJson<unknown>(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, signal);
    const parsed = parseContributions(json);
    if (!parsed) throw new Error('Unexpected response');
    return parsed;
  });

  return (
    <Card title="Contributions · last 12 months" className="lg:col-span-2">
      {state.status === 'loading' && <Skeleton className="h-28 w-full" />}
      {state.status === 'error' && <Unavailable error={state.error} />}
      {state.status === 'ready' && (
        <>
          <div className="overflow-x-auto pb-2">
            <div
              role="img"
              aria-label={`${state.data.total} contributions on GitHub in the last year`}
              className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
            >
              {state.data.weeks.map((week, w) =>
                Array.from({ length: 7 }, (_, d) => {
                  const day = week[d];
                  return day ? (
                    <span
                      key={`${w}-${d}`}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                      className={`h-[11px] w-[11px] rounded-[2px] ${levelClass[day.level]}`}
                    />
                  ) : (
                    <span key={`${w}-${d}`} className="h-[11px] w-[11px]" />
                  );
                }),
              )}
            </div>
          </div>
          <p className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-faint">
            <span>
              <span className="font-medium text-ink">{state.data.total}</span> contributions in the last year
            </span>
            <span className="flex items-center gap-1.5" aria-hidden="true">
              Less
              {levelClass.map((c) => (
                <span key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
              ))}
              More
            </span>
          </p>
          <p className="mt-1 text-[11px] text-faint">Contribution data via the community service github-contributions-api.jogruber.de.</p>
        </>
      )}
    </Card>
  );
}

function ProfileStats({ data }: { data: GitHubUser }) {
  const items = [
    { label: 'Public repositories', value: data.public_repos },
    { label: 'Followers', value: data.followers },
    { label: 'Following', value: data.following },
    { label: 'On GitHub since', value: new Date(data.created_at).getFullYear() },
  ];
  return (
    <dl className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.label}>
          <dd className="text-2xl font-semibold tracking-tight text-ink">{item.value}</dd>
          <dt className="mt-0.5 font-mono text-[11px] text-faint">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function LanguageBars({ repos }: { repos: GitHubRepo[] }) {
  const languages = useMemo(() => summarizeLanguages(repos), [repos]);
  if (languages.length === 0) return <p className="text-sm text-mute">No language data on public repositories yet.</p>;
  return (
    <>
      <ul className="space-y-3">
        {languages.map((lang) => (
          <li key={lang.language}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink">{lang.language}</span>
              <span className="font-mono text-xs text-faint">
                {lang.count} repo{lang.count === 1 ? '' : 's'} · {lang.percent}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line-strong/60" aria-hidden="true">
              <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(lang.percent, 3)}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-faint">Primary language per public, non-fork repository.</p>
    </>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40"
    >
      <span className="flex items-center gap-2 text-[15px] font-medium text-ink group-hover:text-accent">
        <GitHubIcon className="h-4 w-4 shrink-0 text-faint" />
        <span className="truncate">{repo.name}</span>
        <span className="sr-only">(opens in a new tab)</span>
      </span>
      <span className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-mute">
        {repo.description ?? 'No description provided.'}
      </span>
      <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <StarIcon /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <ForkIcon /> {repo.forks_count}
        </span>
        <span>updated {relativeTime(repo.pushed_at)}</span>
      </span>
    </a>
  );
}

function Activity({ events }: { events: GitHubEvent[] }) {
  const items = useMemo(() => events.map(describeEvent).filter((e) => e !== null).slice(0, 6), [events]);
  if (items.length === 0) return <p className="text-sm text-mute">No recent public activity.</p>;
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3 text-sm">
          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="min-w-0 text-mute">
            {item.text} <span className="font-mono text-[13px] text-ink">{item.repo}</span>
            <span className="block text-xs text-faint">{relativeTime(item.date)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function GitHubActivity() {
  const profileState = useAsync<GitHubUser>(`user:${user}`, (signal) => fetchJson(`${API}/users/${user}`, signal));
  const reposState = useAsync<GitHubRepo[]>(`repos:${user}`, (signal) =>
    fetchJson(`${API}/users/${user}/repos?per_page=100&sort=pushed`, signal),
  );
  const eventsState = useAsync<GitHubEvent[]>(`events:${user}`, (signal) =>
    fetchJson(`${API}/users/${user}/events/public?per_page=30`, signal),
  );

  const featured = useMemo(() => (reposState.status === 'ready' ? pickFeaturedRepos(reposState.data) : []), [reposState]);

  return (
    <Section
      id="github"
      eyebrow="04 / github"
      title="Open-source footprint"
      description="Live data from the public GitHub API: repositories, languages and recent activity."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Reveal className="h-full">
          <Card title="Profile" className="h-full">
            {profileState.status === 'loading' && <Skeleton className="h-24 w-full" />}
            {profileState.status === 'error' && <Unavailable error={profileState.error} />}
            {profileState.status === 'ready' && <ProfileStats data={profileState.data} />}
            <div className="mt-5">
              <Button href={profile.github} external variant="secondary" icon={<GitHubIcon className="h-4 w-4" />}>
                @{user} on GitHub
              </Button>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.05} className="h-full lg:col-span-2">
          <ContributionGraph />
        </Reveal>
        <Reveal delay={0.05} className="h-full">
          <Card title="Top languages" className="h-full">
            {reposState.status === 'loading' && <Skeleton className="h-32 w-full" />}
            {reposState.status === 'error' && <Unavailable error={reposState.error} />}
            {reposState.status === 'ready' && <LanguageBars repos={reposState.data} />}
          </Card>
        </Reveal>
        <Reveal delay={0.1} className="h-full lg:col-span-2">
          <Card title="Recent activity" className="h-full">
            {eventsState.status === 'loading' && <Skeleton className="h-32 w-full" />}
            {eventsState.status === 'error' && <Unavailable error={eventsState.error} />}
            {eventsState.status === 'ready' && <Activity events={eventsState.data} />}
          </Card>
        </Reveal>
      </div>

      <h3 className="mb-4 mt-10 text-xl font-semibold tracking-tight text-ink">Recently updated repositories</h3>
      {reposState.status === 'loading' && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <Skeleton className="h-32 w-full" />
            </li>
          ))}
        </ul>
      )}
      {reposState.status === 'error' && <Unavailable error={reposState.error} />}
      {reposState.status === 'ready' && featured.length === 0 && <p className="text-sm text-mute">No public repositories to show.</p>}
      {featured.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((repo, i) => (
            <li key={repo.id}>
              <Reveal delay={Math.min(i * 0.05, 0.2)} className="h-full">
                <RepoCard repo={repo} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
