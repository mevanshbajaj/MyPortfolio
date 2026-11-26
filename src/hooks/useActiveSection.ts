import { useEffect, useState } from 'react';

/**
 * Returns the id of the section that currently contains the line 40% down the viewport.
 * Elements are looked up on every (rAF-throttled) scroll, so lazily mounted sections are picked up too.
 * `ids` should be a stable (module-level) array.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
