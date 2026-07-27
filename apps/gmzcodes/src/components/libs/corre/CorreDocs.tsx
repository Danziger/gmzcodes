import { useState } from 'react';
import {
  useTimeout,
  useInterval,
  useThrottledCallback,
  useRAF,
} from '@gmzcodes/corre';

import styles from './CorreDocs.module.scss';

function TimeoutDemo() {
  const [message, setMessage] = useState('Waiting…');
  useTimeout(() => setMessage('Timeout fired!'), 2000);
  return <p>useTimeout (2s): {message}</p>;
}

function IntervalDemo() {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), 500);
  return <p>useInterval (500ms): {count}</p>;
}

function ThrottledDemo() {
  const [clicks, setClicks] = useState(0);
  const [handled, setHandled] = useState(0);
  const throttled = useThrottledCallback(() => setHandled((h) => h + 1), 1000);
  return (
    <div>
      <p>useThrottledCallback: {handled} handled / {clicks} clicked</p>
      <button type="button" className={styles.button} onClick={() => { setClicks((c) => c + 1); throttled(); }}>
        Click fast
      </button>
    </div>
  );
}

function RafDemo() {
  const [frame, setFrame] = useState(0);
  useRAF(() => setFrame((f) => f + 1));
  return <p>useRAF: frame {frame}</p>;
}

export function CorreDocs() {
  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <h2 className={styles.title}>Live demos</h2>
        <TimeoutDemo />
        <IntervalDemo />
        <ThrottledDemo />
        <RafDemo />
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Install</h2>
        <pre className={styles.codeBlock}><code>pnpm add @gmzcodes/corre</code></pre>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>API</h2>
        <ul className={styles.apiList}>
          <li><code>useTimeout(callback, delay, deps?)</code></li>
          <li><code>useInterval(callback, delay, deps?)</code></li>
          <li><code>useRAF(callback, isRunning?)</code></li>
          <li><code>useThrottledRAF(callback, delay, isRunning?)</code></li>
          <li><code>useThrottledCallback(callback, delay, deps?, options?)</code></li>
        </ul>
      </section>
    </div>
  );
}
