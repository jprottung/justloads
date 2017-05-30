import buble from 'rollup-plugin-buble';
import minify from 'rollup-plugin-minify'; // eslint-disable-line

const pkg = require('./../package.json');

const external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  globals: {
    document: 'document',
    window: 'window'
  },
  external,
  plugins: [
    buble(),
    minify({
      iife: {
        dest: 'dist/justloads.min.js',
        mangle: {
          //toplevel: true,
          screw_ie8: true

        },
        compress: {
          screw_ie8: true,
          sequences: true,
          //properties: true,
          dead_code: true,
          drop_debugger: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          //negate_iife: true,
          drop_console: true
        }
      }
    }),
  ],
  targets: [
    {
      dest: 'dist/justloads.js',
      format: 'iife',
      moduleName: 'justloads',
      sourceMap: true
    },
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'justloads',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};
