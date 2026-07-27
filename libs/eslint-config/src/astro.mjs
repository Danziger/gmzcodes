import base, { sharedRules } from './base.mjs';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

let astroPlugin = null;

try {
  astroPlugin = (await import('eslint-plugin-astro')).default;
} catch {
  // eslint-plugin-astro is optional
}

const config = [
  ...base,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { import: importPlugin },
    rules: sharedRules,
  },
];

if (astroPlugin) {
  config.push(
    ...astroPlugin.configs.recommended,
    ...astroPlugin.configs['jsx-a11y-recommended'],
  );
}

export default config;
