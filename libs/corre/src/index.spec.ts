import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useTimeout, useInterval, useThrottledCallback } from './index';

describe('@gmzcodes/corre', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('useTimeout calls callback after delay', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('useInterval calls callback repeatedly', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 500));
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('useThrottledCallback throttles invocations', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 1000));
    act(() => {
      result.current();
      result.current();
      vi.advanceTimersByTime(1000);
    });
    expect(callback.mock.calls.length).toBeGreaterThanOrEqual(1);
  });
});
