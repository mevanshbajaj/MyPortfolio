import { motion } from 'framer-motion';
import { education } from '../data/education';
import { EASE } from '../lib/motion';
import Reveal from './Reveal';
import Section from './Section';

export default function Education() {
  return (
    <Section id="education" eyebrow="05 / education" title="Where I'm studying">
      <div className="grid grid-cols-[auto_1fr] gap-4 sm:gap-8">
        <div aria-hidden="true" className="flex flex-col items-center py-2">
          <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
          <motion.span
            className="my-1 w-px flex-1 origin-top bg-gradient-to-b from-accent to-line-strong"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
        </div>

        <Reveal>
          <article className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {education.start} – {education.end}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{education.institution}</h3>
            <p className="mt-1 text-base text-mute">{education.degree}</p>

            <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">CGPA</dt>
                <dd className="mt-1 text-xl font-semibold text-ink">{education.cgpa}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">Period</dt>
                <dd className="mt-1 text-base text-ink">
                  {education.start} – {education.end}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">Location</dt>
                <dd className="mt-1 text-base text-ink">{education.location}</dd>
              </div>
            </dl>

            <h4 className="mt-6 font-mono text-xs uppercase tracking-wider text-faint">Core CS foundations</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.foundations.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-[13px] text-ink/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
