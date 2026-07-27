import { MutableRefObject, useEffect, useRef } from 'react';

export type UseThrottledRequestAnimationFrameParams = Parameters<typeof useThrottledRequestAnimationFrame>;
export type UseThrottledRequestAnimationFrameReturn = ReturnType<typeof useThrottledRequestAnimationFrame>;

/**
 * Declarative hook to call requestAnimationFrame every delay milliseconds.
 */
export function useThrottledRequestAnimationFrame(
  callback: () => void,
  delay: number | null,
  isRunning: boolean = true,
): [MutableRefObject<number | null>, MutableRefObject<number | null>] {
  const intervalRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) return undefined;

    if (typeof delay === 'number' && !Number.isNaN(delay)) {
      intervalRef.current = window.setInterval(() => {
        rafRef.current = window.requestAnimationFrame(() => {
          callbackRef.current();
        });
      }, delay);

      return () => {
        window.clearInterval(intervalRef.current || 0);
        window.cancelAnimationFrame(rafRef.current || 0);
        intervalRef.current = null;
        rafRef.current = null;
      };
    }

    return undefined;
  }, [delay, isRunning]);

  return [intervalRef, rafRef];
}
