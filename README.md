# Vansh Bajaj — Developer Portfolio

A dark, minimal developer portfolio built with **React + TypeScript + Tailwind CSS**, with **Framer Motion** for animation and **Vite** as the build tool. All content comes from the resume and lives in `src/data`.

## Run it locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build      # type-check, then create a production build in dist/
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only
```

The production build uses relative asset paths (`base: './'`), so `dist/` can be hosted on Netlify, Vercel, GitHub Pages or any static host.

## Project structure

```
src/
  App.tsx                  page composition, scroll-spy, reduced-motion config
  types.ts                 shared TypeScript interfaces
  data/                    all content, separate from presentation
    profile.ts             name, links, nav items
    skills.ts              skill categories
    projects.ts            projects (and their GitHub links)
    problemSolving.ts      LeetCode stat and topics
    education.ts           education and certifications
  components/
    Navbar, Hero, HeroBackground, HeroTerminal,
    About, Skills, Projects, ProjectCard, ProjectModal, ProjectVisual,
    ProblemSolving, ProblemViz, Education, Certifications, Contact, Footer,
    Button, Section, Reveal, Icons
  hooks/useActiveSection.ts
  lib/motion.ts            shared easing curve
```

## Editing content

- **Project links:** no repository URLs were supplied, so each project's GitHub button points to the GitHub profile. To link a repo, change the `github` field for that project in `src/data/projects.ts`.
- **LeetCode:** no username or profile URL was supplied, so the section shows the count only. To add a link, extend `src/data/problemSolving.ts` and render it in `src/components/ProblemSolving.tsx`.
- **Accent colour and palette:** `tailwind.config.js` (`colors`).

## Accessibility and motion

Semantic landmarks, a skip link, keyboard-accessible navigation and modal (focus trap, Escape to close, focus restored), visible focus states, and `prefers-reduced-motion` support (Framer Motion's `reducedMotion="user"` plus a CSS override for the background and counters).
