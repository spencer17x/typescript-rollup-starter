import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const { name: pkgName, version: pkgVersion } = pkg;

const isProd = process.env.NODE_ENV === 'production';
const sourcemap = isProd ? false : true;

const defaultLibraryName = pkgName.split('-').map(v => v[0].toUpperCase() + v.slice(1)).join('');

const libraryName = defaultLibraryName || '--your library name--';

export default {
  input: './src/index.ts',
  output: [
    {
      name: libraryName,
      file: `build/${pkgName}.umd.js`,
      format: 'umd',
      sourcemap
    },
    {
      name: libraryName,
      file: `build/${pkgName}.js`,
      format: 'iife',
      sourcemap
    },
    {
      name: libraryName,
      file: `build/${pkgName}.es.js`,
      format: 'es',
      sourcemap
    }
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    })
  ]
};