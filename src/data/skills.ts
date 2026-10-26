import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['Java', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
    note: 'Spring Boot in CarCare, Node and Express in MediConnect.',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React.js'],
    note: 'Used in StudySmartAI and MediConnect.',
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
    note: 'PostgreSQL in CarCare, MongoDB in StudySmartAI and MediConnect.',
  },
  {
    id: 'devops',
    title: 'DevOps / Cloud',
    items: ['AWS (EC2, S3)', 'Docker', 'Jenkins', 'CI/CD', 'Linux', 'Nagios'],
  },
  {
    id: 'ai',
    title: 'AI / LLM',
    items: ['RAG', 'LangChain', 'Hugging Face', 'Vector Databases', 'Prompt Engineering'],
  },
  {
    id: 'core',
    title: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'Maven', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
];
