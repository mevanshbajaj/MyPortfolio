import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems, profile } from '../data/profile';
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon, DownloadIcon } from './Icons';

interface NavbarProps {
  activeId: string;
}

const iconLink =
  'rounded-md p-2 text-mute transition-colors duration-150 hover:bg-surface2 hover:text-ink';

export default function Navbar({ activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        solid ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          aria-label={`${profile.name}, back to top`}
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-line-strong bg-surface font-mono text-[11px] font-bold text-accent"
          >
            VB
          </span>
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'location' : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                      active ? 'text-ink' : 'text-mute hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <span aria-hidden="true" className="mx-3 h-5 w-px bg-line-strong" />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className={iconLink}
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className={iconLink}
          >
            <LinkedInIcon />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Resume
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className={iconLink}
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className={iconLink}
          >
            <LinkedInIcon />
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="ml-1 rounded-md border border-line-strong p-2 text-ink transition-colors hover:bg-surface2"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
                {navItems.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'location' : undefined}
                        className={`flex items-center justify-between rounded-md px-2 py-3 text-base transition-colors ${
                          active ? 'text-accent' : 'text-ink hover:text-accent'
                        }`}
                      >
                        {item.label}
                        {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
