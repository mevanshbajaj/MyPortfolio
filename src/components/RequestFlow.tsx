import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';

interface Scenario {
  id: string;
  tab: string;
  method: 'GET' | 'POST';
  path: string;
  status: string;
  tone: 'ok' | 'bad';
  /** Index of the step where the request stops (undefined = passes every step). */
  failAt?: number;
  notes: string[];
  result: string;
}

const steps = ['Controller', 'JWT filter', 'Role check', 'Service', 'Repository'];

const scenarios: Scenario[] = [
  {
    id: 'read',
    tab: 'Read',
    method: 'GET',
    path: '/api/doctors',
    status: '200 OK',
    tone: 'ok',
    notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Availability rules applied', 'Records fetched'],
    result: 'Authenticated patient gets the doctor list.',
  },
  {
    id: 'book',
    tab: 'Book',
    method: 'POST',
    path: '/api/appointments',
    status: '201 Created',
    tone: 'ok',
    notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Slot is free', 'Appointment saved'],
    result: 'Booking succeeds and the slot is taken.',
  },
  {
    id: 'double',
    tab: 'Double-book',
    method: 'POST',
    path: '/api/appointments',
    status: '409 Conflict',
    tone: 'bad',
    failAt: 3,
    notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Slot already booked', 'Not reached'],
    result: 'The service layer rejects the second booking before it reaches the database.',
  },
  {
    id: 'anon',
    tab: 'No token',
    method: 'GET',
    path: '/api/appointments',
    status: '401 Unauthorized',
    tone: 'bad',
    failAt: 1,
    notes: ['Route matched', 'No valid token', 'Not reached', 'Not reached', 'Not reached'],
    result: 'Requests without a valid JWT never reach business logic.',
  },
];

const STEP_MS = 650;
const HOLD_MS = 2600;

/** Illustrative request lifecycle through a layered backend, using the auth and booking rules from the projects. */
export default function RequestFlow() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // number of steps revealed (0..steps.length)
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const scenario = scenarios[active];
  const stopAt = scenario.failAt ?? steps.length - 1;
  const done = progress > stopAt;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setProgress(steps.length);
      return;
    }
    if (paused) return;
    const timer = window.setTimeout(
      () => {
        if (!done) setProgress((p) => p + 1);
        else {
          setActive((a) => (a + 1) % scenarios.length);
          setProgress(0);
        }
      },
      done ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [progress, done, paused, reduced]);

  const select = (index: number) => {
    setActive(index);
    setProgress(reduced ? steps.length : 0);
    setPaused(false);
  };

  const tone = scenario.tone === 'ok' ? 'text-accent' : 'text-[#ff8a7a]';

  return (
    <motion.figure
      aria-label="Illustrative request flow through a layered backend"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="w-full max-w-md justify-self-center overflow-hidden rounded-xl border border-line-strong bg-surface/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] lg:justify-self-end"
    >
      <div role="tablist" aria-label="Request scenarios" className="flex gap-1 border-b border-line p-2">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => select(i)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              i === active ? 'bg-surface2 text-ink' : 'text-faint hover:text-ink'
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 pt-4 font-mono text-xs">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="rounded bg-accent/15 px-1.5 py-0.5 font-semibold text-accent">{scenario.method}</span>
          <span className="truncate text-mute">{scenario.path}</span>
        </div>
        <span className={`shrink-0 font-semibold transition-opacity duration-300 ${tone} ${done ? 'opacity-100' : 'opacity-30'}`}>
          {done ? scenario.status : 'pending'}
        </span>
      </div>

      <ol className="px-4 py-4">
        {steps.map((label, i) => {
          const reached = i < progress && i <= stopAt;
          const failed = scenario.failAt === i && reached;
          const skipped = scenario.failAt !== undefined && i > scenario.failAt;
          const current = i === progress && !done;
          return (
            <li key={label} className="relative flex gap-3 pb-4 last:pb-0">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-[11px] top-6 h-[calc(100%-1.25rem)] w-px bg-line-strong" />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors duration-300 ${
                  failed
                    ? 'border-[#ff8a7a] bg-[#ff8a7a]/15 text-[#ff8a7a]'
                    : reached
                      ? 'border-accent bg-accent/15 text-accent'
                      : current
                        ? 'border-accent/60 text-accent'
                        : 'border-line-strong text-faint'
                }`}
              >
                {failed ? '✕' : reached ? '✓' : ''}
              </span>
              <div className={`min-w-0 transition-opacity duration-300 ${skipped && done ? 'opacity-40' : ''}`}>
                <p className="text-sm font-medium text-ink">{label}</p>
                <p className={`text-xs ${failed ? 'text-[#ff8a7a]' : 'text-faint'}`}>
                  {reached || (skipped && done) ? scenario.notes[i] : '\u00A0'}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption aria-live="polite" className="border-t border-line px-4 py-3 text-xs leading-relaxed text-mute">
        {done ? scenario.result : 'Following the request through each layer…'}
        <span className="mt-1 block font-mono text-[11px] text-faint">Illustrative flow · select a scenario</span>
      </figcaption>
    </motion.figure>
  );
}
