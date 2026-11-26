import { describe, expect, it } from 'vitest';
import { ALL_TOPICS, certificateTopics, filterCertificates, issuerFor, topicFor } from './certificates';
import { fileToCertificate } from '../data/certificateFiles';

const files = ['Meta Full stack.pdf', 'Data Manipulations in sql.pdf', 'Python.pdf', 'Effective Communication.pdf'].map((n) => fileToCertificate(n));

describe('topicFor / issuerFor', () => {
  it('classifies by title keywords', () => {
    expect(topicFor('Data Manipulations in sql')).toBe('Databases');
    expect(topicFor('Python')).toBe('Programming');
    expect(topicFor('Something unrelated')).toBe('Other');
  });
  it('only names an issuer the title states', () => {
    expect(issuerFor('Meta Full stack')).toBe('Meta');
    expect(issuerFor('Python')).toBeUndefined();
  });
});

describe('filterCertificates', () => {
  it('filters by query and topic', () => {
    expect(filterCertificates(files, 'sql', ALL_TOPICS)).toHaveLength(1);
    expect(filterCertificates(files, '', 'Programming').map((f) => f.title).sort()).toEqual(['Meta Full stack', 'Python']);
    expect(filterCertificates(files, 'zzz', ALL_TOPICS)).toEqual([]);
  });
  it('lists topics with All first', () => {
    expect(certificateTopics(files)[0]).toBe(ALL_TOPICS);
  });
});
