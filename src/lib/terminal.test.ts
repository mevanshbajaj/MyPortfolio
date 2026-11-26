import { describe, expect, it } from 'vitest';
import { completeCommand, runCommand } from './terminal';

describe('runCommand', () => {
  it('lists commands for help', () => {
    const { lines } = runCommand('help');
    expect(lines.join('\n')).toContain('projects');
    expect(lines.join('\n')).toContain('clear');
  });

  it('is case-insensitive and ignores surrounding whitespace', () => {
    expect(runCommand('  HELP ').lines.length).toBeGreaterThan(1);
  });

  it('returns nothing for empty input', () => {
    expect(runCommand('   ').lines).toEqual([]);
  });

  it('prints an error for unknown commands', () => {
    const { lines } = runCommand('sudo rm -rf');
    expect(lines[0]).toContain('command not found: sudo');
  });

  it('lists all three projects and shows details for one', () => {
    const list = runCommand('projects').lines.join('\n');
    expect(list).toContain('carcare');
    expect(list).toContain('mediconnect');
    expect(list).toContain('studysmartai');
    expect(runCommand('projects carcare').lines.join('\n')).toContain('Spring Boot');
    expect(runCommand('projects nope').lines[0]).toContain('No project named');
  });

  it('requests scrolling for "open <section>" and rejects unknown sections', () => {
    expect(runCommand('open projects').action).toEqual({ type: 'scroll', id: 'projects' });
    expect(runCommand('open dsa').action).toEqual({ type: 'scroll', id: 'problem-solving' });
    expect(runCommand('open nowhere').action).toBeUndefined();
    expect(runCommand('open nowhere').lines[0]).toContain('Unknown section');
  });

  it('clear and theme return actions', () => {
    expect(runCommand('clear').action).toEqual({ type: 'clear' });
    expect(runCommand('theme').action).toEqual({ type: 'theme' });
  });

  it('github and resume open links', () => {
    expect(runCommand('github').action?.type).toBe('open');
    expect(runCommand('resume').action?.type).toBe('open');
  });
});

describe('completeCommand', () => {
  it('completes unique prefixes only', () => {
    expect(completeCommand('proj')).toBe('projects');
    expect(completeCommand('c')).toBeNull(); // clear, contact, certifications
    expect(completeCommand('zzz')).toBeNull();
  });
});
