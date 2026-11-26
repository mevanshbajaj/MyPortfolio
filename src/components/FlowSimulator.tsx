import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface FlowScenario {
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

interface FlowSimulatorProps {
  label: string;
  steps: string[];
  scenarios: FlowScenario[];
  className?: string;
}

const STEP_MS = 650;
const HOLD_MS = 2600;

/**
 * Animated walk of a request through a series of steps. Pick a scenario to see where it succeeds or is rejected.
 * Auto-plays (and cycles) until the user interacts; static for reduced-motion users.
 */
export default function FlowSimulator({ label, steps, scenarios, className = '' }: FlowSimulatorProps) {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(reduced ? steps.length : 0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);

  const scenario = scenarios[active];
  const stopAt = scenario.failAt ?? steps.length - 1;
  const done = progress > stopAt;

  useEffect(() => {
    if (reduced) {
      setProgress(steps.length);
      return;
    }
    if (paused) return;
    // After the user picks a scenario, play it once and stop instead of cycling.
    if (manual && done) return;
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
  }, [progress, done, paused, reduced, manual, scenarios.length, steps.length]);

  const select = (index: number) => {
    setActive(index);
    setProgress(reduced ? steps.length : 0);
    setManual(true);
  };

  const tone = scenario.tone === 'ok' ? 'text-accent' : 'text-danger';

  return (
    <figure
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`w-full overflow-hidden rounded-xl border border-line-strong bg-surface/90 ${className}`}
    >
      <div role="tablist" aria-label={`${label}: scenarios`} className="flex flex-wrap gap-1 border-b border-line p-2">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => select(i)}
            className={`flex-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
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
        {steps.map((stepLabel, i) => {
          const reached = i < progress && i <= stopAt;
          const failed = scenario.failAt === i && reached;
          const skipped = scenario.failAt !== undefined && i > scenario.failAt;
          const current = i === progress && !done;
          return (
            <li key={stepLabel} className="relative flex gap-3 pb-4 last:pb-0">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-[11px] top-6 h-[calc(100%-1.25rem)] w-px bg-line-strong" />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-surface text-[11px] transition-colors duration-300 ${
                  failed
                    ? 'border-danger bg-danger/15 text-danger'
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
                <p className="text-sm font-medium text-ink">{stepLabel}</p>
                <p className={`text-xs ${failed ? 'text-danger' : 'text-faint'}`}>
                  {reached || (skipped && done) ? scenario.notes[i] : ' '}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption aria-live="polite" className="border-t border-line px-4 py-3 text-xs leading-relaxed text-mute">
        {done ? scenario.result : 'Following the request through each step…'}
        <span className="mt-1 block font-mono text-[11px] text-faint">Illustrative flow · select a scenario</span>
      </figcaption>
    </figure>
  );
}
