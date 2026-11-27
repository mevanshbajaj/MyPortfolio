import { useState } from 'react';
import { flows } from '../data/systemDesign';
import CacheDemo from './CacheDemo';
import FlowSimulator from './FlowSimulator';
import Reveal from './Reveal';
import Section from './Section';

const tabs = [...flows.map((f) => ({ id: f.id, label: f.tab })), { id: 'cache', label: 'Caching' }];

export default function SystemDesign() {
  const [active, setActive] = useState(tabs[0].id);
  const flow = flows.find((f) => f.id === active);

  return (
    <Section
      id="system-design"
      eyebrow="06 / system design"
      title="Backend concepts you can poke at"
      description="Interactive diagrams of patterns I work with: layered APIs, authentication, error handling and caching. They illustrate the concepts and are not live systems."
    >
      <Reveal>
        <div role="tablist" aria-label="System design topics" className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`sd-tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls="sd-panel"
              onClick={() => setActive(tab.id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === tab.id ? 'border-accent/60 bg-accent/10 text-ink' : 'border-line text-mute hover:border-line-strong hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div id="sd-panel" role="tabpanel" aria-labelledby={`sd-tab-${active}`} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {flow ? (
            <>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink">{flow.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{flow.concept}</p>
              </div>
              <FlowSimulator key={flow.id} label={flow.title} steps={flow.steps} scenarios={flow.scenarios} />
            </>
          ) : (
            <CacheDemo />
          )}
        </div>
      </Reveal>
    </Section>
  );
}
