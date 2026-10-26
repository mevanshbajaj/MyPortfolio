import { useEffect, useMemo, useState } from 'react';
import { certificateRepo, fallbackCertificates, fileToCertificate } from '../data/certificateFiles';
import type { CertificateFile } from '../types';
import { ArrowUpRightIcon, GitHubIcon } from './Icons';
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

  const more = useMemo(() => files, [files]);
  const visible = expanded ? more : more.slice(0, PREVIEW_COUNT);

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

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file) => (
            <li key={file.name}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink transition duration-200 hover:border-accent/40 hover:bg-surface2"
              >
                <span className="min-w-0 leading-snug">{file.title}</span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        {more.length > PREVIEW_COUNT && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 rounded-lg border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:bg-surface2"
          >
            {expanded ? 'Show fewer' : `Show all ${more.length}`}
          </button>
        )}
      </div>
    </Reveal>
  );
}
