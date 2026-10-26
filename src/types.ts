export interface NavItem {
  id: string;
  label: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
  /** Optional line describing where the skills were used (only facts from the resume). */
  note?: string;
}

export interface VisualNode {
  label: string;
  note: string;
}

/** Small architecture sketch shown next to each project. */
export type ProjectVisual =
  | { kind: 'pipeline'; title: string; steps: VisualNode[]; footer: string }
  | { kind: 'layers'; title: string; layers: VisualNode[]; footer: string }
  | {
      kind: 'roles';
      title: string;
      clients: [VisualNode, VisualNode];
      api: VisualNode;
      store: VisualNode;
      footer: string;
    };

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  /** Short technical highlights shown on the card. */
  highlights: string[];
  /** Longer descriptions shown in the detail modal. */
  details: string[];
  stack: string[];
  github: string;
  visual: ProjectVisual;
}

export interface Topic {
  id: string;
  label: string;
  blurb: string;
}

export interface Certification {
  id: string;
  title: string;
  area: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  start: string;
  end: string;
  cgpa: string;
  location: string;
  foundations: string[];
}
