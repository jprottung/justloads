(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * Implements a
 */
var Storage = function () {
    /**
     *
     */
    function Storage() {
        classCallCheck(this, Storage);

        /**
         *
         * @type {Object.<string, Element>}
         */
        this.cache = {};
    }

    /**
     *
     * @param url
     * @return {Element}
     */


    createClass(Storage, [{
        key: "loaded",
        value: function loaded(url) {
            return this.cache[url];
        }

        /**
         *
         * @param {string} url
         * @param {Element} elem
         */

    }, {
        key: "push",
        value: function push(url, elem) {
            if (!this.loaded(url)) {
                this.cache[url] = elem;
            }
        }

        /**
         *
         * @param {string} url
         */

    }, {
        key: "remove",
        value: function remove(url) {
            if (this.loaded(url)) {
                delete this.cache[url];
            }
        }
    }]);
    return Storage;
}();

var loadStorage = new Storage();

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

function loadElement(url, type) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var element = createElement(type, attributes);
    var loadedElement = loadStorage.loaded(url);

    if (loadedElement) {
        return Promise.resolve(loadedElement);
    }

    var p = loadElementPromise(element);

    p.then(function (element) {
        return loadStorage.push(url, element);
    }, function () {});

    insertElement(element);

    return p;
}

function loadJs(url) {
    return loadElement(url, 'script', {
        async: true,
        src: url
    });
}

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
    // console.log(loader);
    // console.log(loaderName);
    var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];

    return loader[loaderName].apply(null, args);
}

/**
 *
 * @return {boolean}
 */

function preloadSupport() {
    try {
        return window.document.createElement('link').relList.supports('preload');
    } catch (e) {
        return false;
    }
}

var w = window;

/**
 *
 */
function polyfill() {
    var links = w.document.getElementsByTagName('link');

    for (var i = 0; i < links.length; i += 1) {
        var link = links[i];

        if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
            loadCss(link.href);
            link.rel = null;
        }
    }
}

/**
 *
 */
function preloadPolyfill() {
    if (!preloadSupport()) {
        polyfill();
        var run = w.setInterval(polyfill, 300);

        w.addEventListener('load', function () {
            polyfill();
            w.clearInterval(run);
        });
    }
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
var log$$1 = browser$1('app:log');

// The logger should only be enabled if we’re not in production.
{
    // Enable the logger.
    browser$1.enable('*');
    log$$1('Logging is enabled!');
}

log$$1('That is very cool');

preloadPolyfill();

load('js', '../dist/core.js').then(function () {
    log$$1('lodash loaded');
}).catch(function () {
    log$$1('lodash failed');
});

load('css', 'test.css');

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdGxvYWRzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9TdG9yYWdlLmpzIiwiLi4vc3JjL21vZHVsZXMvc2VydmljZXMvTG9hZFN0b3JhZ2VTZXJ2aWNlLmpzIiwiLi4vc3JjL21vZHVsZXMvZnVuY3Rpb25zL2NyZWF0ZUVsZW1lbnQuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvaW5zZXJ0RWxlbWVudC5qcyIsIi4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9ucy9sb2FkRWxlbWVudFByb21pc2UuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvbG9hZEVsZW1lbnQuanMiLCIuLi9zcmMvbW9kdWxlcy9sb2FkZXIvbG9hZEpzLmpzIiwiLi4vc3JjL21vZHVsZXMvbG9hZGVyL2xvYWRDc3MuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLmpzIiwiLi4vc3JjL21vZHVsZXMvbG9hZC5qcyIsIi4uL3NyYy9tb2R1bGVzL2ZlYXR1cmVzL3ByZWxvYWRTdXBwb3J0LmpzIiwiLi4vc3JjL21vZHVsZXMvcHJlbG9hZFBvbHlmaWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEltcGxlbWVudHMgYVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCBFbGVtZW50Pn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqL1xuICAgIGxvYWRlZCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbdXJsXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAgICAgKi9cbiAgICBwdXNoKHVybCwgZWxlbSkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKHVybCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IGVsZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICByZW1vdmUodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCh1cmwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVt1cmxdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi4vU3RvcmFnZSc7XG5cbmNvbnN0IGxvYWRTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN0b3JhZ2U7XG4iLCIvKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudCB3aXRoIGEgZ2l2ZW4gdHlwZSBhbmQgYSBudW1iZXIgb2YgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdXG4gKiBAcmV0dXJucyB7RWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgIGZvciAobGV0IGF0dHJpYnV0ZUtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZUtleSkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZUtleSwgYXR0cmlidXRlc1thdHRyaWJ1dGVLZXldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuIiwiXG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHtFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGVhZCgpIHtcbiAgICByZXR1cm4gZFtnZXRFbGVtZW50c0J5VGFnTmFtZV0oJ2hlYWQnKVswXSB8fCBkLmRvY3VtZW50RWxlbWVudDtcbn1cblxuY29uc3QgZGVmYXVsdFJlZnMgPSAoZC5ib2R5IHx8IGdldEhlYWQoKSkuY2hpbGROb2RlcztcbmNvbnN0IGRlZmF1bHRSZWYgPSBkZWZhdWx0UmVmc1tkZWZhdWx0UmVmcy5sZW5ndGggLSAxXTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IFtyZWZdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlbGVtZW50LCByZWYgPSBkZWZhdWx0UmVmKSB7XG4gICAgcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHJlZik7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuLyoqXG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudFByb21pc2UoZWxlbWVudCkge1xuICAgIGxldCBjb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGVsZW1lbnRQcm9taXNlcyhyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc3QgcmVqZWN0SGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNvbHZlSGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChlbGVtZW50W3JlYWR5U3RhdGVdKSB7XG4gICAgICAgICAgICBlbGVtZW50W29ucmVhZHlzdGF0ZWNoYW5nZV0gPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcGxldGUgJiYgKGVsZW1lbnRbcmVhZHlTdGF0ZV0gPT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudFthZGRFdmVudExpc3RlbmVyXSgnbG9hZCcsIHJlc29sdmVIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Vycm9yJywgcmVqZWN0SGFuZGxlcik7XG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Fib3J0JywgcmVqZWN0SGFuZGxlcik7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgbG9hZFN0b3JhZ2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL0xvYWRTdG9yYWdlU2VydmljZSc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGluc2VydEVsZW1lbnQgZnJvbSAnLi9pbnNlcnRFbGVtZW50JztcbmltcG9ydCBsb2FkRWxlbWVudFByb21pc2UgZnJvbSAnLi9sb2FkRWxlbWVudFByb21pc2UnO1xuXG4vKipcbiAqIGxvYWRzIGEgamF2YXNjcmlwdCB1cmwgaWYgaXRzIG5vdCBsb2FkZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudCh1cmwsIHR5cGUsIGF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHR5cGUsIGF0dHJpYnV0ZXMpO1xuICAgIGxldCBsb2FkZWRFbGVtZW50ID0gbG9hZFN0b3JhZ2VTZXJ2aWNlLmxvYWRlZCh1cmwpO1xuXG4gICAgaWYgKGxvYWRlZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsb2FkZWRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBwID0gbG9hZEVsZW1lbnRQcm9taXNlKGVsZW1lbnQpO1xuXG4gICAgcC50aGVuKGVsZW1lbnQgPT4gbG9hZFN0b3JhZ2VTZXJ2aWNlLnB1c2godXJsLCBlbGVtZW50KSwgKCkgPT4ge1xuICAgIH0pO1xuXG4gICAgaW5zZXJ0RWxlbWVudChlbGVtZW50KTtcblxuICAgIHJldHVybiBwO1xufSIsImltcG9ydCBsb2FkRWxlbWVudCBmcm9tICcuLy4uL2Z1bmN0aW9ucy9sb2FkRWxlbWVudCc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSnModXJsKSB7XG4gICAgcmV0dXJuIGxvYWRFbGVtZW50KHVybCwgJ3NjcmlwdCcsIHtcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHNyYzogdXJsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgbG9hZEVsZW1lbnQgZnJvbSAnLi8uLi9mdW5jdGlvbnMvbG9hZEVsZW1lbnQnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhXVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRDc3ModXJsLCBtZWRpYSA9ICdhbGwnKSB7XG4gICAgY29uc3QgcCA9IGxvYWRFbGVtZW50KHVybCwgJ2xpbmsnLCB7XG4gICAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXG4gICAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICBocmVmOiB1cmwsXG4gICAgICAgIG1lZGlhOiAnb25seSB4J1xuICAgIH0pO1xuXG4gICAgcC50aGVuKGZ1bmN0aW9uIGFmdGVyQ3NzTG9hZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQubWVkaWEgPSBtZWRpYTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0sICgpID0+IHtcbiAgICB9KTtcblxuICAgIHJldHVybiBwO1xufVxuIiwiLyoqXG4gKiBDYXBpdGFsaXplcyB0aGUgZmlyc3QgbGV0dGVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcih0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xufSIsImltcG9ydCBsb2FkSnMgZnJvbSAnLi9sb2FkZXIvbG9hZEpzJztcbmltcG9ydCBsb2FkQ3NzIGZyb20gJy4vbG9hZGVyL2xvYWRDc3MnO1xuaW1wb3J0IGNhcGl0YWxpemVGaXJzdExldHRlciBmcm9tICcuL2Z1bmN0aW9ucy9jYXBpdGFsaXplRmlyc3RMZXR0ZXInO1xuXG5jb25zdCBsb2FkZXIgPSB7XG4gICAgbG9hZEpzLFxuICAgIGxvYWRDc3MsXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gdHlwZVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWQodHlwZSkge1xuICAgIGNvbnN0IGxvYWRlck5hbWUgPSAnbG9hZCcgKyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIodHlwZSk7XG4gICAgLy8gY29uc29sZS5sb2cobG9hZGVyKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsb2FkZXJOYW1lKTtcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOiBbXTtcblxuICAgIHJldHVybiBsb2FkZXJbbG9hZGVyTmFtZV0uYXBwbHkobnVsbCwgYXJncyk7XG59XG4iLCIvKipcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZWxvYWRTdXBwb3J0KCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICAucmVsTGlzdFxuICAgICAgICAgICAgLnN1cHBvcnRzKCdwcmVsb2FkJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCBwcmVsb2FkU3VwcG9ydCBmcm9tICcuL2ZlYXR1cmVzL3ByZWxvYWRTdXBwb3J0JztcbmltcG9ydCBsb2FkQ3NzIGZyb20gJy4vbG9hZGVyL2xvYWRDc3MnO1xuXG5jb25zdCB3ID0gd2luZG93O1xuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIGNvbnN0IGxpbmtzID0gdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBsZXQgbGluayA9IGxpbmtzW2ldO1xuXG4gICAgICAgIGlmIChsaW5rLnJlbCA9PT0gJ3ByZWxvYWQnICYmIGxpbmsuZ2V0QXR0cmlidXRlKCdhcycpID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBsb2FkQ3NzKGxpbmsuaHJlZik7XG4gICAgICAgICAgICBsaW5rLnJlbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlbG9hZFBvbHlmaWxsKCkge1xuICAgIGlmICghcHJlbG9hZFN1cHBvcnQoKSkge1xuICAgICAgICBwb2x5ZmlsbCgpO1xuICAgICAgICBsZXQgcnVuID0gdy5zZXRJbnRlcnZhbChwb2x5ZmlsbCwgMzAwKTtcblxuICAgICAgICB3LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBwb2x5ZmlsbCgpO1xuICAgICAgICAgICAgdy5jbGVhckludGVydmFsKHJ1bik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwXG52YXIgbSA9IHMgKiA2MFxudmFyIGggPSBtICogNjBcbnZhciBkID0gaCAqIDI0XG52YXIgeSA9IGQgKiAzNjUuMjVcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWxcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbClcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgP1xuXHRcdFx0Zm10TG9uZyh2YWwpIDpcblx0XHRcdGZtdFNob3J0KHZhbClcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArIEpTT04uc3RyaW5naWZ5KHZhbCkpXG59XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKVxuICBpZiAoc3RyLmxlbmd0aCA+IDEwMDAwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhzdHIpXG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pXG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKClcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZFxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaFxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbVxuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogc1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCdcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCdcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSdcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncydcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnXG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnXG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWVcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnXG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9IChuYW1lc3BhY2VzIHx8ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHR5cGVvZiB3aW5kb3cucHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50ICYmICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgd2luZG93LmNvbnNvbGUgJiYgKGNvbnNvbGUuZmlyZWJ1ZyB8fCAoY29uc29sZS5leGNlcHRpb24gJiYgY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIi8vIEltcG9ydCBhIGNvdXBsZSBtb2R1bGVzIGZvciB0ZXN0aW5nLlxuaW1wb3J0IGxvYWQgZnJvbSAnLi9tb2R1bGVzL2xvYWQnO1xuaW1wb3J0IHByZWxvYWRQb2x5ZmlsbCBmcm9tICcuL21vZHVsZXMvcHJlbG9hZFBvbHlmaWxsJztcblxuLy8gSW1wb3J0IGEgbG9nZ2VyIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdhcHA6bG9nJyk7XG5cbi8vIFRoZSBsb2dnZXIgc2hvdWxkIG9ubHkgYmUgZW5hYmxlZCBpZiB3ZeKAmXJlIG5vdCBpbiBwcm9kdWN0aW9uLlxuaWYgKEVOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gRW5hYmxlIHRoZSBsb2dnZXIuXG4gICAgZGVidWcuZW5hYmxlKCcqJyk7XG4gICAgbG9nKCdMb2dnaW5nIGlzIGVuYWJsZWQhJyk7XG59IGVsc2Uge1xuICAgIGRlYnVnLmRpc2FibGUoKTtcbn1cblxubG9nKCdUaGF0IGlzIHZlcnkgY29vbCcpO1xuXG5wcmVsb2FkUG9seWZpbGwoKTtcblxubG9hZCgnanMnLCAnLi4vZGlzdC9jb3JlLmpzJykudGhlbigoKSA9PiB7XG4gICAgbG9nKCdsb2Rhc2ggbG9hZGVkJyk7XG59KS5jYXRjaCgoKSA9PiB7XG4gICAgbG9nKCdsb2Rhc2ggZmFpbGVkJyk7XG59KTtcblxubG9hZCgnY3NzJywgJ3Rlc3QuY3NzJyk7Il0sIm5hbWVzIjpbIlN0b3JhZ2UiLCJjYWNoZSIsInVybCIsImVsZW0iLCJsb2FkZWQiLCJsb2FkU3RvcmFnZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYXR0cmlidXRlcyIsImVsZW1lbnQiLCJkb2N1bWVudCIsImF0dHJpYnV0ZUtleSIsImhhc093blByb3BlcnR5Iiwic2V0QXR0cmlidXRlIiwiZ2V0SGVhZCIsImQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImRvY3VtZW50RWxlbWVudCIsImRlZmF1bHRSZWZzIiwiYm9keSIsImNoaWxkTm9kZXMiLCJkZWZhdWx0UmVmIiwibGVuZ3RoIiwicmVmIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImxvYWRFbGVtZW50UHJvbWlzZSIsImNvbXBsZXRlIiwiUHJvbWlzZSIsImVsZW1lbnRQcm9taXNlcyIsInJlc29sdmUiLCJyZWplY3QiLCJyZWplY3RIYW5kbGVyIiwicmVqZWN0Q2IiLCJlcnJvciIsInJlc29sdmVIYW5kbGVyIiwicmVhZHlTdGF0ZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZUhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibG9hZEVsZW1lbnQiLCJsb2FkZWRFbGVtZW50IiwibG9hZFN0b3JhZ2VTZXJ2aWNlIiwicCIsInRoZW4iLCJwdXNoIiwibG9hZEpzIiwibG9hZENzcyIsIm1lZGlhIiwiYWZ0ZXJDc3NMb2FkIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwidGV4dCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJsb2FkZXIiLCJsb2FkIiwibG9hZGVyTmFtZSIsImFyZ3MiLCJhcmd1bWVudHMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJhcHBseSIsInByZWxvYWRTdXBwb3J0Iiwid2luZG93IiwicmVsTGlzdCIsInN1cHBvcnRzIiwiZSIsInciLCJwb2x5ZmlsbCIsImxpbmtzIiwiaSIsImxpbmsiLCJyZWwiLCJnZXRBdHRyaWJ1dGUiLCJocmVmIiwicHJlbG9hZFBvbHlmaWxsIiwicnVuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicmVxdWlyZSQkMCIsImluZGV4IiwibG9nIiwiZGVidWciLCJFTlYiLCJlbmFibGUiLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdxQkE7Ozs7dUJBSUg7Ozs7Ozs7YUFLTEMsS0FBTCxHQUFhLEVBQWI7Ozs7Ozs7Ozs7OzsrQkFRR0MsS0FBSzttQkFDRCxLQUFLRCxLQUFMLENBQVdDLEdBQVgsQ0FBUDs7Ozs7Ozs7Ozs7NkJBUUNBLEtBQUtDLE1BQU07Z0JBQ1IsQ0FBQyxLQUFLQyxNQUFMLENBQVlGLEdBQVosQ0FBTCxFQUF1QjtxQkFDZEQsS0FBTCxDQUFXQyxHQUFYLElBQWtCQyxJQUFsQjs7Ozs7Ozs7Ozs7K0JBUURELEtBQUs7Z0JBQ0osS0FBS0UsTUFBTCxDQUFZRixHQUFaLENBQUosRUFBc0I7dUJBQ1gsS0FBS0QsS0FBTCxDQUFXQyxHQUFYLENBQVA7Ozs7Ozs7QUN2Q1osSUFBTUcsY0FBYyxJQUFJTCxPQUFKLEVBQXBCLENBRUE7O0FDSkE7Ozs7Ozs7QUFPQSxBQUFlLFNBQVNNLGFBQVQsQ0FBdUJDLElBQXZCLEVBQThDO1FBQWpCQyxVQUFpQix1RUFBSixFQUFJOztRQUNuREMsVUFBVUMsU0FBU0osYUFBVCxDQUF1QkMsSUFBdkIsQ0FBaEI7O1NBRUssSUFBSUksWUFBVCxJQUF5QkgsVUFBekIsRUFBcUM7WUFDN0JBLFdBQVdJLGNBQVgsQ0FBMEJELFlBQTFCLENBQUosRUFBNkM7b0JBQ2pDRSxZQUFSLENBQXFCRixZQUFyQixFQUFtQ0gsV0FBV0csWUFBWCxDQUFuQzs7OztXQUlERixPQUFQOzs7QUNkSjs7OztBQUlBLEFBQU8sU0FBU0ssT0FBVCxHQUFtQjtTQUNmQyxFQUFFQyxvQkFBRixFQUF3QixNQUF4QixFQUFnQyxDQUFoQyxLQUFzQ0QsRUFBRUUsZUFBL0M7OztBQUdKLElBQU1DLGNBQWMsQ0FBQ0gsRUFBRUksSUFBRixJQUFVTCxT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
