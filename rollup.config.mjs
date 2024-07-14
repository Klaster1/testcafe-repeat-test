import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        sourcemap: 'inline',
        file: 'dist/main.cjs',
        format: 'cjs',
      },
      {
        sourcemap: 'inline',
        file: 'dist/main.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript({ sourceMap: true, inlineSources: true, tsconfig: './tsconfig.json' })],
    external: ['testcafe'],
  },
  {
    input: 'tests/index.ts',
    output: [
      {
        sourcemap: 'inline',
        file: 'tests/index.mjs',
        format: 'es',
        externalImportAttributes: true,
      },
    ],
    plugins: [typescript({ sourceMap: true, inlineSources: true, tsconfig: 'tests/tsconfig.json' }), json()],
    external: ['node:assert/strict', 'node:assert', 'node:test', 'node:child_process', 'node:fs/promises'],
  },
];
export default config;
