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
    caseStudy: {
      problem:
        'Learners already have documents (notes, papers, course material) but not material tailored to them. The goal was a platform that works from what a user uploads and turns it into personalized study content and interview practice.',
      solution:
        'A React frontend talks to a FastAPI backend. Uploaded PDF and DOCX files are text-extracted and stored in Cloudinary, the Gemini API generates learning content and practice questions from them, and MongoDB keeps users, documents, sessions and progress.',
      architecture: [
        { id: 'client', label: 'React client', note: 'Study and practice UI', detail: 'The React frontend with protected routes. Users register, verify their email, upload documents and work through generated study material and interview practice.' },
        { id: 'api', label: 'FastAPI backend', note: 'REST APIs · JWT', detail: 'RESTful APIs for users, documents, learning sessions and progress. JWT-based authentication protects routes, passwords are hashed, and email verification and password reset flows are implemented.' },
        { id: 'docs', label: 'Document pipeline', note: 'PDF / DOCX · Cloudinary', detail: 'Uploaded documents are stored with Cloudinary and their text is extracted from PDF and DOCX files so it can be used as input for generation.' },
        { id: 'ai', label: 'Gemini API', note: 'Content generation', detail: 'The Gemini API generates personalized learning content and practice questions from the extracted document text.' },
        { id: 'db', label: 'MongoDB', note: 'Users · sessions · progress', detail: 'Stores users, documents, learning sessions and progress so a learner can come back to their work.' },
      ],
      dataModel: {
        store: 'MongoDB',
        entities: ['Users', 'Documents', 'Learning sessions', 'Progress'],
        note: 'Entities as described in the project; the repository has the full schema.',
      },
      decisions: [
        { title: 'JWT-protected routes', detail: 'Authentication is token-based, with protected routes on both the API and the client.' },
        { title: 'Account safety', detail: 'Secure password hashing, plus email verification and password-reset workflows.' },
        { title: 'Managed document storage', detail: 'Documents are stored with Cloudinary rather than on the API server.' },
        { title: 'Extract first, then generate', detail: 'PDF and DOCX text is extracted before it is passed to Gemini to generate study content and questions.' },
      ],
    },
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
    caseStudy: {
      problem:
        'Vehicle owners need one place for vehicle records, service history and upcoming maintenance. The goal was a backend that models this cleanly and exposes it through a predictable API.',
      solution:
        'A Java and Spring Boot backend organised as Controllers, Services and Repositories, exposing CRUD operations through RESTful APIs and persisting vehicles, service history and maintenance tracking in PostgreSQL.',
      architecture: [
        { id: 'client', label: 'API client', note: 'Postman', detail: 'The REST APIs were exercised and their workflows validated with Postman.' },
        { id: 'controller', label: 'Controller', note: 'REST endpoints', detail: 'Receives HTTP requests, exposes the CRUD operations and hands the work to the service layer.' },
        { id: 'service', label: 'Service', note: 'Business logic', detail: 'Holds the business rules so they are separate from HTTP handling and from data access.' },
        { id: 'repository', label: 'Repository', note: 'Data access', detail: 'Owns data access to PostgreSQL, keeping persistence details out of the service layer.' },
        { id: 'db', label: 'PostgreSQL', note: 'Relational storage', detail: 'Stores vehicle records, service history and maintenance tracking data.' },
      ],
      dataModel: {
        store: 'PostgreSQL',
        entities: ['Vehicle records', 'Service history', 'Maintenance tracking'],
        note: 'Entities as described in the project; the repository has the full schema.',
      },
      decisions: [
        { title: 'Layered architecture', detail: 'Controllers, Services and Repositories keep responsibilities separate and the code easy to follow.' },
        { title: 'Relational storage', detail: 'PostgreSQL holds vehicle records, service history and maintenance data.' },
        { title: 'Verify through the API', detail: 'APIs tested with Postman and backend workflows validated to improve reliability.' },
      ],
    },
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
    caseStudy: {
      problem:
        'Booking a doctor involves two different users with different permissions, and a slot must never be given to two patients. The goal was a platform with separate doctor and patient experiences and safe scheduling.',
      solution:
        'A React frontend with separate patient and doctor dashboards on top of a Node.js and Express REST API. JWT authentication and role-based authorization control access, and scheduling logic manages availability and guards against double bookings. Data lives in MongoDB.',
      architecture: [
        { id: 'patient', label: 'Patient dashboard', note: 'Find · book · manage', detail: 'Patients discover doctors, book and manage appointments, and see prescriptions.' },
        { id: 'doctor', label: 'Doctor dashboard', note: 'Availability · appointments', detail: 'Doctors manage their availability and appointments and handle prescription workflows.' },
        { id: 'api', label: 'Express REST API', note: 'JWT · roles', detail: 'RESTful APIs for doctor discovery, appointment booking, appointment management and prescriptions. JWT authentication and role-based authorization decide who can do what.' },
        { id: 'scheduling', label: 'Scheduling logic', note: 'Availability · conflicts', detail: 'Appointment scheduling and doctor availability management, with safeguards against double bookings.' },
        { id: 'db', label: 'MongoDB', note: 'Appointments · availability', detail: 'Stores appointments, doctor availability and prescriptions.' },
      ],
      dataModel: {
        store: 'MongoDB',
        entities: ['Appointments', 'Doctor availability', 'Prescriptions'],
        note: 'Entities as described in the project; the repository has the full schema.',
      },
      decisions: [
        { title: 'Role-based authorization', detail: 'Doctors and patients have separate dashboards and permissions, enforced by the API.' },
        { title: 'Token-based authentication', detail: 'JWT-based authentication for secure access control.' },
        { title: 'Double-booking safeguards', detail: 'Scheduling logic is built so the same slot cannot be booked twice.' },
      ],
    },
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
