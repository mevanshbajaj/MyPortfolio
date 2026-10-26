import { useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import { leetcode, topics } from '../data/problemSolving';
import Button from './Button';
import CountUp from './CountUp';
import { ArrowUpRightIcon, CodeIcon } from './Icons';
import ProblemViz from './ProblemViz';
import Reveal from './Reveal';
import Section from './Section';

/** 20 x 20 grid, one cell per solved problem, lighting up in a diagonal wave. */
function SolvedGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cells = useMemo(() => Array.from({ length: 400 }, (_, i) => i), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px] sm:gap-1"
    >
      {cells.map((i) => (
        <span
          key={i}
          className={`aspect-square rounded-[2px] bg-accent ${inView ? 'solved-cell' : 'opacity-[0.12]'}`}
          style={inView ? { animationDelay: `${((i % 20) + Math.floor(i / 20)) * 22}ms` } : undefined}
        />
      ))}
    </div>
  );
}

function topicSpan(index: number): string {
  if (index === 4) return 'col-span-2 md:col-span-3 lg:col-span-1';
  if (index === 3) return 'md:col-span-3 lg:col-span-1';
  return 'md:col-span-2 lg:col-span-1';
}

export default function ProblemSolving() {
  return (
    <Section
      id="problem-solving"
      eyebrow="04 / problem solving"
      title="Engineering fundamentals"
      description="Backend work rewards clear thinking about data, edge cases and complexity. This is where I practise it."
    >
      <Reveal>
        <div className="grid items-center gap-10 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-faint">{leetcode.label}</p>
            <p className="mt-3 text-7xl font-semibold leading-none tracking-tight text-ink sm:text-8xl">
              <CountUp to={leetcode.solved} suffix={leetcode.suffix} />
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
              Solved across arrays, strings, trees, graphs and dynamic programming. Working through them builds the
              habit of reasoning about data structures and complexity before writing code.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-faint">
              I'm continuing to improve my problem-solving and system design skills for software engineering roles.
            </p>
            <div className="mt-7">
              <Button
                href={leetcode.url}
                external
                variant="secondary"
                icon={<CodeIcon className="h-4 w-4" />}
                ariaLabel={`LeetCode profile ${leetcode.username} (opens in a new tab)`}
              >
                View LeetCode profile
                <ArrowUpRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="w-full max-w-sm justify-self-start lg:justify-self-end">
            <SolvedGrid />
            <p className="mt-3 font-mono text-[11px] text-faint">1 cell = 1 problem solved · 400 and counting</p>
          </div>
        </div>
      </Reveal>

      <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-5">
        {topics.map((topic, index) => (
          <li key={topic.id} className={topicSpan(index)}>
            <Reveal delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <div className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-strong sm:p-5">
                <ProblemViz id={topic.id} />
                <h3 className="mt-4 text-[15px] font-medium text-ink">{topic.label}</h3>
                <p className="mt-1 text-[13px] leading-snug text-faint">{topic.blurb}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
