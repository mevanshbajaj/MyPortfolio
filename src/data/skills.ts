import type { SkillCategory } from '../types';

/** Every skill below already appears in the resume or in one of the projects. */
export const skillCategories: SkillCategory[] = [
  { id: 'languages', title: 'Programming Languages', items: ['Java', 'JavaScript', 'HTML', 'CSS'] },
  {
    id: 'frontend',
    title: 'Frontend Development',
    items: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    note: 'Used in StudySmartAI and MediConnect.',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    items: ['Node.js', 'REST APIs', 'JWT Authentication', 'Role-Based Access Control'],
    note: 'JWT and role-based access in MediConnect and StudySmartAI.',
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
    note: 'PostgreSQL in CarCare, MongoDB in StudySmartAI and MediConnect.',
  },
  {
    id: 'frameworks',
    title: 'Frameworks and Libraries',
    items: ['Spring Boot', 'Express.js', 'React', 'FastAPI', 'LangChain', 'Hugging Face'],
    note: 'Spring Boot in CarCare, Express in MediConnect, FastAPI in StudySmartAI.',
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'Maven', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    id: 'core',
    title: 'Core Computer Science',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
  {
    id: 'devops',
    title: 'Cloud and DevOps',
    items: ['AWS (EC2, S3)', 'Docker', 'Jenkins', 'CI/CD', 'Linux', 'Nagios'],
  },
  {
    id: 'ai',
    title: 'AI and Machine Learning',
    items: ['RAG', 'LangChain', 'Hugging Face', 'Vector Databases', 'Prompt Engineering', 'Gemini API'],
  },
];
