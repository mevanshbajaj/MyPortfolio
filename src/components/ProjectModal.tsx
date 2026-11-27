import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '../types';
import ArchitectureExplorer from './ArchitectureExplorer';
import Button from './Button';
import { ArrowUpRightIcon, CloseIcon, GitHubIcon } from './Icons';
import Modal from './Modal';

interface ProjectModalProps {
  project: Project;
  number: string;
  onClose: () => void;
}

const heading = 'font-mono text-xs uppercase tracking-wider text-faint';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h4 className={heading}>{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/90">
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectModal({ project, number, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-${project.id}-title`;
  const { caseStudy } = project;

  return (
    <Modal labelledBy={titleId} onClose={onClose} initialFocus={closeRef} className="max-h-[92svh] max-w-4xl rounded-t-2xl sm:rounded-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-accent">{number}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="uppercase tracking-wider text-faint">{project.category}</span>
          </div>
          <h3 id={titleId} className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-mute">{project.subtitle}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="shrink-0 rounded-md border border-line-strong p-2 text-mute transition-colors hover:bg-surface2 hover:text-ink"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="overflow-y-auto p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <Block title="The problem">
              <p className="text-[15px] leading-relaxed text-mute">{caseStudy.problem}</p>
            </Block>
            <Block title="The solution">
              <p className="text-[15px] leading-relaxed text-mute">{caseStudy.solution}</p>
            </Block>
            <Block title="What I built">
              <Bullets items={project.details} />
            </Block>
          </div>

          <div className="space-y-8">
            <Block title="Tech stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-xs text-mute">
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Key features">
              <ul className="flex flex-wrap gap-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-md border border-accent/30 bg-accent/[0.06] px-2.5 py-1 text-[13px] text-ink">
                    {highlight}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title={`Data layer · ${caseStudy.dataModel.store}`}>
              <ul className="flex flex-wrap gap-2">
                {caseStudy.dataModel.entities.map((entity) => (
                  <li key={entity} className="rounded-md border border-line bg-surface2 px-2.5 py-1 text-[13px] text-ink/90">
                    {entity}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-faint">{caseStudy.dataModel.note}</p>
            </Block>
          </div>
        </div>

        <div className="mt-8">
          <Block title="Architecture · select a component">
            <ArchitectureExplorer nodes={caseStudy.architecture} name={project.name} />
          </Block>
        </div>

        <div className="mt-8">
          <Block title="Engineering decisions">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {caseStudy.decisions.map((decision) => (
                <li key={decision.title} className="rounded-lg border border-line bg-surface2/50 p-4">
                  <p className="text-sm font-medium text-ink">{decision.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-mute">{decision.detail}</p>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-8">
            <Block title="Screenshots">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <li key={shot.src} className="overflow-hidden rounded-lg border border-line">
                    <img src={shot.src} alt={shot.alt} loading="lazy" className="h-auto w-full" />
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            href={project.github}
            external
            variant="primary"
            icon={<GitHubIcon className="h-4 w-4" />}
            ariaLabel={`${project.name} on GitHub (opens in a new tab)`}
          >
            GitHub repository
          </Button>
          {project.demo && (
            <Button href={project.demo} external variant="secondary" ariaLabel={`${project.name} live demo (opens in a new tab)`}>
              Live demo
              <ArrowUpRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
