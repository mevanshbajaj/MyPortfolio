import type { SVGProps } from 'react';

const paths: Record<string, JSX.Element> = {
  languages: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  frontend: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  databases: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  devops: <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9z" />,
  ai: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <rect x="8" y="8" width="8" height="8" rx="2" />
    </>
  ),
  core: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <circle cx="9" cy="18" r="2.2" />
      <path d="m7.8 7 8.4.6M7 8l1.5 8M16.8 10l-6 6.5" />
    </>
  ),
  frameworks: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  tools: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.6-.6-.6-2.6z" />,
};

/** Decorative icon for a skill category (matched by category id). */
export default function SkillIcon({ id, className = 'h-4 w-4', ...rest }: { id: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[id] ?? paths.tools}
    </svg>
  );
}
