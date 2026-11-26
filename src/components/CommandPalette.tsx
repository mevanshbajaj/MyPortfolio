import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { navItems, profile } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { scrollToSection } from '../lib/scroll';
import { CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SearchIcon, SunIcon, TerminalIcon } from './Icons';
import Modal from './Modal';
import { leetcode } from '../data/problemSolving';

export interface PaletteCommand {
  id: string;
  label: string;
  group: 'Navigate' | 'Links' | 'Actions';
  keywords?: string;
  icon?: React.ReactNode;
  run: () => void;
}

/** Fuzzy-ish match: every query word must appear in the label or keywords. */
export function matchCommands(commands: PaletteCommand[], query: string): PaletteCommand[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return commands;
  return commands.filter((c) => {
    const haystack = `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}

function download(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.click();
}

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<PaletteCommand[]>(() => {
    const go = (id: string) => () => {
      onClose();
      // wait for the modal to release scroll lock
      window.setTimeout(() => scrollToSection(id), 60);
    };
    const open = (url: string) => () => {
      onClose();
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    return [
      ...navItems.map<PaletteCommand>((n) => ({ id: `nav-${n.id}`, label: `Go to ${n.label}`, group: 'Navigate', run: go(n.id) })),
      { id: 'nav-system', label: 'Go to System design', group: 'Navigate', keywords: 'architecture api cache auth', run: go('system-design') },
      { id: 'nav-terminal', label: 'Go to Terminal', group: 'Navigate', icon: <TerminalIcon />, keywords: 'command line shell', run: go('terminal') },
      { id: 'github', label: 'Open GitHub profile', group: 'Links', icon: <GitHubIcon className="h-4 w-4" />, run: open(profile.github) },
      { id: 'linkedin', label: 'Open LinkedIn profile', group: 'Links', icon: <LinkedInIcon className="h-4 w-4" />, run: open(profile.linkedin) },
      { id: 'leetcode', label: 'Open LeetCode profile', group: 'Links', run: open(leetcode.url) },
      { id: 'email', label: 'Send an email', group: 'Links', icon: <MailIcon className="h-4 w-4" />, run: () => { onClose(); window.location.href = `mailto:${profile.email}`; } },
      { id: 'resume', label: 'Download resume', group: 'Actions', icon: <DownloadIcon />, run: () => { onClose(); download(profile.resumeUrl); } },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: <CopyIcon />,
        run: () => {
          void navigator.clipboard?.writeText(profile.email).catch(() => undefined);
          onClose();
        },
      },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        group: 'Actions',
        icon: theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />,
        keywords: 'dark light mode appearance',
        run: () => { toggle(); onClose(); },
      },
    ];
  }, [onClose, theme, toggle]);

  const results = useMemo(() => matchCommands(commands, query), [commands, query]);
  const safeIndex = Math.min(index, Math.max(results.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [safeIndex, results]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIndex((safeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIndex((safeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      results[safeIndex]?.run();
    }
  };

  return (
    <Modal labelledBy="palette-title" onClose={onClose} placement="top" initialFocus={inputRef} className="max-w-xl rounded-2xl">
      <h2 id="palette-title" className="sr-only">
        Command palette
      </h2>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <SearchIcon className="h-4 w-4 text-faint" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[safeIndex] ? `palette-${results[safeIndex].id}` : undefined}
          aria-label="Search commands"
          placeholder="Search sections, links and actions…"
          className="h-12 flex-1 bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
        />
        <kbd className="hidden rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">esc</kbd>
      </div>
      <ul ref={listRef} id="palette-list" role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">No matching commands.</li>}
        {results.map((cmd, i) => (
          <li
            key={cmd.id}
            id={`palette-${cmd.id}`}
            role="option"
            aria-selected={i === safeIndex}
            onMouseMove={() => setIndex(i)}
            onClick={cmd.run}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${i === safeIndex ? 'bg-accent/10 text-ink' : 'text-mute'}`}
          >
            <span className="flex h-5 w-5 items-center justify-center text-accent">{cmd.icon ?? <span aria-hidden="true">→</span>}</span>
            <span className="flex-1">{cmd.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{cmd.group}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
