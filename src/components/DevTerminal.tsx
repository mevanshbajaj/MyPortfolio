import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { completeCommand, runCommand, type TerminalAction } from '../lib/terminal';
import { scrollToSection } from '../lib/scroll';
import Reveal from './Reveal';
import Section from './Section';

interface Entry {
  id: number;
  input: string;
  text: string;
}

const WELCOME: Entry = { id: 0, input: '', text: 'Welcome. Type "help" to see what you can run, or try a suggestion below.' };
const SUGGESTIONS = ['help', 'about', 'projects', 'skills', 'contact'];
const CHARS_PER_TICK = 4;
const TICK_MS = 14;
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_PATTERN).map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function DevTerminal() {
  const reduced = useReducedMotion();
  const { toggle: toggleTheme } = useTheme();
  const [entries, setEntries] = useState<Entry[]>([WELCOME]);
  const [revealed, setRevealed] = useState(WELCOME.text.length);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1); // index into history while navigating with arrows
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const latest = entries[entries.length - 1];
  const typing = revealed < latest.text.length;

  // Typing effect for the newest output.
  useEffect(() => {
    if (!typing) return;
    const timer = window.setInterval(() => setRevealed((r) => Math.min(r + CHARS_PER_TICK, latest.text.length)), TICK_MS);
    return () => window.clearInterval(timer);
  }, [typing, latest.text.length]);

  // Keep the newest line in view (inside the terminal only, never scrolling the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, revealed]);

  const perform = useCallback(
    (action: TerminalAction) => {
      switch (action.type) {
        case 'clear':
          setEntries([]);
          setRevealed(0);
          break;
        case 'scroll':
          scrollToSection(action.id);
          break;
        case 'theme':
          toggleTheme();
          break;
        case 'open':
          if (/\.pdf$/i.test(action.url)) {
            const a = document.createElement('a');
            a.href = action.url;
            a.download = '';
            a.click();
          } else {
            window.open(action.url, '_blank', 'noopener,noreferrer');
          }
          break;
      }
    },
    [toggleTheme],
  );

  const submit = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;
      const result = runCommand(input);
      setHistory((h) => (h[0] === input ? h : [input, ...h].slice(0, 50)));
      setCursor(-1);
      if (result.action?.type === 'clear') {
        perform(result.action);
        return;
      }
      const text = result.lines.join('\n');
      const entry: Entry = { id: nextId.current++, input, text };
      setEntries((list) => [...list, entry]);
      setRevealed(reduced ? text.length : 0);
      if (result.action) perform(result.action);
    },
    [perform, reduced],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit(value);
      setValue('');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : '');
    } else if (event.key === 'Tab') {
      const completed = completeCommand(value);
      if (completed) {
        event.preventDefault();
        setValue(completed);
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
      setRevealed(0);
    } else if (event.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <Section
      id="terminal"
      eyebrow="09 / terminal"
      title="Explore from the command line"
      description="A working terminal for this site. Try help, projects, skills or open github. Use ↑ / ↓ for history and Tab to complete."
    >
      <Reveal>
        <div
          className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b border-line bg-surface2/70 px-4 py-2.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="ml-2 font-mono text-xs text-faint">vansh@portfolio ~ </span>
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
            className="h-72 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-mute sm:h-80 sm:px-5"
          >
            {entries.map((entry, i) => {
              const isLatest = i === entries.length - 1;
              const text = isLatest ? entry.text.slice(0, revealed) : entry.text;
              return (
                <div key={entry.id} className="mb-3">
                  {entry.input && (
                    <p className="text-ink">
                      <span className="text-accent">$ </span>
                      {entry.input}
                    </p>
                  )}
                  {text && (
                    <pre className="whitespace-pre-wrap break-words font-mono">
                      <Linkified text={text} />
                    </pre>
                  )}
                </div>
              );
            })}
          </div>

          <form
            className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-[13px] sm:px-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="terminal-input" className="text-accent">
              $
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal command"
              placeholder="type a command…"
              className="min-w-0 flex-1 bg-transparent text-ink placeholder:text-faint focus:outline-none"
            />
          </form>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-faint">Try:</span>
          {SUGGESTIONS.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => submit(command)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-accent/50 hover:text-ink"
            >
              {command}
            </button>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
