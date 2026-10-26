import { skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';
import Reveal from './Reveal';
import Section from './Section';

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-wider text-mute">{category.title}</h3>
        <span aria-hidden="true" className="font-mono text-[11px] text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
        {category.items.map((item) => (
          <li
            key={item}
            className="cursor-default rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-[13px] text-ink/90 transition duration-150 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
          >
            {item}
          </li>
        ))}
      </ul>

      {category.note && <p className="mt-auto pt-4 text-[13px] leading-relaxed text-faint">{category.note}</p>}
    </div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 / skills"
      title="The toolkit"
      description="Technologies I've used across backend, full-stack and cloud work, grouped by what they're for."
    >
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skillCategories.map((category, index) => (
          <li key={category.id} className={index < 6 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Reveal delay={Math.min(index * 0.04, 0.2)} className="h-full">
              <SkillCard category={category} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
