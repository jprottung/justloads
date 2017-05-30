import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry'; // eslint-disable-line
import istanbul from 'rollup-plugin-istanbul';
import builtins from 'rollup-plugin-node-builtins';

export default {
  entry: 'tests/**/*.test.js',
  plugins: [
    builtins(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    json(),
    istanbul(),
    buble(),
    multiEntry()
  ],
  format: 'cjs',
  external: [
    'mocha',
    'chai'
  ],
  intro: 'require("source-map-support").install();',
  dest: 'build/tests-bundle.js',
  sourceMap: true
};
