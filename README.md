# GMZcodes Monorepo

Personal site, shared libraries, and tooling — powered by [Nx](https://nx.dev) and [pnpm](https://pnpm.io).

- **Site:** [gmzcodes.com](https://gmzcodes.com) (`apps/gmzcodes` — Astro)
- **Libs:** `@gmzcodes/corre`, `@gmzcodes/eslint-config`
- **Archive:** previous Vite PWA lives in [`old/`](old/)

## Quick start

```bash
pnpm install
pnpm dev          # nx dev gmzcodes
pnpm build        # nx build gmzcodes
pnpm test         # nx run-many -t test
pnpm deploy       # build + gh-pages
```

## Workspace layout

```
apps/gmzcodes/         Astro site (portfolio, blog, libs docs)
libs/corre/            @gmzcodes/corre — React timing hooks
libs/eslint-config/    @gmzcodes/eslint-config — shared lint presets
old/                   Archived pre-monorepo Vite project
```

## Creating a new lib

```bash
nx g @nx/js:library my-lib \
  --directory=libs/my-lib \
  --importPath=@gmzcodes/my-lib \
  --bundler=vite \
  --unitTestRunner=vitest \
  --publishable

# Set "private": false in libs/my-lib/package.json
# Add README with install, usage, and publishing steps

nx build my-lib
nx test my-lib
```

Consume within the monorepo:

```json
"@gmzcodes/my-lib": "workspace:*"
```

Optional: add a docs page on the site under `apps/gmzcodes/src/pages/libs/`.

## Publishing to npm

Publishable packages live under `libs/*` with `"private": false` and the `@gmzcodes` scope.

```bash
npm login   # @gmzcodes scope

# Dry-run version bump + changelog
nx release --dry-run

# Publish one package
nx release publish --projects=corre

# Publish all changed libs
nx release publish
```

Nx Release uses **independent versioning** per lib (`nx.json` → `release.projectsRelationship: independent`).

- Monorepo consumers: `"@gmzcodes/corre": "workspace:*"` (no publish needed)
- External consumers: `pnpm add @gmzcodes/corre`

CI can run `nx release publish` with an `NPM_TOKEN` secret on tag push or manual dispatch.

## Common Nx commands

```bash
nx graph
nx affected -t build
nx run-many -t lint
nx build corre
nx dev gmzcodes
```

## Requirements

- Node.js ≥ 22
- pnpm ≥ 10.30
