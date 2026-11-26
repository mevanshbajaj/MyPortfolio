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

export interface ArchitectureNode {
  id: string;
  label: string;
  /** One-line role shown on the node. */
  note: string;
  /** Longer explanation shown when the node is selected. */
  detail: string;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  /** Ordered components of the system, rendered as an interactive diagram. */
  architecture: ArchitectureNode[];
  dataModel: { store: string; entities: string[]; note: string };
  decisions: { title: string; detail: string }[];
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

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
  /** Optional deployed URL. The demo button only renders when this is set. */
  demo?: string;
  /** Optional screenshots (files in /public). The gallery only renders when this is set. */
  screenshots?: ProjectScreenshot[];
  caseStudy: ProjectCaseStudy;
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
  issuer?: string;
  /** Link to the certificate (GitHub, from the resume). */
  url: string;
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

export interface CertificateFile {
  name: string;
  title: string;
  url: string;
  /** Topic derived from the certificate title (for filtering). */
  topic: string;
  /** Only set when the certificate title itself names the issuer. */
  issuer?: string;
}

export interface TimelineEntry {
  id: string;
  kind: 'education' | 'achievement' | 'certification';
  title: string;
  subtitle?: string;
  /** Only set when a real date is known. */
  period?: string;
  points: string[];
  link?: { label: string; href: string };
}
