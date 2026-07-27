import { MutableRefObject, useEffect, useRef } from 'react';

export type UseRequestAnimationFrameParams = Parameters<typeof useRequestAnimationFrame>;
export type UseRequestAnimationFrameReturn = ReturnType<typeof useRequestAnimationFrame>;

/**
 * Use requestAnimationFrame with Hooks in a declarative way.
 */
export function useRequestAnimationFrame(
  callback: () => void,
  isRunning: boolean = true,
): MutableRefObject<number | null> {
  const rafRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) return undefined;

    function tick() {
      rafRef.current = window.requestAnimationFrame(() => {
        callbackRef.current();
        tick();
      });
    }

    tick();

    return () => {
      window.cancelAnimationFrame(rafRef.current || 0);
      rafRef.current = null;
    };
  }, [isRunning]);

  return rafRef;
}
