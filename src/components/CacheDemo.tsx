import { useEffect, useState } from 'react';

const TTL_SECONDS = 10;

interface LogLine {
  id: number;
  kind: 'hit' | 'miss' | 'invalidate';
  text: string;
}

/** Cache-aside demo that runs entirely in the browser: no real cache or database is involved. */
export default function CacheDemo() {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [log, setLog] = useState<LogLine[]>([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = expiresAt ? Math.max(0, Math.ceil((expiresAt - now) / 1000)) : 0;
  const cached = expiresAt !== null && remaining > 0;

  const push = (kind: LogLine['kind'], text: string) =>
    setLog((l) => [{ id: Date.now() + Math.random(), kind, text }, ...l].slice(0, 6));

  const request = () => {
    const t = Date.now();
    if (expiresAt !== null && t < expiresAt) {
      setHits((h) => h + 1);
      push('hit', 'Cache HIT · served from the cache, database untouched');
    } else {
      setMisses((m) => m + 1);
      setExpiresAt(t + TTL_SECONDS * 1000);
      push('miss', expiresAt ? 'Cache MISS (entry expired) · read the database, stored the result' : 'Cache MISS · read the database, stored the result');
    }
    setNow(t);
  };

  const invalidate = () => {
    setExpiresAt(null);
    push('invalidate', 'Write happened · cache entry invalidated so readers never see stale data');
  };

  const tone = { hit: 'text-accent', miss: 'text-amber', invalidate: 'text-danger' } as const;

  return (
    <>
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-ink">Cache-aside with a TTL</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">
          Check the cache first. On a miss, read the database and store the result with a time-to-live. On a write, invalidate the entry. Repeated reads
          are then served from memory instead of hitting the database every time.
        </p>
        <p className="mt-3 text-sm text-faint">
          This is a concept demo that runs in your browser. The entry lives for {TTL_SECONDS} seconds.
        </p>
      </div>

      <div className="rounded-xl border border-line-strong bg-surface/90 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={request}
            className="rounded-lg bg-accent px-3.5 py-2 font-mono text-xs font-medium text-on-accent transition hover:bg-accent/90"
          >
            GET /api/doctors
          </button>
          <button
            type="button"
            onClick={invalidate}
            className="rounded-lg border border-line-strong px-3.5 py-2 font-mono text-xs text-ink transition-colors hover:border-accent/50"
          >
            POST /api/doctors (write)
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-line bg-surface2/60 p-3">
            <dd className={`text-lg font-semibold ${cached ? 'text-accent' : 'text-faint'}`}>{cached ? `${remaining}s` : 'empty'}</dd>
            <dt className="mt-0.5 font-mono text-[11px] text-faint">cache entry</dt>
          </div>
          <div className="rounded-lg border border-line bg-surface2/60 p-3">
            <dd className="text-lg font-semibold text-ink">{hits}</dd>
            <dt className="mt-0.5 font-mono text-[11px] text-faint">hits</dt>
          </div>
          <div className="rounded-lg border border-line bg-surface2/60 p-3">
            <dd className="text-lg font-semibold text-ink">{misses}</dd>
            <dt className="mt-0.5 font-mono text-[11px] text-faint">misses (DB reads)</dt>
          </div>
        </dl>

        <ul aria-live="polite" aria-label="Request log" className="mt-5 min-h-[9rem] space-y-2 font-mono text-xs">
          {log.length === 0 && <li className="text-faint">Send a request to see what happens.</li>}
          {log.map((line) => (
            <li key={line.id} className={tone[line.kind]}>
              {line.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
