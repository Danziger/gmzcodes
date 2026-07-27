import base, { sharedRules } from './base.mjs';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  ...base,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: { import: importPlugin },
    rules: sharedRules,
  },
];
