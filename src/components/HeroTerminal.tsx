import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../lib/motion';

const Key = ({ children }: { children: string }) => <span className="text-ink/90">"{children}"</span>;
const Str = ({ children }: { children: string }) => <span className="text-accent">"{children}"</span>;
const Punc = ({ children }: { children: ReactNode }) => <span className="text-faint">{children}</span>;

/** Illustrative response: every value comes straight from the resume. */
const lines: ReactNode[] = [
  <Punc>{'{'}</Punc>,
  <>
    {'  '}
    <Key>name</Key>
    <Punc>: </Punc>
    <Str>Vansh Bajaj</Str>
    <Punc>,</Punc>
  </>,
  <>
    {'  '}
    <Key>focus</Key>
    <Punc>: </Punc>
    <Str>Backend Engineering</Str>
    <Punc>,</Punc>
  </>,
  <>
    {'  '}
    <Key>degree</Key>
    <Punc>: </Punc>
    <Str>B.E. Computer Science</Str>
    <Punc>,</Punc>
  </>,
  <>
    {'  '}
    <Key>stack</Key>
    <Punc>: [</Punc>
  </>,
  <>
    {'    '}
    <Str>Java</Str>
    <Punc>, </Punc>
    <Str>Spring Boot</Str>
    <Punc>,</Punc>
  </>,
  <>
    {'    '}
    <Str>Node.js</Str>
    <Punc>, </Punc>
    <Str>PostgreSQL</Str>
  </>,
  <>
    {'  '}
    <Punc>],</Punc>
  </>,
  <>
    {'  '}
    <Key>auth</Key>
    <Punc>: [</Punc>
    <Str>JWT</Str>
    <Punc>, </Punc>
    <Str>RBAC</Str>
    <Punc>],</Punc>
  </>,
  <>
    {'  '}
    <Key>open_to</Key>
    <Punc>: </Punc>
    <Str>Backend Internship</Str>
  </>,
  <Punc>{'}'}</Punc>,
];

export default function HeroTerminal() {
  return (
    <motion.figure
      aria-label="Illustrative API response summarising Vansh Bajaj's profile"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
      className="w-full max-w-md justify-self-center overflow-hidden rounded-xl border border-line-strong bg-surface/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] lg:justify-self-end"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="rounded bg-accent/15 px-1.5 py-0.5 font-semibold text-accent">GET</span>
          <span className="text-mute">/api/engineer</span>
        </div>
        <span className="text-accent">200 OK</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        <code>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              className="whitespace-pre"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.08, duration: 0.3, ease: EASE }}
            >
              {line}
              {index === lines.length - 1 && (
                <span aria-hidden="true" className="ml-1 inline-block h-4 w-2 animate-pulse bg-accent/70 align-middle" />
              )}
            </motion.div>
          ))}
        </code>
      </pre>

      <figcaption className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-faint">
        application/json
      </figcaption>
    </motion.figure>
  );
}
