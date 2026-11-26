import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

interface RotatingTextProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
}

/** Cycles through phrases with a short fade. Static for reduced-motion users; screen readers get the full list once. */
export default function RotatingText({ phrases, intervalMs = 2800, className = '' }: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || phrases.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % phrases.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [reduced, phrases.length, intervalMs]);

  return (
    <p className={className}>
      <span className="sr-only">Currently building: {phrases.join(', ')}.</span>
      <span aria-hidden="true" className="block min-h-[2.75rem] sm:min-h-[1.5rem]">
        <span className="mr-2 text-accent">&gt;</span>
        <span className="mr-1.5 text-faint">building</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phrases[index]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="inline-block text-ink"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent" />
      </span>
    </p>
  );
}
