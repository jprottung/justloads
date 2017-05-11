// Import a couple modules for testing.
import load from './modules/load';
import preloadPolyfill from './modules/preloadPolyfill';

preloadPolyfill();

load('js', '../dist/core.js')
    .then(() => {
    })
    .catch(() => {
    });

load('css', 'test.css');