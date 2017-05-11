/* eslint-env node */

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/index.js',
    dest: 'dist/justloads'+ (process.env.NODE_ENV === 'production' ? '.min': '') +'.js',
    format: 'iife',
    sourceMap: process.env.NODE_ENV !== 'production' ? 'inline': true,
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        (process.env.NODE_ENV !== 'production' &&  eslint({
            includes: [
                'src/**',
            ]
        })),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
};
