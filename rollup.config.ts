import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import camelCase from 'lodash.camelcase';
import { uglify } from 'rollup-plugin-uglify';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');
const libraryName = '--libraryname--';
const outputLibraryName = camelCase(libraryName);

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: outputLibraryName,
      format: 'umd',
      sourcemap: false
    },
    {
      file: pkg.module,
      name: outputLibraryName,
      format: 'esm',
      sourcemap: false
    }
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    replace({}),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    uglify(),
    terser({
      compress: {
        pure_funcs: ['console.log'] // remove console.log
      }
    })
  ]
};