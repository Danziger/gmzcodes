# @gmzcodes/corre

Declaratively control how and when your code is executed. React hooks for `setTimeout`, `setInterval`, `requestAnimationFrame`, and throttling.

Inspired by and API-compatible with `@swyg/corre`.

## Install

```bash
pnpm add @gmzcodes/corre
# peer dependencies
pnpm add react react-dom
```

## Usage

```tsx
import { useTimeout, useInterval, useThrottledCallback } from '@gmzcodes/corre';

function Demo() {
  useTimeout(() => console.log('once'), 1000);
  useInterval(() => console.log('tick'), 500);
  const onScroll = useThrottledCallback(() => {}, 100);
  return <button onClick={onScroll}>Throttled</button>;
}
```

## API

| Hook | Description |
|------|-------------|
| `useTimeout` | Declarative `setTimeout` |
| `useInterval` | Declarative `setInterval` |
| `useRAF` / `useRequestAnimationFrame` | Declarative `requestAnimationFrame` loop |
| `useThrottledRAF` | `rAF` throttled via `setInterval` |
| `useThrottledCallback` | Returns a throttled function |

## Publishing

This package is published from the GMZcodes monorepo.

```bash
# From monorepo root
nx build corre
nx test corre
nx release --projects=corre --dry-run
nx release publish --projects=corre
```

Requires `npm login` with access to the `@gmzcodes` scope.

## License

Apache-2.0
