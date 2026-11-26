import type { FlowScenario } from '../components/FlowSimulator';

export interface FlowConfig {
  id: string;
  tab: string;
  title: string;
  concept: string;
  steps: string[];
  scenarios: FlowScenario[];
}

/** Teaching diagrams of common backend patterns. They illustrate concepts; they are not live systems. */
export const flows: FlowConfig[] = [
  {
    id: 'lifecycle',
    tab: 'Request lifecycle',
    title: 'REST request lifecycle',
    concept:
      'A request passes through layers that each do one job: the controller handles HTTP, a filter checks identity, the service applies business rules and the repository talks to the database. A failure stops the request early, so later layers never see bad input. This is the Controller → Service → Repository structure I used in CarCare.',
    steps: ['Controller', 'JWT filter', 'Role check', 'Service', 'Repository'],
    scenarios: [
      {
        id: 'read', tab: 'Read', method: 'GET', path: '/api/doctors', status: '200 OK', tone: 'ok',
        notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Availability rules applied', 'Records fetched'],
        result: 'Authenticated patient gets the doctor list.',
      },
      {
        id: 'book', tab: 'Book', method: 'POST', path: '/api/appointments', status: '201 Created', tone: 'ok',
        notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Slot is free', 'Appointment saved'],
        result: 'Booking succeeds and the slot is taken.',
      },
      {
        id: 'double', tab: 'Double-book', method: 'POST', path: '/api/appointments', status: '409 Conflict', tone: 'bad', failAt: 3,
        notes: ['Route matched', 'Token verified', 'Patient role allowed', 'Slot already booked', 'Not reached'],
        result: 'The service layer rejects the second booking before it reaches the database.',
      },
      {
        id: 'anon', tab: 'No token', method: 'GET', path: '/api/appointments', status: '401 Unauthorized', tone: 'bad', failAt: 1,
        notes: ['Route matched', 'No valid token', 'Not reached', 'Not reached', 'Not reached'],
        result: 'Requests without a valid JWT never reach business logic.',
      },
    ],
  },
  {
    id: 'auth',
    tab: 'Authentication',
    title: 'Login and JWT issuing',
    concept:
      'The server never stores or compares plain-text passwords. It looks the user up, verifies the password against a hash, and issues a signed token that the client sends with later requests. JWT authentication with hashed passwords is what I implemented in StudySmartAI and MediConnect.',
    steps: ['Receive credentials', 'Look up user', 'Verify password hash', 'Sign JWT', 'Respond'],
    scenarios: [
      {
        id: 'ok', tab: 'Valid login', method: 'POST', path: '/api/auth/login', status: '200 OK', tone: 'ok',
        notes: ['Body parsed and validated', 'User record found', 'Hash matches the password', 'Signed token with an expiry', 'Token returned to the client'],
        result: 'The client receives a token and sends it in the Authorization header from now on.',
      },
      {
        id: 'wrong', tab: 'Wrong password', method: 'POST', path: '/api/auth/login', status: '401 Unauthorized', tone: 'bad', failAt: 2,
        notes: ['Body parsed and validated', 'User record found', 'Hash does not match', 'Not reached', 'Not reached'],
        result: 'Rejected before any token exists. Returning the same message for unknown users avoids revealing which accounts exist.',
      },
      {
        id: 'invalid', tab: 'Bad input', method: 'POST', path: '/api/auth/login', status: '400 Bad Request', tone: 'bad', failAt: 0,
        notes: ['Email missing or malformed', 'Not reached', 'Not reached', 'Not reached', 'Not reached'],
        result: 'Malformed requests are refused at the edge, before touching the database.',
      },
    ],
  },
  {
    id: 'errors',
    tab: 'Error handling',
    title: 'Where each error is raised',
    concept:
      'Status codes tell a client what went wrong and who can fix it: 4xx means the request cannot be fulfilled as sent, 5xx means the server failed. Raising each error at the earliest layer that can detect it keeps responses predictable and logic simple.',
    steps: ['Parse request', 'Validate input', 'Authenticate', 'Authorize', 'Business rules', 'Persist'],
    scenarios: [
      {
        id: 'created', tab: '201', method: 'POST', path: '/api/resource', status: '201 Created', tone: 'ok',
        notes: ['JSON parsed', 'Fields valid', 'Token valid', 'Role allowed', 'Rules satisfied', 'Row saved'],
        result: 'Every check passed and the resource was created.',
      },
      {
        id: '400', tab: '400', method: 'POST', path: '/api/resource', status: '400 Bad Request', tone: 'bad', failAt: 1,
        notes: ['JSON parsed', 'Required field missing', 'Not reached', 'Not reached', 'Not reached', 'Not reached'],
        result: 'Invalid input is the client’s fault, reported with a clear message.',
      },
      {
        id: '401', tab: '401', method: 'GET', path: '/api/resource', status: '401 Unauthorized', tone: 'bad', failAt: 2,
        notes: ['Request parsed', 'Input valid', 'Token expired', 'Not reached', 'Not reached', 'Not reached'],
        result: 'Not authenticated: log in again to get a fresh token.',
      },
      {
        id: '403', tab: '403', method: 'GET', path: '/api/admin', status: '403 Forbidden', tone: 'bad', failAt: 3,
        notes: ['Request parsed', 'Input valid', 'Token valid', 'Role not permitted', 'Not reached', 'Not reached'],
        result: 'Authenticated, but this role is not allowed to do that.',
      },
      {
        id: '409', tab: '409', method: 'POST', path: '/api/appointments', status: '409 Conflict', tone: 'bad', failAt: 4,
        notes: ['Request parsed', 'Input valid', 'Token valid', 'Role allowed', 'State conflicts with the request', 'Not reached'],
        result: 'The request is valid but conflicts with current state, such as a slot that is already taken.',
      },
    ],
  },
];
