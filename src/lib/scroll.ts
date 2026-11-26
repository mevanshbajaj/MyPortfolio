/** Smoothly scrolls to a section by id (instant for reduced-motion users) and updates the URL hash. */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  try {
    history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`);
  } catch {
    /* ignore */
  }
  return true;
}
