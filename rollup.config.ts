import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import camelCase from 'lodash.camelcase'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const sourcemap = isProd ? false : true;

const libraryName = '--libraryname--'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName)[0].toUpperCase() + camelCase(libraryName).slice(1),
      format: 'umd',
      sourcemap
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap
    },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
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
    uglify()
  ]
};