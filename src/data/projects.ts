import type { Project } from '../types';

/** Repository links are taken from the hyperlinks in the resume PDF. */
export const projects: Project[] = [
  {
    id: 'studysmartai',
    name: 'StudySmartAI',
    subtitle: 'AI-Powered Learning Platform',
    category: 'Full-stack · AI',
    summary:
      'A full-stack learning platform that turns uploaded documents into personalized study material and interview practice, powered by the Gemini API.',
    highlights: [
      'FastAPI backend',
      'MongoDB data layer',
      'JWT authentication',
      'Gemini integration',
      'PDF / DOCX extraction',
      'Cloudinary storage',
      'Personalized learning',
    ],
    details: [
      'Built a full-stack, AI-powered learning platform with React and FastAPI for document-based personalized study and interview preparation.',
      'Designed RESTful APIs on FastAPI and MongoDB to manage users, documents, learning sessions and progress.',
      'Implemented JWT-based authentication with protected routes, secure password hashing, and email verification and password reset workflows.',
      'Integrated the Gemini API to generate learning content and practice questions, with PDF/DOCX text extraction and Cloudinary-based document storage.',
    ],
    stack: ['React', 'FastAPI', 'MongoDB', 'Gemini AI'],
    github: 'https://github.com/mevanshbajaj/StudySmart-AI',
    visual: {
      kind: 'pipeline',
      title: 'document → practice flow',
      steps: [
        { label: 'Upload document', note: 'Stored with Cloudinary' },
        { label: 'Extract text', note: 'PDF and DOCX parsing' },
        { label: 'Generate with Gemini', note: 'Learning content and questions' },
        { label: 'Study and track progress', note: 'Sessions saved in MongoDB' },
      ],
      footer: 'FastAPI · JWT-protected routes',
    },
  },
  {
    id: 'carcare',
    name: 'CarCare',
    subtitle: 'Vehicle Maintenance System',
    category: 'Backend',
    summary:
      'A backend-driven vehicle maintenance system covering vehicle records, service history and maintenance tracking behind a clean, layered REST API.',
    highlights: [
      'Spring Boot',
      'Layered architecture',
      'RESTful APIs',
      'PostgreSQL',
      'CRUD operations',
      'Postman testing',
    ],
    details: [
      'Built a backend-driven vehicle maintenance management system in Java and Spring Boot, with CRUD operations exposed through RESTful APIs.',
      'Structured the codebase as a layered architecture of Controllers, Services and Repositories to keep responsibilities separate and the code easy to follow.',
      'Used PostgreSQL to store vehicle records, service history and maintenance tracking data.',
      'Tested the REST APIs with Postman and validated backend workflows to improve reliability.',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL'],
    github: 'https://github.com/mevanshbajaj/CarCare',
    visual: {
      kind: 'layers',
      title: 'layered backend',
      layers: [
        { label: 'Controller', note: 'REST endpoints' },
        { label: 'Service', note: 'Business logic' },
        { label: 'Repository', note: 'Data access' },
        { label: 'PostgreSQL', note: 'Vehicles · service history · maintenance' },
      ],
      footer: 'Java · Spring Boot · verified with Postman',
    },
  },
  {
    id: 'mediconnect',
    name: 'MediConnect',
    subtitle: 'Healthcare Appointment System',
    category: 'Full-stack',
    summary:
      'A healthcare appointment platform with separate doctor and patient dashboards, role-based access, and booking logic that prevents double bookings.',
    highlights: [
      'React frontend',
      'Node / Express API',
      'MongoDB',
      'JWT authentication',
      'Role-based authorization',
      'Appointment scheduling',
      'Double-booking prevention',
    ],
    details: [
      'Built a full-stack healthcare appointment platform with separate dashboards for doctors and patients.',
      'Implemented JWT-based authentication and role-based authorization for secure access control.',
      'Designed RESTful APIs for doctor discovery, appointment booking, appointment management and prescription workflows.',
      'Built appointment scheduling and doctor availability management, with safeguards against double bookings.',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/mevanshbajaj/mediconnect',
    visual: {
      kind: 'roles',
      title: 'role-based access',
      clients: [
        { label: 'Patient', note: 'Dashboard' },
        { label: 'Doctor', note: 'Dashboard' },
      ],
      api: { label: 'Express REST API', note: 'JWT auth · role-based authorization' },
      store: { label: 'MongoDB', note: 'Appointments · availability · prescriptions' },
      footer: 'React · Node.js · double-booking safeguards',
    },
  },
];
