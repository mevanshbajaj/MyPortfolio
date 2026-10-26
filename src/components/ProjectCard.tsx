import { motion } from 'framer-motion';
import type { Project } from '../types';
import Button from './Button';
import { ArrowRightIcon, GitHubIcon } from './Icons';
import ProjectVisual from './ProjectVisual';
import Reveal from './Reveal';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');

  return (
    <Reveal>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={onOpen}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-200 hover:border-accent/40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="grid lg:grid-cols-2">
          <div className={`flex flex-col p-6 sm:p-8 lg:p-10 ${reversed ? 'lg:order-2' : ''}`}>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-accent">{number}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="uppercase tracking-wider text-faint">{project.category}</span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{project.name}</h3>
            <p className="mt-1 text-sm text-mute">{project.subtitle}</p>

            <p className="mt-5 text-[15px] leading-relaxed text-mute">{project.summary}</p>

            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2" aria-label="Key technical highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink/90">
                  <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-xs text-mute"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <Button variant="secondary" ariaLabel={`View ${project.name} details`} onClick={onOpen}>
                View details
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <span onClick={(event) => event.stopPropagation()}>
                <Button
                  href={project.github}
                  external
                  variant="ghost"
                  icon={<GitHubIcon className="h-4 w-4" />}
                  ariaLabel={`${project.name} on GitHub (opens in a new tab)`}
                >
                  GitHub
                </Button>
              </span>
            </div>
          </div>

          <div
            className={`flex items-center border-t border-line bg-surface2/60 p-6 sm:p-8 lg:border-t-0 ${
              reversed ? 'lg:order-1 lg:border-r' : 'lg:border-l'
            }`}
          >
            <ProjectVisual visual={project.visual} />
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
