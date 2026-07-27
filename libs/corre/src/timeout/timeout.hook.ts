import { MutableRefObject, useEffect, useRef } from 'react';

export type UseTimeoutParams = Parameters<typeof useTimeout>;
export type UseTimeoutReturn = ReturnType<typeof useTimeout>;

/**
 * Use setTimeout with Hooks in a declarative way.
 */
export function useTimeout(
  callback: () => void,
  delay: number | null,
  deps: React.DependencyList = [],
): MutableRefObject<number | null> {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number' && !Number.isNaN(delay)) {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);

      return () => {
        window.clearTimeout(timeoutRef.current || 0);
        timeoutRef.current = null;
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);

  return timeoutRef;
}
