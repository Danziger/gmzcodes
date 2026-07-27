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
        ...globals.node,
      },
    },
    plugins: { import: importPlugin },
    rules: sharedRules,
  },
];
