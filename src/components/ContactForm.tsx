import { useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { LIMITS, buildMailto, validateContact, type ContactErrors, type ContactFields } from '../lib/validation';
import { CheckIcon, SendIcon } from './Icons';

const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || undefined;

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error';

const field =
  'mt-1.5 w-full rounded-lg border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-accent/60';

/**
 * Validated contact form. With VITE_CONTACT_FORM_ENDPOINT set (e.g. a Formspree form URL) it POSTs JSON to it.
 * Without one it opens the visitor's email app with the message prefilled, so it works with no backend.
 */
export default function ContactForm() {
  const [values, setValues] = useState<ContactFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  const onChange = (key: keyof ContactFields) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    if (honeypot) {
      setStatus('success'); // bots get a silent success
      return;
    }
    if (!ENDPOINT) {
      window.location.href = buildMailto(profile.email, values);
      setStatus('mailto');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const invalid = (key: keyof ContactFields) => Boolean(errors[key]);
  const border = (key: keyof ContactFields) => (invalid(key) ? 'border-danger' : 'border-line-strong');

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-accent/40 bg-accent/[0.07] p-6 text-center">
        <CheckIcon className="mx-auto h-6 w-6 text-accent" />
        <p className="mt-3 text-base font-medium text-ink">Message sent. Thank you!</p>
        <p className="mt-1 text-sm text-mute">I'll get back to you at the email address you provided.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm text-mute underline underline-offset-2 hover:text-ink">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.nameMax}
            value={values.name}
            onChange={onChange('name')}
            aria-invalid={invalid('name')}
            aria-describedby={invalid('name') ? 'cf-name-error' : undefined}
            className={`${field} ${border('name')}`}
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-1 text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange('email')}
            aria-invalid={invalid('email')}
            aria-describedby={invalid('email') ? 'cf-email-error' : undefined}
            className={`${field} ${border('email')}`}
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-1 text-xs text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          maxLength={LIMITS.messageMax}
          value={values.message}
          onChange={onChange('message')}
          aria-invalid={invalid('message')}
          aria-describedby={invalid('message') ? 'cf-message-error' : undefined}
          className={`${field} ${border('message')} resize-y`}
        />
        <div className="mt-1 flex justify-between gap-3 text-xs">
          <span id="cf-message-error" className="text-danger">
            {errors.message}
          </span>
          <span className="text-faint">
            {values.message.length}/{LIMITS.messageMax}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition hover:-translate-y-0.5 hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
        >
          <SendIcon />
          {status === 'sending' ? 'Sending…' : ENDPOINT ? 'Send message' : 'Open in email app'}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-mute">
          {status === 'mailto' && 'Opening your email app with the message ready to send…'}
        </p>
      </div>
      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-ink">
          The message could not be sent. Please try again, or email me directly at{' '}
          <a className="underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
