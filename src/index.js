// Import a couple modules for testing.
import load from './modules/load';
import preloadPolyfill from './modules/preloadPolyfill';

// Import a logger for easier debugging.
import debug from 'debug';
const log = debug('app:log');

// The logger should only be enabled if we’re not in production.
if (ENV !== 'production') {
    // Enable the logger.
    debug.enable('*');
    log('Logging is enabled!');
} else {
    debug.disable();
}

log('That is very cool');

preloadPolyfill();

load('js', '../dist/core.js').then(() => {
    log('lodash loaded');
}).catch(() => {
    log('lodash failed');
});

load('css', 'test.css');