import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended', tseslint.configs.strict],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
