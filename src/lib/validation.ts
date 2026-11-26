export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = { nameMax: 80, messageMin: 10, messageMax: 2000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > LIMITS.nameMax) errors.name = `Name must be ${LIMITS.nameMax} characters or fewer.`;

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(email)) errors.email = 'That email address does not look valid.';

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < LIMITS.messageMin) errors.message = `Message should be at least ${LIMITS.messageMin} characters.`;
  else if (message.length > LIMITS.messageMax) errors.message = `Message must be ${LIMITS.messageMax} characters or fewer.`;

  return errors;
}

/** Builds a mailto: URL so the form still works without any backend configured. */
export function buildMailto(to: string, fields: ContactFields): string {
  const subject = `Portfolio message from ${fields.name.trim()}`;
  const body = `${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
