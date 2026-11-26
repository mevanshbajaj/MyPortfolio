import { useRef } from 'react';
import type { CertificateFile } from '../types';
import Button from './Button';
import { AwardIcon, CloseIcon, GitHubIcon } from './Icons';
import Modal from './Modal';

export default function CertificateModal({ file, onClose }: { file: CertificateFile; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = 'certificate-modal-title';
  const rows: [string, string][] = [['Topic', file.topic]];
  if (file.issuer) rows.push(['Issuer', file.issuer]);
  rows.push(['File', file.name]);

  return (
    <Modal labelledBy={titleId} onClose={onClose} initialFocus={closeRef} className="max-w-lg rounded-t-2xl sm:rounded-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-line p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface2 text-accent">
            <AwardIcon className="h-5 w-5" />
          </span>
          <h3 id={titleId} className="text-lg font-semibold leading-snug text-ink">
            {file.title}
          </h3>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close certificate details"
          className="shrink-0 rounded-md border border-line-strong p-2 text-mute transition-colors hover:bg-surface2 hover:text-ink"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-5">
        <dl className="divide-y divide-line">
          {rows.map(([term, value]) => (
            <div key={term} className="grid grid-cols-[5rem_1fr] gap-3 py-2.5 text-sm">
              <dt className="text-faint">{term}</dt>
              <dd className="break-words text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-faint">
          The credential file is hosted in my public GitHub certificates repository; open it to view or verify the original.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
        <Button href={file.url} external variant="primary" icon={<GitHubIcon className="h-4 w-4" />}>
          Open credential file
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
