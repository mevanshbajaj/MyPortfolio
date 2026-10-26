import { education, certifications } from '../data/education';
import { leetcode } from '../data/problemSolving';
import { projects } from '../data/projects';
import CountUp from './CountUp';
import Reveal from './Reveal';

const stats = [
  { id: 'leetcode', value: leetcode.solved, suffix: leetcode.suffix, decimals: 0, label: 'LeetCode problems solved' },
  { id: 'projects', value: projects.length, suffix: '', decimals: 0, label: 'Backend & full-stack projects' },
  { id: 'certs', value: certifications.length, suffix: '', decimals: 0, label: 'Certifications earned' },
  { id: 'cgpa', value: Number(education.cgpa), suffix: '', decimals: 2, label: 'CGPA, B.E. Computer Science' },
];

/** A quick-glance band under the hero. Every number is derived from the data files, so it never drifts. */
export default function Stats() {
  return (
    <section aria-label="Highlights" className="border-t border-line/70">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`border-line px-4 py-8 sm:px-8 sm:py-10 md:border-b-0 md:border-r md:first:pl-0 md:last:border-r-0 ${
                  index % 2 === 0 ? 'border-r' : ''
                } ${index < 2 ? 'border-b' : ''}`}
              >
                <dd className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </dd>
                <dt className="mt-2 font-mono text-xs leading-snug text-faint">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
