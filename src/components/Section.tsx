import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`relative border-t border-line/70 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <header className="mb-10 max-w-2xl sm:mb-14">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
              {eyebrow}
            </p>
            <h2 id={titleId} className="mt-3 bg-gradient-to-b from-heading to-ink/75 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">{description}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
