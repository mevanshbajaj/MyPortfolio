import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import About from './components/About';
import BackToTop from './components/BackToTop';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Education from './components/Education';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProblemSolving from './components/ProblemSolving';
import Projects from './components/Projects';
import ScrollProgress from './components/ScrollProgress';
import Skills from './components/Skills';
import Stats from './components/Stats';
import { assistantAvailable } from './components/assistantFlag';
import { sectionIds } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';
import { useSpotlight } from './hooks/useSpotlight';
import { ThemeProvider } from './hooks/useTheme';

// Below-the-fold and on-demand features are split into their own chunks.
const GitHubActivity = lazy(() => import('./components/GitHubActivity'));
const SystemDesign = lazy(() => import('./components/SystemDesign'));
const DevTerminal = lazy(() => import('./components/DevTerminal'));
const Assistant = lazy(() => import('./components/Assistant'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

function SectionFallback({ id }: { id: string }) {
  return (
    <div id={id} aria-busy="true" aria-label="Loading section" className="mx-auto max-w-6xl border-t border-line/70 px-5 py-24 sm:px-8">
      <div className="h-6 w-40 animate-pulse rounded bg-line-strong/50" />
      <div className="mt-4 h-40 animate-pulse rounded-xl bg-line-strong/30" />
    </div>
  );
}

export default function App() {
  const activeId = useActiveSection(sectionIds);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  useSpotlight();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ThemeProvider>
      {/* reducedMotion="user" turns off transform animations for people who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar activeId={activeId} onOpenPalette={openPalette} />
        <main id="main">
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Projects />
          <Suspense fallback={<SectionFallback id="github" />}>
            <GitHubActivity />
          </Suspense>
          <ProblemSolving />
          <Suspense fallback={<SectionFallback id="system-design" />}>
            <SystemDesign />
          </Suspense>
          <Education />
          <Certifications />
          <Suspense fallback={<SectionFallback id="terminal" />}>
            <DevTerminal />
          </Suspense>
          {assistantAvailable && (
            <Suspense fallback={<SectionFallback id="assistant" />}>
              <Assistant />
            </Suspense>
          )}
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <AnimatePresence>
          {paletteOpen && (
            <Suspense fallback={null}>
              <CommandPalette onClose={closePalette} />
            </Suspense>
          )}
        </AnimatePresence>
      </MotionConfig>
    </ThemeProvider>
  );
}
