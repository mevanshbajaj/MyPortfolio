import type { CertificateFile } from '../types';

export const ALL_TOPICS = 'All';

const topicRules: { topic: string; test: RegExp }[] = [
  { topic: 'AI', test: /generative ai|machine learning|llm/i },
  { topic: 'Databases', test: /sql|database/i },
  { topic: 'DevOps & Security', test: /devops|cyber|security/i },
  { topic: 'Programming', test: /python|introductory c\b|full stack|javascript|java\b/i },
  { topic: 'Software Engineering', test: /agile|product|requirement|software|metrics|review/i },
  { topic: 'Professional Skills', test: /communication|research/i },
];

/** Derives a topic label from the certificate title. Purely a filtering aid. */
export function topicFor(title: string): string {
  return topicRules.find((rule) => rule.test.test(title))?.topic ?? 'Other';
}

/** Only returns an issuer when the title itself names one (we do not guess issuers). */
export function issuerFor(title: string): string | undefined {
  return /^meta\b/i.test(title) ? 'Meta' : undefined;
}

export function certificateTopics(files: CertificateFile[]): string[] {
  return [ALL_TOPICS, ...Array.from(new Set(files.map((f) => f.topic))).sort()];
}

export function filterCertificates(files: CertificateFile[], query: string, topic: string): CertificateFile[] {
  const q = query.trim().toLowerCase();
  return files.filter(
    (file) =>
      (topic === ALL_TOPICS || file.topic === topic) &&
      (q === '' || file.title.toLowerCase().includes(q) || file.topic.toLowerCase().includes(q)),
  );
}
