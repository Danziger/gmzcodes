# @gmzcodes/eslint-config

Shared ESLint flat configs, Stylelint preset, and EditorConfig template for Astro, Next.js, React, Node, and plain JS/TS projects.

## Install

```bash
pnpm add -D @gmzcodes/eslint-config eslint
```

For TypeScript projects, also install `typescript-eslint`. For framework-specific configs, install the matching optional peer:

| Config | Extra install |
|--------|---------------|
| `astro` | `eslint-plugin-astro` |
| `next` | `eslint-config-next` |
| `react` | `react`, `react-dom` |

## ESLint

Create `eslint.config.mjs` in your project:

```js
// Astro
import astro from '@gmzcodes/eslint-config/astro';
export default astro;

// Next.js
import next from '@gmzcodes/eslint-config/next';
export default next;

// React (non-Next)
import react from '@gmzcodes/eslint-config/react';
export default react;

// Node
import node from '@gmzcodes/eslint-config/node';
export default node;

// Browser JS/TS
import browser from '@gmzcodes/eslint-config/browser';
export default browser;

// Base only (extend manually)
import base from '@gmzcodes/eslint-config/base';
export default base;
```

### Composing / overriding

```js
import astro from '@gmzcodes/eslint-config/astro';

export default [
  ...astro,
  {
    rules: {
      'no-console': 'warn',
    },
  },
];
```

## Stylelint

```bash
pnpm add -D stylelint stylelint-config-standard-scss
```

```json
{
  "scripts": {
    "stylelint": "stylelint \"src/**/*.{css,scss}\""
  }
}
```

Point Stylelint at the shared config:

```js
// stylelint.config.mjs
export { default } from '@gmzcodes/eslint-config/stylelint';
```

Or copy the rules file:

```bash
cp node_modules/@gmzcodes/eslint-config/stylelint.config.mjs .
```

## EditorConfig

Copy the canonical template into your project root:

```bash
cp node_modules/@gmzcodes/eslint-config/editorconfig .editorconfig
```

Most editors pick up `.editorconfig` automatically. For monorepo packages, copy once at the repo root.

## Publishing

```bash
# From monorepo root
nx release --projects=eslint-config --dry-run
nx release publish --projects=eslint-config
```

## License

UNLICENSED
