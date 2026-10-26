import { profile } from '../data/profile';

const link = 'text-mute transition-colors duration-150 hover:text-ink';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-ink">{profile.name}</p>
          <p className="mt-0.5 text-sm text-mute">{profile.role}</p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={link}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.resumeUrl} download className={link}>
                Resume
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={link}>
                Email
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-faint">© 2026 Vansh Bajaj</p>
      </div>
    </footer>
  );
}
