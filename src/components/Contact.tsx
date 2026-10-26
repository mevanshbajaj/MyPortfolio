import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import Button from './Button';
import { ArrowUpRightIcon, CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons';
import Reveal from './Reveal';

const cardClass =
  'group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface2/60 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[560px] max-w-full -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[90px]"
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">07 / contact</p>
              <h2
                id="contact-title"
                className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              >
                Let's build something useful.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
                I'm currently looking for backend engineering internship opportunities and opportunities to work on
                real-world software systems.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={`mailto:${profile.email}`} variant="primary" icon={<MailIcon className="h-4 w-4" />}>
                  Get in touch
                </Button>
                <Button href={profile.resumeUrl} download variant="secondary" icon={<DownloadIcon />}>
                  Download resume
                </Button>
                <Button
                  variant="ghost"
                  onClick={copyEmail}
                  icon={copied ? <CheckIcon className="h-4 w-4 text-accent" /> : <CopyIcon className="h-4 w-4" />}
                >
                  {copied ? 'Copied' : 'Copy email'}
                </Button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <li>
                  <a href={`mailto:${profile.email}`} className={cardClass}>
                    <span className="flex min-w-0 items-center gap-3">
                      <MailIcon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">Email</span>
                        <span className="block break-words text-sm text-ink">{profile.email}</span>
                      </span>
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href={profile.phoneHref} className={cardClass}>
                    <span className="flex min-w-0 items-center gap-3">
                      <PhoneIcon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">Phone</span>
                        <span className="block break-words text-sm text-ink">{profile.phone}</span>
                      </span>
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    <span className="flex min-w-0 items-center gap-3">
                      <LinkedInIcon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">
                          LinkedIn
                        </span>
                        <span className="block break-words text-sm text-ink">{profile.linkedinLabel}</span>
                      </span>
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    <span className="flex min-w-0 items-center gap-3">
                      <GitHubIcon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">GitHub</span>
                        <span className="block break-words text-sm text-ink">{profile.githubLabel}</span>
                      </span>
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
