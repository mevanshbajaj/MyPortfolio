import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import type { Project } from '../types';
import Button from './Button';
import { CloseIcon, GitHubIcon } from './Icons';
import ProjectVisual from './ProjectVisual';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ProjectModalProps {
  project: Project;
  number: string;
  onClose: () => void;
}

export default function ProjectModal({ project, number, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-${project.id}-title`;

  // Focus trap, Escape to close, scroll lock, and focus restore on unmount.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="relative z-10 flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-accent">{number}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="uppercase tracking-wider text-faint">{project.category}</span>
            </div>
            <h3 id={titleId} className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-mute">{project.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 rounded-md border border-line-strong p-2 text-mute transition-colors hover:bg-surface2 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <p className="text-[15px] leading-relaxed text-mute">{project.summary}</p>

              <h4 className="mt-6 font-mono text-xs uppercase tracking-wider text-faint">What I built</h4>
              <ul className="mt-3 space-y-3">
                {project.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/90">
                    <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-mono text-xs uppercase tracking-wider text-faint">Technical highlights</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-md border border-accent/30 bg-accent/[0.06] px-2.5 py-1 text-[13px] text-ink"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <ProjectVisual visual={project.visual} />
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-faint">Stack</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-xs text-mute"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 sm:px-6">
          <Button
            href={project.github}
            external
            variant="primary"
            icon={<GitHubIcon className="h-4 w-4" />}
            ariaLabel={`${project.name} on GitHub (opens in a new tab)`}
          >
            GitHub
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
