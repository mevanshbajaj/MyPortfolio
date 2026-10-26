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
  { id: 'meta', title: 'Meta Full Stack Developer Specialization', area: 'Full-stack development', url: 'https://github.com/mevanshbajaj/Certificates/blob/main/Meta%20Full%20stack.pdf' },
  { id: 'comm', title: 'Effective Communication Specialization', area: 'Communication', url: 'https://github.com/mevanshbajaj/Certificates/blob/main/Effective%20Communication.pdf' },
  { id: 'security', title: 'Foundations of Cybersecurity', area: 'Security fundamentals', url: 'https://github.com/mevanshbajaj/Certificates/blob/main/Certificate%20Cybersecurity%20Essentials.pdf' },
  { id: 'devops', title: 'Certified DevOps Associate', area: 'DevOps', url: 'https://github.com/mevanshbajaj/Certificates/blob/main/Devops%20cloudtrain.pdf' },
  { id: 'python', title: 'Introduction to Python', area: 'Programming', url: 'https://github.com/mevanshbajaj/Certificates/blob/main/Python.pdf' },
];
