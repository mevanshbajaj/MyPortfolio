import { profile } from '../data/profile';
import Reveal from './Reveal';
import Section from './Section';
import SkillIcon from './SkillIcon';

const principles: { title: string; body: string; icon: string }[] = [
  {
    title: 'Backend focus',
    icon: 'backend',
    body: 'I am happiest on the parts of an application users never see: the APIs, the data model and the auth flow.',
  },
  {
    title: 'Engineering philosophy',
    icon: 'core',
    body: 'Clean boundaries between controllers, services and repositories make a system easier to test, debug and grow.',
  },
  {
    title: 'Problem-solving mindset',
    icon: 'languages',
    body: 'I reason about data structures and complexity before writing code, and keep it sharp with 400+ LeetCode problems.',
  },
  {
    title: 'Where I am headed',
    icon: 'frameworks',
    body: 'A backend engineering internship where I can contribute to real, scalable systems and keep learning from them.',
  },
];

const facts: { term: string; value: string }[] = [
  { term: 'Focus', value: 'Backend engineering and APIs' },
  { term: 'Studying', value: 'B.E. Computer Science, Chitkara University' },
  { term: 'Core stack', value: 'Java · Spring Boot · Node.js · PostgreSQL' },
  { term: 'Looking for', value: 'Backend Engineer Internship' },
];

export default function About() {
  return (
    <Section id="about" eyebrow="01 / about" title="Backend first, full-stack when it counts">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-[1.75] text-mute sm:text-[17px]">
          <p>
            I'm a final-year Computer Science student at Chitkara University, and I'm happiest working on the parts of
            an application users never see: the APIs, the data model, the auth flow, and the structure that keeps it all
            maintainable.
          </p>
          <p>
            I've built full-stack applications with <span className="text-ink">Java and Spring Boot</span>,{' '}
            <span className="text-ink">Node.js and Express</span>, and <span className="text-ink">React</span>, backed by
            PostgreSQL and MongoDB. Along the way I've worked on JWT authentication, role-based access control and
            layered architectures of controllers, services and repositories, because clean boundaries make a system
            easier to test, debug and grow.
          </p>
          <p>
            I like problem solving at both ends of the stack. I've solved 400+ LeetCode problems to keep my fundamentals
            sharp, and I enjoy debugging production-level issues where reliability and performance are on the line. Right
            now I'm looking for a backend engineering internship where I can contribute to real, scalable systems.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="spotlight rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-faint">At a glance</h3>
            <dl className="mt-3 divide-y divide-line">
              {facts.map((fact) => (
                <div key={fact.term} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3 text-sm">
                  <dt className="text-faint">{fact.term}</dt>
                  <dd className="text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-5 font-mono text-xs uppercase tracking-wider text-faint">Focus areas</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-md border border-line bg-surface2 px-2.5 py-1 text-[13px] text-ink/90"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <div className="spotlight h-full rounded-xl border border-line bg-surface p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-surface2 text-accent">
                  <SkillIcon id={item.icon} className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{item.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h3 className="text-base font-semibold text-ink">Achievements</h3>
          <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {profile.achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-3 text-sm leading-relaxed text-mute">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
