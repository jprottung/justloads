(function () {
'use strict';

/**
 *
 * @type {Object}
 */
var loadCache = [];

/**
 * checks if already in storage
 *
 * @param {string} url
 * @return {boolean}
 */
function loaded(url) {
  return loadCache[url];
}

/**
 *
 * @param {string} url
 * @param {Element} elem
 */
function push(url, elem) {
  if (!loaded(url)) {
    loadCache[url] = elem;
  }
}

/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string} type
 * @param {Object} [attributes]
 * @returns {Element}
 */
function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var element = document.createElement(type);

    for (var attributeKey in attributes) {
        if (attributes.hasOwnProperty(attributeKey)) {
            element.setAttribute(attributeKey, attributes[attributeKey]);
        }
    }

    return element;
}

var d = document;
var getElementsByTagName = 'getElementsByTagName';

/**
 *
 * @returns {Element}
 */
function getHead() {
  return d[getElementsByTagName]('head')[0] || d.documentElement;
}

var defaultRefs = (d.body || getHead()).childNodes;
var defaultRef = defaultRefs[defaultRefs.length - 1];

/**
 *
 * @param {Element} element
 * @param {Element} [ref]
 */
var insertElement = function (element) {
  var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRef;

  ref.parentNode.insertBefore(element, ref);
};

var readyState = 'readyState';
var onreadystatechange = 'onreadystatechange';
var addEventListener = 'addEventListener';

/**
 *
 * @param element
 * @returns {Promise}
 */
function loadElementPromise(element) {
    var complete = false;

    return new Promise(function elementPromises(resolve, reject) {
        var rejectHandler = function rejectCb(error) {
            reject(error, element);
        },
            resolveHandler = function rejectCb() {
            resolve(element);
        };

        if (element[readyState]) {
            element[onreadystatechange] = function onreadystatechangeHandler() {
                if (!complete && element[readyState] === 'complete') {
                    complete = true;
                    resolveHandler();
                }
            };
        } else {
            element[addEventListener]('load', resolveHandler);
        }

        element[addEventListener]('error', rejectHandler);
        element[addEventListener]('abort', rejectHandler);
    });
}

/**
 * loads a javascript url if its not loaded
 * @param {string} url
 * @param {string} type
 * @param {Object} [attributes]
 * @return {Promise}
 */
function loadElement(url, type) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var element = createElement(type, attributes);
    var loadedElement = loaded(url);

    if (loadedElement) {
        return Promise.resolve(loadedElement);
    }

    var p = loadElementPromise(element);

    p.then(function (element) {
        push(url, element);
    }, function () {});

    insertElement(element);

    return p;
}

/**
 *
 * @param url
 * @returns {Promise}
 */
function loadJs(url) {
    return loadElement(url, 'script', {
        async: true,
        src: url
    });
}

/**
 *
 * @param url
 * @param {string} [media]
 * @returns {Promise}
 */
function loadCss(url) {
    var media = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';

    var p = loadElement(url, 'link', {
        type: 'text/css',
        rel: 'stylesheet',
        href: url,
        media: 'only x'
    });

    p.then(function afterCssLoad(element) {
        element.media = media; // eslint-disable-line
    }, function () {});

    return p;
}

/**
 * Capitalizes the first letter
 *
 * @param {string} text
 * @returns {string}
 */
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

var loader = {
    loadJs: loadJs,
    loadCss: loadCss
};

/**
 *
 * @param type
 * @returns {*}
 */
function load(type) {
    var loaderName = 'load' + capitalizeFirstLetter(type);
    console.log(loader);
    console.log(loaderName);
    var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];

    return loader[loaderName].apply(null, args);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d$1 = h * 24;
var y = d$1 * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var index = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d$1
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d$1) {
    return Math.round(ms / d$1) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d$1, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}

var debug$1 = createCommonjsModule(function (module, exports) {
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = index;

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index$$1 = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index$$1++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index$$1];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index$$1, 1);
        index$$1--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}
});

var browser$1 = createCommonjsModule(function (module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug$1;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
});

// Import a couple modules for testing.
// Import a logger for easier debugging.
var log$$1 = browser$1('app:log');

// The logger should only be enabled if we’re not in production.
{
    // Enable the logger.
    browser$1.enable('*');
    log$$1('Logging is enabled!');
}

log$$1('That is very cool');

load('js', '../dist/core.js').then(function () {
    log$$1('lodash loaded');
}).catch(function () {
    log$$1('lodash failed');
});

load('css', 'test.css');

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdGxvYWRzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9sb2FkU3RvcmFnZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9ucy9jcmVhdGVFbGVtZW50LmpzIiwiLi4vc3JjL21vZHVsZXMvZnVuY3Rpb25zL2luc2VydEVsZW1lbnQuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvbG9hZEVsZW1lbnRQcm9taXNlLmpzIiwiLi4vc3JjL21vZHVsZXMvZnVuY3Rpb25zL2xvYWRFbGVtZW50LmpzIiwiLi4vc3JjL21vZHVsZXMvbG9hZGVyL2xvYWRKcy5qcyIsIi4uL3NyYy9tb2R1bGVzL2xvYWRlci9sb2FkQ3NzLmpzIiwiLi4vc3JjL21vZHVsZXMvZnVuY3Rpb25zL2NhcGl0YWxpemVGaXJzdExldHRlci5qcyIsIi4uL3NyYy9tb2R1bGVzL2xvYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGxvYWRDYWNoZSA9IFtdO1xuXG4vKipcbiAqIGNoZWNrcyBpZiBhbHJlYWR5IGluIHN0b3JhZ2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZGVkKHVybCkge1xuICAgIHJldHVybiBsb2FkQ2FjaGVbdXJsXTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKHVybCwgZWxlbSkge1xuICAgIGlmICghbG9hZGVkKHVybCkpIHtcbiAgICAgICAgbG9hZENhY2hlW3VybF0gPSBlbGVtO1xuICAgIH1cbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVzIGFuIEVsZW1lbnQgd2l0aCBhIGdpdmVuIHR5cGUgYW5kIGEgbnVtYmVyIG9mIGF0dHJpYnV0ZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IFthdHRyaWJ1dGVzXVxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgYXR0cmlidXRlcyA9IHt9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cbiAgICBmb3IgKGxldCBhdHRyaWJ1dGVLZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGVLZXkpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVLZXksIGF0dHJpYnV0ZXNbYXR0cmlidXRlS2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbiIsImNvbnN0IGQgPSBkb2N1bWVudDtcbmNvbnN0IGdldEVsZW1lbnRzQnlUYWdOYW1lID0gJ2dldEVsZW1lbnRzQnlUYWdOYW1lJztcblxuLyoqXG4gKlxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkKCkge1xuICAgIHJldHVybiBkW2dldEVsZW1lbnRzQnlUYWdOYW1lXSgnaGVhZCcpWzBdIHx8IGQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG5jb25zdCBkZWZhdWx0UmVmcyA9IChkLmJvZHkgfHwgZ2V0SGVhZCgpKS5jaGlsZE5vZGVzO1xuY29uc3QgZGVmYXVsdFJlZiA9IGRlZmF1bHRSZWZzW2RlZmF1bHRSZWZzLmxlbmd0aCAtIDFdO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3JlZl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGVsZW1lbnQsIHJlZiA9IGRlZmF1bHRSZWYpIHtcbiAgICByZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgcmVmKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlYWR5U3RhdGUgPSAncmVhZHlTdGF0ZScsXG4gICAgb25yZWFkeXN0YXRlY2hhbmdlID0gJ29ucmVhZHlzdGF0ZWNoYW5nZScsXG4gICAgYWRkRXZlbnRMaXN0ZW5lciA9ICdhZGRFdmVudExpc3RlbmVyJztcblxuLyoqXG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudFByb21pc2UoZWxlbWVudCkge1xuICAgIGxldCBjb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGVsZW1lbnRQcm9taXNlcyhyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc3QgcmVqZWN0SGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNvbHZlSGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChlbGVtZW50W3JlYWR5U3RhdGVdKSB7XG4gICAgICAgICAgICBlbGVtZW50W29ucmVhZHlzdGF0ZWNoYW5nZV0gPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcGxldGUgJiYgKGVsZW1lbnRbcmVhZHlTdGF0ZV0gPT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudFthZGRFdmVudExpc3RlbmVyXSgnbG9hZCcsIHJlc29sdmVIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Vycm9yJywgcmVqZWN0SGFuZGxlcik7XG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Fib3J0JywgcmVqZWN0SGFuZGxlcik7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgKiBhcyBsb2FkU3RvcmFnZSBmcm9tICcuLi9sb2FkU3RvcmFnZSc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGluc2VydEVsZW1lbnQgZnJvbSAnLi9pbnNlcnRFbGVtZW50JztcbmltcG9ydCBsb2FkRWxlbWVudFByb21pc2UgZnJvbSAnLi9sb2FkRWxlbWVudFByb21pc2UnO1xuXG4vKipcbiAqIGxvYWRzIGEgamF2YXNjcmlwdCB1cmwgaWYgaXRzIG5vdCBsb2FkZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudCh1cmwsIHR5cGUsIGF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHR5cGUsIGF0dHJpYnV0ZXMpO1xuICAgIGxldCBsb2FkZWRFbGVtZW50ID0gbG9hZFN0b3JhZ2UubG9hZGVkKHVybCk7XG5cbiAgICBpZiAobG9hZGVkRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxvYWRlZEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IHAgPSBsb2FkRWxlbWVudFByb21pc2UoZWxlbWVudCk7XG5cbiAgICBwLnRoZW4oKGVsZW1lbnQpID0+IHtcbiAgICAgICAgbG9hZFN0b3JhZ2UucHVzaCh1cmwsIGVsZW1lbnQpO1xuICAgIH0sICgpPT57fSk7XG5cbiAgICBpbnNlcnRFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHA7XG59IiwiaW1wb3J0IGxvYWRFbGVtZW50IGZyb20gJy4vLi4vZnVuY3Rpb25zL2xvYWRFbGVtZW50JztcblxuLyoqXG4gKlxuICogQHBhcmFtIHVybFxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRKcyh1cmwpIHtcbiAgICByZXR1cm4gbG9hZEVsZW1lbnQodXJsLCAnc2NyaXB0Jywge1xuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3JjOiB1cmxcbiAgICB9KTtcbn1cbiIsImltcG9ydCBsb2FkRWxlbWVudCBmcm9tICcuLy4uL2Z1bmN0aW9ucy9sb2FkRWxlbWVudCc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWVkaWFdXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZENzcyh1cmwsIG1lZGlhID0gJ2FsbCcpIHtcbiAgICBjb25zdCBwID0gbG9hZEVsZW1lbnQodXJsLCAnbGluaycsIHtcbiAgICAgICAgdHlwZTogJ3RleHQvY3NzJyxcbiAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXG4gICAgICAgIGhyZWY6IHVybCxcbiAgICAgICAgbWVkaWE6ICdvbmx5IHgnXG4gICAgfSk7XG5cbiAgICBwLnRoZW4oZnVuY3Rpb24gYWZ0ZXJDc3NMb2FkKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5tZWRpYSA9IG1lZGlhOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSwgKCkgPT4ge1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHA7XG59XG4iLCIvKipcbiAqIENhcGl0YWxpemVzIHRoZSBmaXJzdCBsZXR0ZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSk7XG59IiwiaW1wb3J0IGxvYWRKcyBmcm9tICcuL2xvYWRlci9sb2FkSnMnO1xuaW1wb3J0IGxvYWRDc3MgZnJvbSAnLi9sb2FkZXIvbG9hZENzcyc7XG5pbXBvcnQgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIGZyb20gJy4vZnVuY3Rpb25zL2NhcGl0YWxpemVGaXJzdExldHRlcic7XG5cbmNvbnN0IGxvYWRlciA9IHtcbiAgICBsb2FkSnMsXG4gICAgbG9hZENzcyxcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB0eXBlXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZCh0eXBlKSB7XG4gICAgY29uc3QgbG9hZGVyTmFtZSA9ICdsb2FkJyArIGNhcGl0YWxpemVGaXJzdExldHRlcih0eXBlKTtcbiAgICBjb25zb2xlLmxvZyhsb2FkZXIpO1xuICAgIGNvbnNvbGUubG9nKGxvYWRlck5hbWUpO1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk6IFtdO1xuXG4gICAgcmV0dXJuIGxvYWRlcltsb2FkZXJOYW1lXS5hcHBseShudWxsLCBhcmdzKTtcbn1cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDBcbnZhciBtID0gcyAqIDYwXG52YXIgaCA9IG0gKiA2MFxudmFyIGQgPSBoICogMjRcbnZhciB5ID0gZCAqIDM2NS4yNVxuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbFxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/XG5cdFx0XHRmbXRMb25nKHZhbCkgOlxuXHRcdFx0Zm10U2hvcnQodmFsKVxuICB9XG4gIHRocm93IG5ldyBFcnJvcigndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICsgSlNPTi5zdHJpbmdpZnkodmFsKSlcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpXG4gIGlmIChzdHIubGVuZ3RoID4gMTAwMDApIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKHN0cilcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSlcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHlcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzXG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJ1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJ1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJ1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJ1xuICB9XG4gIHJldHVybiBtcyArICdtcydcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcydcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZVxuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncydcbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKG5hbWVzcGFjZXMgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnbGlnaHRzZWFncmVlbicsXG4gICdmb3Jlc3RncmVlbicsXG4gICdnb2xkZW5yb2QnLFxuICAnZG9kZ2VyYmx1ZScsXG4gICdkYXJrb3JjaGlkJyxcbiAgJ2NyaW1zb24nXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgdHlwZW9mIHdpbmRvdy5wcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQgJiYgJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAmJiB3aW5kb3cuY29uc29sZSAmJiAoY29uc29sZS5maXJlYnVnIHx8IChjb25zb2xlLmV4Y2VwdGlvbiAmJiBjb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiLy8gSW1wb3J0IGEgY291cGxlIG1vZHVsZXMgZm9yIHRlc3RpbmcuXG5pbXBvcnQgbG9hZCBmcm9tICcuL21vZHVsZXMvbG9hZCc7XG5cbi8vIEltcG9ydCBhIGxvZ2dlciBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5jb25zdCBsb2cgPSBkZWJ1ZygnYXBwOmxvZycpO1xuXG4vLyBUaGUgbG9nZ2VyIHNob3VsZCBvbmx5IGJlIGVuYWJsZWQgaWYgd2XigJlyZSBub3QgaW4gcHJvZHVjdGlvbi5cbmlmIChFTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIEVuYWJsZSB0aGUgbG9nZ2VyLlxuICAgIGRlYnVnLmVuYWJsZSgnKicpO1xuICAgIGxvZygnTG9nZ2luZyBpcyBlbmFibGVkIScpO1xufSBlbHNlIHtcbiAgICBkZWJ1Zy5kaXNhYmxlKCk7XG59XG5cbmxvZygnVGhhdCBpcyB2ZXJ5IGNvb2wnKTtcblxubG9hZCgnanMnLCAnLi4vZGlzdC9jb3JlLmpzJykudGhlbigoKSA9PiB7XG4gICAgbG9nKCdsb2Rhc2ggbG9hZGVkJyk7XG59KS5jYXRjaCgoKSA9PiB7XG4gICAgbG9nKCdsb2Rhc2ggZmFpbGVkJyk7XG59KTtcblxubG9hZCgnY3NzJywgJ3Rlc3QuY3NzJyk7Il0sIm5hbWVzIjpbImxvYWRDYWNoZSIsImxvYWRlZCIsInVybCIsInB1c2giLCJlbGVtIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhdHRyaWJ1dGVzIiwiZWxlbWVudCIsImRvY3VtZW50IiwiYXR0cmlidXRlS2V5IiwiaGFzT3duUHJvcGVydHkiLCJzZXRBdHRyaWJ1dGUiLCJkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRIZWFkIiwiZG9jdW1lbnRFbGVtZW50IiwiZGVmYXVsdFJlZnMiLCJib2R5IiwiY2hpbGROb2RlcyIsImRlZmF1bHRSZWYiLCJsZW5ndGgiLCJyZWYiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVhZHlTdGF0ZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2FkRWxlbWVudFByb21pc2UiLCJjb21wbGV0ZSIsIlByb21pc2UiLCJlbGVtZW50UHJvbWlzZXMiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVqZWN0SGFuZGxlciIsInJlamVjdENiIiwiZXJyb3IiLCJyZXNvbHZlSGFuZGxlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZUhhbmRsZXIiLCJsb2FkRWxlbWVudCIsImxvYWRlZEVsZW1lbnQiLCJsb2FkU3RvcmFnZSIsInAiLCJ0aGVuIiwibG9hZEpzIiwibG9hZENzcyIsIm1lZGlhIiwiYWZ0ZXJDc3NMb2FkIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwidGV4dCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJsb2FkZXIiLCJsb2FkIiwibG9hZGVyTmFtZSIsImxvZyIsImFyZ3MiLCJhcmd1bWVudHMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJhcHBseSIsInJlcXVpcmUkJDAiLCJpbmRleCIsImRlYnVnIiwiRU5WIiwiZW5hYmxlIiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7O0FBSUEsSUFBTUEsWUFBWSxFQUFsQjs7Ozs7Ozs7QUFRQSxBQUFPLFNBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO1NBQ2pCRixVQUFVRSxHQUFWLENBQVA7Ozs7Ozs7O0FBUUosQUFBTyxTQUFTQyxJQUFULENBQWNELEdBQWQsRUFBbUJFLElBQW5CLEVBQXlCO01BQ3hCLENBQUNILE9BQU9DLEdBQVAsQ0FBTCxFQUFrQjtjQUNKQSxHQUFWLElBQWlCRSxJQUFqQjs7OztBQ3ZCUjs7Ozs7OztBQU9BLEFBQWUsU0FBU0MsYUFBVCxDQUF1QkMsSUFBdkIsRUFBOEM7UUFBakJDLFVBQWlCLHVFQUFKLEVBQUk7O1FBQ25EQyxVQUFVQyxTQUFTSixhQUFULENBQXVCQyxJQUF2QixDQUFoQjs7U0FFSyxJQUFJSSxZQUFULElBQXlCSCxVQUF6QixFQUFxQztZQUM3QkEsV0FBV0ksY0FBWCxDQUEwQkQsWUFBMUIsQ0FBSixFQUE2QztvQkFDakNFLFlBQVIsQ0FBcUJGLFlBQXJCLEVBQW1DSCxXQUFXRyxZQUFYLENBQW5DOzs7O1dBSURGLE9BQVA7OztBQ2hCSixJQUFNSyxJQUFJSixRQUFWO0FBQ0EsSUFBTUssdUJBQXVCLHNCQUE3Qjs7Ozs7O0FBTUEsQUFBTyxTQUFTQyxPQUFULEdBQW1CO1NBQ2ZGLEVBQUVDLG9CQUFGLEVBQXdCLE1BQXhCLEVBQWdDLENBQWhDLEtBQXNDRCxFQUFFRyxlQUEvQzs7O0FBR0osSUFBTUMsY0FBYyxDQUFDSixFQUFFSyxJQUFG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
