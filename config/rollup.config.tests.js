import buble from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry'; // eslint-disable-line
import istanbul from 'rollup-plugin-istanbul';

export default {
  entry: 'tests/**/*.test.js',
  plugins: [
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