import type { CertificateFile } from '../types';

export const certificateRepo = {
  owner: 'mevanshbajaj',
  repo: 'Certificates',
  branch: 'main',
  url: 'https://github.com/mevanshbajaj/Certificates',
  api: 'https://api.github.com/repos/mevanshbajaj/Certificates/contents?ref=main',
};

/** Turn a file name like "Data Manipulations in sql.pdf" into a display title. */
export function fileToCertificate(name: string, url?: string): CertificateFile {
  return {
    name,
    title: name.replace(/\.(pdf|png|jpe?g)$/i, '').replace(/[_]+/g, ' ').trim(),
    url: url ?? `${certificateRepo.url}/blob/${certificateRepo.branch}/${encodeURIComponent(name)}`,
  };
}

/**
 * Saved copy of the repo's file list. It is only shown if GitHub cannot be reached,
 * so the section never comes up empty. The live list always wins when it loads.
 */
export const fallbackCertificates: CertificateFile[] = [
  'Agile Planning for Software Products.pdf',
  'Certificate Cybersecurity Essentials.pdf',
  'Client Needs and Software Requirements.pdf',
  'Data Manipulations in sql.pdf',
  'Devops cloudtrain.pdf',
  'Effective Communication.pdf',
  'Generative AI with Large Language Models.pdf',
  'Introduction to Software Product Management.pdf',
  'Introductory C.pdf',
  'Meta Full stack.pdf',
  'Python.pdf',
  'Research Methodologies.pdf',
  'Reviews & Metrics for Software Improvements.pdf',
  'SQL foundations.pdf',
  'Software Processes and Agile Practices.pdf',
  'Software Product Management.pdf',
].map((name) => fileToCertificate(name));
