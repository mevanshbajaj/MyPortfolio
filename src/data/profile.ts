import type { NavItem } from '../types';

export const profile = {
  name: 'Vansh Bajaj',
  role: 'Backend / Full-Stack Developer',
  subheadline:
    'Final-year Computer Science student focused on backend engineering, scalable APIs, and full-stack applications.',
  email: 'mevanshbajaj@gmail.com',
  github: 'https://github.com/mevanshbajaj/',
  linkedin: 'https://linkedin.com/in/vanshbajajj/',
  githubLabel: 'github.com/mevanshbajaj',
  linkedinLabel: 'linkedin.com/in/vanshbajajj',
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
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

/** Every section id on the page, in order (used for scroll-spy). */
export const sectionIds = [
  'top',
  'about',
  'skills',
  'projects',
  'problem-solving',
  'education',
  'certifications',
  'contact',
];
