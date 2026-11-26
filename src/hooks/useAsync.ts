import { useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'ready'; data: T; error?: undefined }
  | { status: 'error'; data?: undefined; error: unknown };

const cache = new Map<string, unknown>();

/**
 * Runs an async loader once per `key`, with abort-on-unmount and an in-memory cache,
 * and exposes explicit loading / ready / error states.
 */
export function useAsync<T>(key: string, loader: (signal: AbortSignal) => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>(() =>
    cache.has(key) ? { status: 'ready', data: cache.get(key) as T } : { status: 'loading' },
  );

  useEffect(() => {
    if (cache.has(key)) {
      setState({ status: 'ready', data: cache.get(key) as T });
      return;
    }
    const controller = new AbortController();
    setState({ status: 'loading' });
    loader(controller.signal)
      .then((data) => {
        cache.set(key, data);
        setState({ status: 'ready', data });
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== 'AbortError') setState({ status: 'error', error });
      });
    return () => controller.abort();
    // The loader is intentionally keyed by `key` only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
