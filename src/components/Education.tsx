import { motion } from 'framer-motion';
import { education } from '../data/education';
import { timeline } from '../data/timeline';
import { EASE } from '../lib/motion';
import { ArrowRightIcon, AwardIcon, CodeIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';
import SkillIcon from './SkillIcon';
import type { TimelineEntry } from '../types';

function EntryIcon({ kind }: { kind: TimelineEntry['kind'] }) {
  if (kind === 'education') return <SkillIcon id="core" className="h-4 w-4" />;
  if (kind === 'achievement') return <CodeIcon className="h-4 w-4" />;
  return <AwardIcon className="h-4 w-4" />;
}

export default function Education() {
  return (
    <Section id="education" eyebrow="07 / journey" title="Education and milestones" description="Where I'm studying, what I've achieved so far, and what I've certified.">
      <ol className="relative">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-gradient-to-b from-accent via-line-strong to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: EASE }}
        />
        {timeline.map((entry, index) => (
          <li key={entry.id} className="relative pb-6 pl-12 last:pb-0 sm:pl-14">
            <span
              aria-hidden="true"
              className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-bg text-accent"
            >
              <EntryIcon kind={entry.kind} />
            </span>
            <Reveal delay={Math.min(index * 0.05, 0.15)}>
              <article className="spotlight rounded-xl border border-line bg-surface p-5 sm:p-7">
                {entry.period && <p className="font-mono text-xs uppercase tracking-wider text-accent">{entry.period}</p>}
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{entry.title}</h3>
                {entry.subtitle && <p className="mt-1 text-[15px] text-mute">{entry.subtitle}</p>}

                {entry.kind === 'education' ? (
                  <>
                    <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-3">
                      <div>
                        <dt className="font-mono text-xs uppercase tracking-wider text-faint">CGPA</dt>
                        <dd className="mt-1 text-xl font-semibold text-ink">{education.cgpa}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs uppercase tracking-wider text-faint">Period</dt>
                        <dd className="mt-1 text-base text-ink">{entry.period}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs uppercase tracking-wider text-faint">Location</dt>
                        <dd className="mt-1 text-base text-ink">{education.location}</dd>
                      </div>
                    </dl>
                    <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-faint">Core CS foundations</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {education.foundations.map((item) => (
                        <li key={item} className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-[13px] text-ink/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <ul className="mt-4 space-y-2.5">
                    {entry.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-mute">
                        <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {entry.link && (
                  <a href={entry.link.href} className="mt-5 inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent">
                    {entry.link.label}
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
