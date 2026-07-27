import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

const sharedRules = {
  'no-use-before-define': 'off',
  'import/prefer-default-export': 'off',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    },
  ],
  'prefer-template': 'error',
  'no-multiple-empty-lines': ['error', { maxBOF: 0, max: 2, maxEOF: 1 }],
  quotes: ['error', 'single', { allowTemplateLiterals: true }],
  'padded-blocks': ['error', { classes: 'always' }],
  'template-curly-spacing': ['error', 'always'],
  'max-len': ['error', { code: 120, ignoreTemplateLiterals: true }],
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  'prefer-destructuring': ['error', { array: false }],
  'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  'no-debugger': 'warn',
  'no-return-assign': ['error', 'except-parens'],
  'no-unused-vars': 'warn',
  'no-multi-assign': 'off',
  'no-plusplus': 'off',
  'no-bitwise': 'off',
  'no-case-declarations': 'off',
  indent: ['error', 2, { SwitchCase: 1 }],
  'linebreak-style': ['error', 'windows'],
  'object-curly-newline': ['error', { multiline: true, consistent: true }],
  'no-param-reassign': ['error', { props: false }],
  'operator-linebreak': ['error', 'before'],
};

export default [
  js.configs.recommended,
  {
    plugins: { import: importPlugin },
    rules: sharedRules,
  },
];

export { sharedRules };
