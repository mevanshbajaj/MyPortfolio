import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Section from './Section';

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const close = useCallback(() => setSelectedIndex(null), []);

  const selected = selectedIndex === null ? null : projects[selectedIndex];

  return (
    <Section
      id="projects"
      eyebrow="03 / projects"
      title="Systems I've built"
      description="Three projects built around real backend concerns: APIs, data models, authentication and access control. Open a card for the details."
    >
      <ul className="space-y-6">
        {projects.map((project, index) => (
          <li key={project.id}>
            <ProjectCard project={project} index={index} onOpen={() => setSelectedIndex(index)} />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <ProjectModal
            key={selected.id}
            project={selected}
            number={String(selectedIndex + 1).padStart(2, '0')}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
