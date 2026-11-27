import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ALL_TOPICS, certificateTopics, filterCertificates } from '../lib/certificates';
import { certificateRepo, fallbackCertificates, fileToCertificate } from '../data/certificateFiles';
import type { CertificateFile } from '../types';
import CertificateModal from './CertificateModal';
import { AwardIcon, GitHubIcon, SearchIcon } from './Icons';
import Reveal from './Reveal';

const CACHE_KEY = 'certificate-files-v1';
const PREVIEW_COUNT = 6;

interface GitHubItem {
  name: string;
  type: string;
  html_url: string;
}

async function loadFromGitHub(signal: AbortSignal): Promise<CertificateFile[]> {
  const response = await fetch(certificateRepo.api, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
  const items = (await response.json()) as GitHubItem[];
  return items
    .filter((item) => item.type === 'file' && /\.(pdf|png|jpe?g)$/i.test(item.name))
    .map((item) => fileToCertificate(item.name, item.html_url))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default function CertificateLibrary() {
  const [files, setFiles] = useState<CertificateFile[]>(fallbackCertificates);
  const [source, setSource] = useState<'loading' | 'live' | 'saved'>('loading');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState(ALL_TOPICS);
  const [selected, setSelected] = useState<CertificateFile | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setFiles(JSON.parse(cached) as CertificateFile[]);
        setSource('live');
        return;
      }
    } catch {
      /* storage unavailable: carry on without the cache */
    }
    loadFromGitHub(controller.signal)
      .then((list) => {
        if (list.length === 0) throw new Error('Empty list');
        setFiles(list);
        setSource('live');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch {
          /* ignore */
        }
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== 'AbortError') setSource('saved');
      });
    return () => controller.abort();
  }, []);

  const more = files;
  const topics = useMemo(() => certificateTopics(files), [files]);
  const filtered = useMemo(() => filterCertificates(files, query, topic), [files, query, topic]);
  const filtering = query.trim() !== '' || topic !== ALL_TOPICS;
  const visible = expanded || filtering ? filtered : filtered.slice(0, PREVIEW_COUNT);

  if (more.length === 0) return null;

  return (
    <Reveal>
      <div className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-ink">All certificates</h3>
            <p className="mt-1.5 text-sm text-mute">
              {more.length} certificates in my GitHub repository.{' '}
              <span className="text-faint">
                {source === 'live' ? 'Loaded live from the repo.' : source === 'saved' ? 'Showing a saved list.' : 'Loading…'}
              </span>
            </p>
          </div>
          <a
            href={certificateRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" />
            Open repository
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block sm:w-72">
            <span className="sr-only">Search certificates</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search certificates"
              className="w-full rounded-lg border border-line-strong bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none"
            />
          </label>
          <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  topic === t ? 'border-accent/60 bg-accent/10 text-ink' : 'border-line text-mute hover:border-line-strong hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p role="status" aria-live="polite" className="mt-3 text-xs text-faint">
          {filtering ? `${filtered.length} of ${more.length} certificates match.` : ''}
        </p>

        {visible.length === 0 ? (
          <p className="mt-3 rounded-lg border border-line bg-surface px-4 py-6 text-center text-sm text-mute">No certificates match your search.</p>
        ) : (
          <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((file) => (
              <li key={file.name}>
                <button
                  type="button"
                  onClick={() => setSelected(file)}
                  aria-haspopup="dialog"
                  className="spotlight group flex h-full w-full items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <AwardIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug text-ink">{file.title}</span>
                    <span className="mt-1 block font-mono text-[11px] text-faint">
                      {file.issuer ? `${file.issuer} · ` : ''}
                      {file.topic}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!filtering && filtered.length > PREVIEW_COUNT && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 rounded-lg border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:bg-surface2"
          >
            {expanded ? 'Show fewer' : `Show all ${more.length}`}
          </button>
        )}

        <AnimatePresence>{selected && <CertificateModal key={selected.name} file={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
      </div>
    </Reveal>
  );
}
