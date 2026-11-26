export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ASSISTANT_URL: string | undefined = import.meta.env.VITE_ASSISTANT_API_URL || undefined;
export const MAX_INPUT = 500;

export class AssistantError extends Error {}

/** Posts the conversation to your backend (see api/assistant.ts) and returns the reply text. */
export async function askAssistant(url: string, messages: ChatMessage[], signal?: AbortSignal): Promise<string> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new AssistantError('Could not reach the assistant. Please try again.');
  }
  if (response.status === 429) throw new AssistantError('Too many questions in a short time. Please wait a moment.');
  if (!response.ok) throw new AssistantError('The assistant is unavailable right now.');
  const data = (await response.json().catch(() => null)) as { reply?: unknown } | null;
  if (!data || typeof data.reply !== 'string' || !data.reply.trim()) throw new AssistantError('The assistant returned an unexpected response.');
  return data.reply;
}
