import { useEffect } from 'react';

/**
 * Tracks the pointer over any element with the `.spotlight` class and exposes its position
 * as CSS variables (--mx / --my). One passive listener, no React re-renders.
 */
export function useSpotlight(): void {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}
