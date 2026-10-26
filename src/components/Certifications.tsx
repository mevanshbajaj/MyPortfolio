import { certifications } from '../data/education';
import { AwardIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

function certSpan(index: number): string {
  if (index === 4) return 'md:col-span-2 lg:col-span-3';
  if (index === 3) return 'lg:col-span-3';
  return 'lg:col-span-2';
}

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="06 / certifications" title="Certifications">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {certifications.map((cert, index) => (
          <li key={cert.id} className={certSpan(index)}>
            <Reveal delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <div className="group flex h-full items-start gap-4 rounded-xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface2 text-accent">
                  <AwardIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium leading-snug text-ink">{cert.title}</h3>
                  <p className="mt-1.5 font-mono text-xs text-faint">{cert.area}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
