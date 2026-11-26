import type { TimelineEntry } from '../types';
import { certifications, education } from './education';
import { profile } from './profile';

/**
 * Built only from data already in the portfolio. Internships, hackathons and leadership roles are not
 * listed because none have been provided. Add them here (with real details) when you have them.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'education',
    kind: 'education',
    title: education.institution,
    subtitle: education.degree,
    period: `${education.start} – ${education.end}`,
    points: [`CGPA ${education.cgpa}`, `${education.location}`, `Core CS: ${education.foundations.join(', ')}`],
  },
  {
    id: 'achievements',
    kind: 'achievement',
    title: 'Technical achievements',
    points: profile.achievements,
  },
  {
    id: 'certifications',
    kind: 'certification',
    title: 'Certifications',
    subtitle: `${certifications.length} featured, more in the certificate library`,
    points: certifications.map((c) => c.title),
    link: { label: 'Browse certificates', href: '#certifications' },
  },
];
