import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import type { ArchitectureNode } from '../types';

/** Clickable system diagram: pick a component to read what it does in this project. */
export default function ArchitectureExplorer({ nodes, name }: { nodes: ArchitectureNode[]; name: string }) {
  const [activeId, setActiveId] = useState(nodes[0]?.id);
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  if (!active) return null;

  return (
    <div className="rounded-xl border border-line bg-surface2/50 p-4 sm:p-5">
      <ol aria-label={`${name} architecture components`} className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {nodes.map((node, i) => {
          const selected = node.id === active.id;
          return (
            <li key={node.id} className="flex min-w-0 flex-1 flex-col items-stretch sm:flex-row sm:items-center">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(node.id)}
                className={`relative flex-1 rounded-lg border px-3 py-2.5 text-left transition-colors duration-150 ${
                  selected ? 'border-accent/60 bg-accent/[0.08]' : 'border-line bg-surface hover:border-line-strong'
                }`}
              >
                <span className={`block text-[13px] font-medium ${selected ? 'text-ink' : 'text-ink/90'}`}>{node.label}</span>
                <span className="mt-0.5 block font-mono text-[11px] leading-snug text-faint">{node.note}</span>
              </button>
              {i < nodes.length - 1 && (
                <span aria-hidden="true" className="flex shrink-0 items-center justify-center py-0.5 text-faint sm:px-1.5 sm:py-0">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-4 min-h-[4.5rem] border-t border-line pt-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{active.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">{active.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
