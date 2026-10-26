import { MotionConfig } from 'framer-motion';
import About from './components/About';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Education from './components/Education';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProblemSolving from './components/ProblemSolving';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Skills from './components/Skills';
import { sectionIds } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const activeId = useActiveSection(sectionIds);

  return (
    // reducedMotion="user" turns off transform animations for people who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <ProblemSolving />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
