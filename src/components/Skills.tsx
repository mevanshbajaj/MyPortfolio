import { skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';
import Reveal from './Reveal';
import Section from './Section';
import SkillIcon from './SkillIcon';

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <div className="spotlight group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/0 blur-2xl transition-colors duration-300 group-hover:bg-accent/10"
      />
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-mute">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface2 text-accent">
            <SkillIcon id={category.id} />
          </span>
          {category.title}
        </h3>
        <span aria-hidden="true" className="font-mono text-[11px] text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <ul className="relative mt-4 flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
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
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <li key={category.id}>
            <Reveal delay={Math.min(index * 0.04, 0.2)} className="h-full">
              <SkillCard category={category} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
