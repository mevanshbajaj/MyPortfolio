import type { ReactNode } from 'react';
import type { ProjectVisual as ProjectVisualSpec, VisualNode } from '../types';

/*
 * Small architecture sketches. They sit inside a `group` (the project card), so
 * connectors and borders react when the card is hovered.
 */

function Frame({ title, footer, children }: { title: string; footer: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-xl border border-line bg-bg/70 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-faint">
        <span>{title}</span>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70" />
      </div>
      {children}
      <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-faint">{footer}</p>
    </div>
  );
}

function Connector() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-5 w-px bg-line-strong transition-colors duration-300 group-hover:bg-accent/60"
    />
  );
}

function NodeBox({ node, lead, emphasis = false }: { node: VisualNode; lead?: string; emphasis?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-300 ${
        emphasis
          ? 'border-accent/40 bg-accent/[0.06]'
          : 'border-line bg-surface group-hover:border-line-strong'
      }`}
    >
      {lead && <span className="font-mono text-[11px] text-accent">{lead}</span>}
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{node.label}</p>
        <p className="text-xs leading-snug text-faint">{node.note}</p>
      </div>
    </div>
  );
}

export default function ProjectVisual({ visual }: { visual: ProjectVisualSpec }) {
  if (visual.kind === 'pipeline') {
    return (
      <Frame title={visual.title} footer={visual.footer}>
        <ol>
          {visual.steps.map((step, index) => (
            <li key={step.label}>
              {index > 0 && <Connector />}
              <NodeBox node={step} lead={String(index + 1).padStart(2, '0')} />
            </li>
          ))}
        </ol>
      </Frame>
    );
  }

  if (visual.kind === 'layers') {
    return (
      <Frame title={visual.title} footer={visual.footer}>
        <ol>
          {visual.layers.map((layer, index) => (
            <li key={layer.label}>
              {index > 0 && <Connector />}
              <NodeBox node={layer} emphasis={index === visual.layers.length - 1} />
            </li>
          ))}
        </ol>
      </Frame>
    );
  }

  return (
    <Frame title={visual.title} footer={visual.footer}>
      <div className="grid grid-cols-2 gap-3">
        {visual.clients.map((client) => (
          <NodeBox key={client.label} node={client} />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="relative mx-auto mb-4 h-6 w-1/2 rounded-b-lg border-x border-b border-line-strong transition-colors duration-300 group-hover:border-accent/60"
      >
        <span className="absolute left-1/2 top-full h-4 w-px bg-line-strong transition-colors duration-300 group-hover:bg-accent/60" />
      </div>
      <NodeBox node={visual.api} />
      <Connector />
      <NodeBox node={visual.store} emphasis />
    </Frame>
  );
}
