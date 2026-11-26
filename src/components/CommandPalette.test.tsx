import { describe, expect, it } from 'vitest';
import { matchCommands, type PaletteCommand } from './CommandPalette';

const cmd = (id: string, label: string, keywords = ''): PaletteCommand => ({ id, label, keywords, group: 'Navigate', run: () => undefined });
const commands = [cmd('a', 'Go to Projects'), cmd('b', 'Open GitHub profile'), cmd('c', 'Switch to light theme', 'dark mode')];

describe('matchCommands', () => {
  it('returns everything for an empty query', () => {
    expect(matchCommands(commands, '')).toHaveLength(3);
  });
  it('matches every word against label or keywords', () => {
    expect(matchCommands(commands, 'git prof').map((c) => c.id)).toEqual(['b']);
    expect(matchCommands(commands, 'dark').map((c) => c.id)).toEqual(['c']);
    expect(matchCommands(commands, 'zzz')).toEqual([]);
  });
});
