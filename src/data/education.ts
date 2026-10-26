import type { Certification, EducationEntry } from '../types';

export const education: EducationEntry = {
  institution: 'Chitkara University',
  degree: 'Bachelor of Engineering in Computer Science',
  start: 'Aug 2023',
  end: 'Present',
  cgpa: '7.90',
  location: 'Punjab, India',
  foundations: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
};

export const certifications: Certification[] = [
  { id: 'meta', title: 'Meta Full Stack Developer Specialization', area: 'Full-stack development' },
  { id: 'comm', title: 'Effective Communication Specialization', area: 'Communication' },
  { id: 'security', title: 'Foundations of Cybersecurity', area: 'Security fundamentals' },
  { id: 'devops', title: 'Certified DevOps Associate', area: 'DevOps' },
  { id: 'python', title: 'Introduction to Python', area: 'Programming' },
];
