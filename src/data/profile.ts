import type { NavItem } from '../types';

export const profile = {
  name: 'Vansh Bajaj',
  role: 'Backend / Full-Stack Developer',
  subheadline:
    'Final-year Computer Science student focused on backend engineering, scalable APIs, and full-stack applications.',
  email: 'mevanshbajaj@gmail.com',
  location: 'Punjab, India',
  resume: `${import.meta.env.BASE_URL}Vansh-Bajaj-Resume.pdf`,
  resumeFileName: 'Vansh-Bajaj-Resume.pdf',
  githubUsername: import.meta.env?.VITE_GITHUB_USERNAME || 'mevanshbajaj',
  github: 'https://github.com/mevanshbajaj/',
  linkedin: 'https://linkedin.com/in/vanshbajajj/',
  resumeUrl: './Vansh-Bajaj-Resume.pdf',
  achievements: [
    'Solved 400+ LeetCode problems across arrays, strings, trees, graphs and dynamic programming.',
    'Built multiple backend and full-stack applications with Spring Boot, Node.js, Express.js, React and PostgreSQL.',
    'Continuously improving problem-solving and system design skills for software engineering roles.',
  ],
  githubLabel: 'github.com/mevanshbajaj',
  linkedinLabel: 'linkedin.com/in/vanshbajajj',
  /** Phrases for the rotating hero line. All drawn from the projects and resume. */
  buildingPhrases: [
    'REST APIs with Spring Boot and Node.js',
    'authentication and role-based access',
    'full-stack apps with React',
    'layered, maintainable backends',
  ],
  heroStack: ['Java', 'Spring Boot', 'Node.js', 'React', 'PostgreSQL'],
  focusAreas: [
    'Backend development',
    'REST APIs',
    'Databases',
    'Authentication',
    'Scalable systems',
    'Full-stack development',
    'Problem solving',
  ],
};

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'problem-solving', label: 'DSA' },
  { id: 'education', label: 'Journey' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

/** Every section id on the page, in order (used for scroll-spy and the command palette). */
export const sectionIds = [
  'top',
  'about',
  'skills',
  'projects',
  'github',
  'problem-solving',
  'system-design',
  'education',
  'certifications',
  'terminal',
  'assistant',
  'contact',
];
