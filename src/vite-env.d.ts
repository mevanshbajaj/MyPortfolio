/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GitHub username used by the activity section (defaults to the profile username). */
  readonly VITE_GITHUB_USERNAME?: string;
  /** Optional URL returning verified LeetCode stats. `{username}` is replaced. See README. */
  readonly VITE_LEETCODE_STATS_URL?: string;
  /** Form endpoint (e.g. Formspree) for the contact form. Without it the form opens your email app. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** URL of your deployed assistant backend (see api/assistant.ts). Without it the assistant is hidden. */
  readonly VITE_ASSISTANT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
