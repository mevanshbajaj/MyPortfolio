# Vansh Bajaj — Developer Portfolio

A dark/light, recruiter-focused developer portfolio built with **React 18 + TypeScript + Tailwind CSS + Framer Motion**, bundled with **Vite**. All content lives in `src/data`; presentation lives in `src/components`.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # TypeScript only
npm test             # Vitest + React Testing Library
npm run build        # typecheck + production build into dist/
npm run preview      # serve the production build
```

Copy `.env.example` to `.env.local` to configure the optional integrations below. **Every variable is optional**; the site works with none of them set.

## Features

| Area | What it does |
| --- | --- |
| Hero | Rotating "building…" line (static for reduced motion), availability badge, resume / GitHub / LinkedIn / contact actions, animated API-playground visual (no photo) |
| About | Story plus principle cards (backend focus, engineering philosophy, problem solving, career goal) |
| Skills | 9 categories with icons and hover effects; no percentages or ratings |
| Projects | Cards plus a detail dialog: problem, solution, stack, features, **interactive architecture diagram**, data layer, engineering decisions, optional screenshots / live demo |
| GitHub | Live profile stats, contribution graph, top languages, recent activity, repo cards, with loading / error / rate-limit states |
| DSA | LeetCode + GitHub links, solved count, topics; difficulty breakdown only when live or verified |
| System design | Interactive request-lifecycle, auth, error-handling and cache-aside demos |
| Journey | Timeline of education, achievements, certifications |
| Certificates | Live list from the GitHub certificates repo, search, topic filter, details dialog |
| Terminal | Working commands: `help about projects skills education certifications github leetcode contact resume open theme clear`, history (↑/↓), Tab completion, typing effect |
| Assistant | Chat UI for an optional backend (see below) |
| Contact | Validated form, email / LinkedIn / GitHub cards, resume download |
| UX | Ctrl/⌘ + K command palette, light/dark theme (persisted, no flash), scroll progress, back-to-top, scroll-spy nav, mobile menu, accessible dialogs, reduced-motion support, lazy-loaded sections |

## Environment variables

| Variable | Side | Purpose |
| --- | --- | --- |
| `VITE_GITHUB_USERNAME` | client | GitHub user for the activity section (default `mevanshbajaj`) |
| `VITE_LEETCODE_STATS_URL` | client | Endpoint returning `{ totalSolved, easySolved, mediumSolved, hardSolved }`; `{username}` is substituted. Unset = no live stats |
| `VITE_CONTACT_FORM_ENDPOINT` | client | Form backend URL, e.g. a Formspree form. Unset = the form opens the visitor's email app with the message prefilled |
| `VITE_ASSISTANT_API_URL` | client | Public URL of your deployed `api/assistant`. Unset = assistant hidden in production |
| `ANTHROPIC_API_KEY` | **server only** | Used by `api/assistant.ts`. Never prefix with `VITE_` |
| `ANTHROPIC_MODEL` | server only | Optional model override |
| `ASSISTANT_ALLOWED_ORIGIN` | server only | Optional CORS origin, e.g. `https://www.vanshbajaj.me` |

`VITE_*` values are compiled into the public bundle, so never put secrets in them.

## Setting up the optional integrations

**Contact form.** Create a form at [Formspree](https://formspree.io) (or any service that accepts a JSON `POST` with `name`, `email`, `message`), then set `VITE_CONTACT_FORM_ENDPOINT` to its URL. Without it, submitting opens the visitor's mail client. The form includes validation, a honeypot field, loading, success and error states.

**AI assistant.** `api/assistant.ts` is a serverless function (Vercel Web-handler format) that calls the Anthropic API with your key held server-side, validates and limits input, applies a basic per-instance rate limit, and answers only from a built-in fact sheet.

1. Deploy the repo to Vercel (static site + `api/` function).
2. Set `ANTHROPIC_API_KEY` (and optionally `ASSISTANT_ALLOWED_ORIGIN`) in the Vercel project settings.
3. Set `VITE_ASSISTANT_API_URL=https://<your-domain>/api/assistant` and redeploy.

Keep the `CONTEXT` constant in `api/assistant.ts` in sync with `src/data` when your content changes. The in-memory rate limit is per instance; use a shared store for strict limits. If you host the static site elsewhere, deploy the function separately and set `ASSISTANT_ALLOWED_ORIGIN`.

**LeetCode difficulty stats.** LeetCode has no official public API, so nothing is guessed. Either set `leetcodeDifficulty` in `src/data/problemSolving.ts` to the numbers shown on your profile, or point `VITE_LEETCODE_STATS_URL` at an endpoint you trust. Until then the section is simply not shown.

**GitHub.** Uses the public REST API unauthenticated (60 requests/hour per visitor IP) with in-memory caching and graceful rate-limit messaging; no token is used or needed. The contribution graph comes from the community service `github-contributions-api.jogruber.de` because GitHub's REST API does not expose it; if that service is down the card shows an error and everything else still works.

## Adding content

* **Screenshots / live demo:** add `screenshots: [{ src: '/screenshots/x.png', alt: '…' }]` and/or `demo: 'https://…'` to a project in `src/data/projects.ts`. They render only when present.
* **Internships, hackathons, leadership:** none are listed because none were provided. Add entries to `src/data/timeline.ts`.
* **Certificate issue dates / issuers:** extend `fileToCertificate` in `src/data/certificateFiles.ts`. Issuers are shown only when the title names one.

## Testing and CI

Vitest + React Testing Library (jsdom). Tests live next to the code (`*.test.ts(x)`): terminal commands, validation, GitHub/LeetCode/certificate helpers, contact form, modal, command palette matching, skills section. `.github/workflows/ci.yml` runs typecheck, tests and build on every push and pull request. After your first `npm install`, commit the updated `package-lock.json`.

## Deployment

`npm run build` outputs static files to `dist/` (relative asset paths), which work on Netlify, Vercel, GitHub Pages or any static host. Use Vercel if you want the assistant function. Set the `VITE_*` variables in the host's build environment.

## Project structure

```
api/assistant.ts       serverless assistant backend (optional)
src/
  App.tsx              composition, command-palette shortcut, lazy sections
  data/                all content (profile, skills, projects, timeline, …)
  components/          sections and reusable UI (Modal, Button, Section, Reveal, FlowSimulator, …)
  hooks/               useTheme, useActiveSection, useAsync, useSpotlight
  lib/                 pure logic: terminal, github, leetcode, validation, certificates, theme, scroll
  test/setup.ts        Vitest setup
```

## Accessibility and motion

Semantic landmarks, skip link, keyboard-operable everything (dialogs trap focus and restore it, Escape closes, palette is a combobox/listbox), visible focus, labelled form errors, live regions for async status, and `prefers-reduced-motion` support (Framer Motion `reducedMotion="user"`, a CSS override, static rotating text).

## No personal photo

The site intentionally uses no profile picture. `public/og-image.png` is a text-and-code card.
