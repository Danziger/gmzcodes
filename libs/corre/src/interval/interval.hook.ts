import { MutableRefObject, useEffect, useRef } from 'react';

export type UseIntervalParams = Parameters<typeof useInterval>;
export type UseIntervalReturn = ReturnType<typeof useInterval>;

/**
 * Use setInterval with Hooks in a declarative way.
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  deps: React.DependencyList = [],
): MutableRefObject<number | null> {
  const intervalRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number' && !Number.isNaN(delay)) {
      intervalRef.current = window.setInterval(() => callbackRef.current(), delay);

      return () => {
        window.clearInterval(intervalRef.current || 0);
        intervalRef.current = null;
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);

  return intervalRef;
}
