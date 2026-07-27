import { useCallback, useEffect, useRef, type DependencyList } from 'react';

export type UseThrottledCallbackParams<A extends unknown[]> = Parameters<typeof useThrottledCallback<A>>;
export type UseThrottledCallbackReturn<A extends unknown[]> = ReturnType<typeof useThrottledCallback<A>>;

export interface UseThrottledCallbackOptions {
  /**
   * If true, callback is always deferred via setTimeout for a more responsive feel.
   */
  makeResponsive?: boolean;
}

/**
 * Returns a throttled version of callback with the specified delay.
 */
export function useThrottledCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number,
  deps: DependencyList = [],
  options: UseThrottledCallbackOptions = {},
): (...args: A) => void {
  const timeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);
  const lastCalledRef = useRef(0);
  const { makeResponsive } = options;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    window.clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);

  return useCallback((...args: A) => {
    window.clearTimeout(timeoutRef.current);

    function invoke() {
      callbackRef.current(...args);
      lastCalledRef.current = Date.now();
    }

    const elapsed = Date.now() - lastCalledRef.current;

    if (elapsed >= delay && !makeResponsive) {
      invoke();
    } else {
      timeoutRef.current = window.setTimeout(invoke, Math.max(delay - elapsed, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, makeResponsive, delay]);
}
