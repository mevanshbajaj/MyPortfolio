import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { certifications, education } from '../data/education';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { EASE } from '../lib/motion';

interface Endpoint {
  path: string;
  data: unknown;
}

/** Every response is built from the same data files that power the rest of the site. */
const endpoints: Endpoint[] = [
  {
    path: '/api/profile',
    data: {
      name: profile.name,
      role: profile.role,
      location: education.location,
      open_to: 'Backend Engineer Internship',
      email: profile.email,
      links: { github: profile.github, linkedin: profile.linkedin },
    },
  },
  {
    path: '/api/projects',
    data: projects.map((p) => ({ name: p.name, type: p.subtitle, stack: p.stack, repo: p.github })),
  },
  {
    path: '/api/skills',
    data: Object.fromEntries(skillCategories.map((c) => [c.title, c.items])),
  },
  {
    path: '/api/education',
    data: {
      institution: education.institution,
      degree: education.degree,
      period: `${education.start} – ${education.end}`,
      cgpa: Number(education.cgpa),
    },
  },
  {
    path: '/api/certifications',
    data: certifications.map((c) => ({ title: c.title, url: c.url })),
  },
];

const LINE_MS = 28;
const LATENCY_MS = 320;

function Line({ text }: { text: string }) {
  const match = text.match(/^(\s*)(?:("[^"]*"): )?(.*)$/s);
  const [, indent = '', key, rest = ''] = match ?? [];
  const isString = rest.startsWith('"');
  const isNumber = /^-?\d/.test(rest);
  return (
    <>
      {indent}
      {key && (
        <>
          <span className="text-ink">{key}</span>
          <span className="text-faint">: </span>
        </>
      )}
      <span className={isString ? 'text-accent' : isNumber ? 'text-[#e6b450]' : 'text-faint'}>{rest}</span>
    </>
  );
}

export default function ApiPlayground() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [shown, setShown] = useState(0);

  const endpoint = endpoints[active];
  const lines = useMemo(() => JSON.stringify(endpoint.data, null, 2).split('\n'), [endpoint]);
  const bytes = useMemo(() => new Blob([JSON.stringify(endpoint.data)]).size, [endpoint]);

  useEffect(() => {
    setLoaded(false);
    setShown(0);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setLoaded(true);
      setShown(lines.length);
      return;
    }
    let interval: number | undefined;
    const send = window.setTimeout(() => {
      setLoaded(true);
      interval = window.setInterval(() => {
        setShown((n) => {
          if (n >= lines.length) {
            window.clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, LINE_MS);
    }, LATENCY_MS);
    return () => {
      window.clearTimeout(send);
      window.clearInterval(interval);
    };
  }, [lines]);

  return (
    <motion.figure
      aria-label="Interactive API playground with Vansh Bajaj's profile data"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
      className="w-full max-w-md justify-self-center overflow-hidden rounded-xl border border-line-strong bg-surface/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] lg:justify-self-end"
    >
      <div className="border-b border-line p-3">
        <p className="mb-2 px-1 text-xs text-faint">Choose an endpoint to send a request</p>
        <div role="group" aria-label="API endpoints" className="flex flex-wrap gap-1.5">
          {endpoints.map((e, i) => (
            <button
              key={e.path}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                i === active
                  ? 'border-accent/60 bg-accent/10 text-accent'
                  : 'border-line bg-surface2 text-mute hover:border-line-strong hover:text-ink'
              }`}
            >
              {e.path.replace('/api/', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-xs">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="rounded bg-accent/15 px-1.5 py-0.5 font-semibold text-accent">GET</span>
          <span className="truncate text-mute">{endpoint.path}</span>
        </div>
        <span className={`shrink-0 font-semibold ${loaded ? 'text-accent' : 'text-faint'}`} role="status">
          {loaded ? '200 OK' : 'sending…'}
        </span>
      </div>

      <div
        role="region"
        aria-label={`Response from ${endpoint.path}`}
        tabIndex={0}
        className="h-72 overflow-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]"
      >
        <pre className="whitespace-pre-wrap break-words">
          <code>
            {lines.slice(0, shown).map((line, i) => (
              <div key={i}>
                <Line text={line} />
              </div>
            ))}
            {loaded && shown < lines.length && (
              <span aria-hidden="true" className="inline-block h-4 w-2 animate-pulse bg-accent/70 align-middle" />
            )}
          </code>
        </pre>
      </div>

      <figcaption className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-faint">
        <span>application/json</span>
        <span>{loaded ? `${bytes} bytes` : ''}</span>
      </figcaption>
    </motion.figure>
  );
}
