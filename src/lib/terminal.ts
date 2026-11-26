import { certifications, education } from '../data/education';
import { codingPlatforms, leetcode } from '../data/problemSolving';
import { profile, sectionIds } from '../data/profile';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';

export type TerminalAction =
  | { type: 'scroll'; id: string }
  | { type: 'open'; url: string }
  | { type: 'theme' }
  | { type: 'clear' };

export interface CommandResult {
  lines: string[];
  action?: TerminalAction;
}

export const COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'education',
  'certifications',
  'github',
  'leetcode',
  'contact',
  'resume',
  'open',
  'theme',
  'clear',
] as const;

const helpLines = [
  'Available commands:',
  '  help             show this list',
  '  about            who I am',
  '  projects [name]  list projects, or details for one',
  '  skills           technologies by category',
  '  education        degree and CGPA',
  '  certifications   featured certificates',
  '  github           GitHub profile',
  '  leetcode         problem-solving profile',
  '  contact          how to reach me',
  '  resume           download my resume',
  '  open <section>   scroll to a section (e.g. open projects)',
  '  theme            toggle light / dark',
  '  clear            clear the terminal',
];

const navigable = sectionIds.filter((id) => id !== 'top' && id !== 'assistant');

function projectLines(name: string): string[] {
  const query = name.toLowerCase();
  const project = projects.find((p) => p.id === query || p.name.toLowerCase() === query);
  if (!project) return [`No project named "${name}". Try: ${projects.map((p) => p.id).join(', ')}`];
  return [
    `${project.name} — ${project.subtitle}`,
    project.summary,
    `Stack: ${project.stack.join(', ')}`,
    `Repo:  ${project.github}`,
  ];
}

/** Pure command interpreter: returns text to print and an optional side effect for the UI to perform. */
export function runCommand(input: string): CommandResult {
  const [rawCommand = '', ...args] = input.trim().split(/\s+/);
  const command = rawCommand.toLowerCase();
  const arg = args.join(' ');

  switch (command) {
    case '':
      return { lines: [] };
    case 'help':
    case '?':
      return { lines: helpLines };
    case 'about':
      return {
        lines: [
          `${profile.name} — ${profile.role}`,
          profile.subheadline,
          `Based in ${profile.location}. Looking for a Backend Engineer internship.`,
        ],
      };
    case 'projects':
      return arg
        ? { lines: projectLines(arg) }
        : {
            lines: [
              ...projects.map((p) => `  ${p.id.padEnd(14)} ${p.subtitle}`),
              'Run "projects <name>" for details, or "open projects" to jump to the section.',
            ],
          };
    case 'skills':
      return { lines: skillCategories.map((c) => `  ${c.title.padEnd(26)} ${c.items.join(', ')}`) };
    case 'education':
      return {
        lines: [
          `${education.degree}`,
          `${education.institution}, ${education.location}`,
          `${education.start} – ${education.end} · CGPA ${education.cgpa}`,
        ],
      };
    case 'certifications':
    case 'certificates':
      return {
        lines: [...certifications.map((c) => `  ${c.title}`), 'Run "open certifications" to see the full library.'],
      };
    case 'github':
      return { lines: [profile.github, 'Run "open github" to see live activity.'], action: { type: 'open', url: profile.github } };
    case 'leetcode':
      return {
        lines: [
          `${leetcode.solved}${leetcode.suffix} problems solved · @${leetcode.username}`,
          ...codingPlatforms.filter((p) => p.id === 'leetcode').map((p) => p.url),
        ],
        action: { type: 'open', url: leetcode.url },
      };
    case 'contact':
      return {
        lines: [`Email:    ${profile.email}`, `LinkedIn: ${profile.linkedin}`, `GitHub:   ${profile.github}`],
      };
    case 'resume':
      return { lines: ['Downloading resume…'], action: { type: 'open', url: profile.resumeUrl } };
    case 'theme':
      return { lines: ['Theme toggled.'], action: { type: 'theme' } };
    case 'clear':
      return { lines: [], action: { type: 'clear' } };
    case 'open':
    case 'goto': {
      const alias: Record<string, string> = { dsa: 'problem-solving', certificates: 'certifications', journey: 'education', systems: 'system-design' };
      const id = alias[arg.toLowerCase()] ?? arg.toLowerCase();
      if (navigable.includes(id)) return { lines: [`Scrolling to ${id}…`], action: { type: 'scroll', id } };
      return { lines: [`Unknown section "${arg}". Try: ${navigable.join(', ')}`] };
    }
    default:
      return { lines: [`command not found: ${command}. Type "help" to see what is available.`] };
  }
}

/** Tab-completion: returns the single matching command for a prefix, otherwise null. */
export function completeCommand(prefix: string): string | null {
  const p = prefix.trim().toLowerCase();
  if (!p || p.includes(' ')) return null;
  const matches = COMMANDS.filter((c) => c.startsWith(p));
  return matches.length === 1 ? matches[0] : null;
}
