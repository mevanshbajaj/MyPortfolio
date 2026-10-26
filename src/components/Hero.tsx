import { motion, type Variants } from 'framer-motion';
import { profile } from '../data/profile';
import { EASE } from '../lib/motion';
import Button from './Button';
import HeroBackground from './HeroBackground';
import HeroTerminal from './HeroTerminal';
import { ArrowRightIcon, DownloadIcon, GitHubIcon, MailIcon } from './Icons';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36 lg:pt-40"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/80 px-3.5 py-1.5 font-mono text-xs text-mute"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to Backend Engineer internships
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            <span className="block">Building reliable systems,</span>
            <span className="block text-accent">one API at a time.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {profile.subheadline}
          </motion.p>

          <motion.ul variants={item} aria-label="Core technologies" className="mt-7 flex flex-wrap gap-2">
            {profile.heroStack.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[13px] text-ink/90"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                {tech}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary">
              View Projects
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button href={profile.resumeUrl} download variant="secondary" icon={<DownloadIcon />}>
              Download resume
            </Button>
            <Button href={profile.github} external variant="ghost" icon={<GitHubIcon className="h-4 w-4" />}>
              GitHub
            </Button>
            <Button href="#contact" variant="ghost" icon={<MailIcon className="h-4 w-4" />}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <HeroTerminal />
      </div>
    </section>
  );
}
