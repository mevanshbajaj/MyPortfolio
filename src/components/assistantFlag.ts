/** The assistant section renders only when a backend URL is configured (or in dev, as a labeled preview). */
export const assistantAvailable = Boolean(import.meta.env.VITE_ASSISTANT_API_URL) || import.meta.env.DEV;
