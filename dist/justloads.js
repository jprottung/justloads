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
      Object.defineProperty(target, descriptor._key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
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
        _key: "loaded",
        value: function loaded(url) {
            return this.cache[url];
        }

        /**
         *
         * @param {string} url
         * @param {Element} elem
         */

    }, {
        _key: "push",
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
        _key: "remove",
        value: function remove(url) {
            if (this.loaded(url)) {
                delete this.cache[url];
            }
        }
    }]);
    return Storage;
}();

var loadStorage = new Storage();

var d = document;
var w = window;
var getElementsByTagName = 'getElementsByTagName';
var readyState = 'readyState';
var onreadystatechange = 'onreadystatechange';

var _marked = [entries].map(regeneratorRuntime.mark);

/**
 * generates an generator for better loop through object entries
 *
 * @param {Object} obj
 */
function entries(obj) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

    return regeneratorRuntime.wrap(function entries$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = Object.keys(obj)[Symbol.iterator]();

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 12;
                        break;
                    }

                    key = _step.value;
                    _context.next = 9;
                    return [key, obj[key]];

                case 9:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                case 12:
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 18:
                    _context.prev = 18;
                    _context.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 21:
                    _context.prev = 21;

                    if (!_didIteratorError) {
                        _context.next = 24;
                        break;
                    }

                    throw _iteratorError;

                case 24:
                    return _context.finish(21);

                case 25:
                    return _context.finish(18);

                case 26:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
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

    var element = d.createElement(type);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = entries(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            element.setAttribute(key, value);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return element;
}

/**
 * gets the element head
 * @returns {Element}
 */
function getHead() {
  return d[getElementsByTagName]('head')[0] || d.documentElement;
}

var defaultRefs = (d.body || getHead()).childNodes;
var defaultRef = defaultRefs[defaultRefs.length - 1];

/**
 * inserts an element before the given ref or if no reference is given as the last element
 * of the body or head depending on what is already registered
 * @param {Element} element
 * @param {Element} [ref]
 */
function insertElement(element) {
  var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRef;

  ref.parentNode.insertBefore(element, ref);
}

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
    var loadedElement = loadStorage.loaded(url);

    if (loadedElement) {
        return Promise.resolve(loadedElement);
    }

    var promise = loadElementPromise(element);

    promise.then(function (element) {
        return loadStorage.push(url, element);
    }, function () {});

    insertElement(element);

    return promise;
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
    var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];

    return loader[loaderName].apply(null, args);
}

/**
 * checks whether a browser supports pre loading styles or not
 *
 * @return {boolean}
 */
function preloadSupport() {
    try {
        return createElement('link').relList.supports('preload');
    } catch (e) {
        return false;
    }
}

/**
 *
 */
function polyfill() {
    var links = d.getElementsByTagName('link');

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

// Import a couple modules for testing.
preloadPolyfill();

load('js', '../dist/core.js').then(function () {}).catch(function () {});

load('css', 'test.css');

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdGxvYWRzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9TdG9yYWdlLmpzIiwiLi4vc3JjL21vZHVsZXMvc2VydmljZXMvTG9hZFN0b3JhZ2VTZXJ2aWNlLmpzIiwiLi4vc3JjL21vZHVsZXMvY29uc3RhbnRzL2dsb2JhbC5qcyIsIi4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9ucy9lbnRyaWVzLmpzIiwiLi4vc3JjL21vZHVsZXMvZnVuY3Rpb25zL2NyZWF0ZUVsZW1lbnQuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvaW5zZXJ0RWxlbWVudC5qcyIsIi4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9ucy9sb2FkRWxlbWVudFByb21pc2UuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvbG9hZEVsZW1lbnQuanMiLCIuLi9zcmMvbW9kdWxlcy9sb2FkZXIvbG9hZEpzLmpzIiwiLi4vc3JjL21vZHVsZXMvbG9hZGVyL2xvYWRDc3MuanMiLCIuLi9zcmMvbW9kdWxlcy9mdW5jdGlvbnMvY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLmpzIiwiLi4vc3JjL21vZHVsZXMvbG9hZC5qcyIsIi4uL3NyYy9tb2R1bGVzL2ZlYXR1cmVzL3ByZWxvYWRTdXBwb3J0LmpzIiwiLi4vc3JjL21vZHVsZXMvcHJlbG9hZFBvbHlmaWxsLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSW1wbGVtZW50cyBhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIEVsZW1lbnQ+fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9O1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqL1xuICAgIGxvYWRlZCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbdXJsXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAgICAgKi9cbiAgICBwdXNoKHVybCwgZWxlbSkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKHVybCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IGVsZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICByZW1vdmUodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCh1cmwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVt1cmxdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi4vU3RvcmFnZSc7XG5cbmNvbnN0IGxvYWRTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN0b3JhZ2U7XG4iLCJcbmV4cG9ydCBjb25zdCBkID0gZG9jdW1lbnQ7XG5leHBvcnQgY29uc3QgdyA9IHdpbmRvdztcbmV4cG9ydCBjb25zdCBnZXRFbGVtZW50c0J5VGFnTmFtZSA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSc7XG5leHBvcnQgY29uc3QgcmVhZHlTdGF0ZSA9ICdyZWFkeVN0YXRlJztcbmV4cG9ydCBjb25zdCBvbnJlYWR5c3RhdGVjaGFuZ2UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJzsiLCIvKipcbiAqIGdlbmVyYXRlcyBhbiBnZW5lcmF0b3IgZm9yIGJldHRlciBsb29wIHRocm91Z2ggb2JqZWN0IGVudHJpZXNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiBlbnRyaWVzKG9iaikge1xuICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgICAgIHlpZWxkIFtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG9ialtrZXldXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZCB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2dsb2JhbCc7XG5pbXBvcnQgZW50cmllcyBmcm9tICcuL2VudHJpZXMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudCB3aXRoIGEgZ2l2ZW4gdHlwZSBhbmQgYSBudW1iZXIgb2YgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdXG4gKiBAcmV0dXJucyB7RWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG4iLCJpbXBvcnQge2QsIGdldEVsZW1lbnRzQnlUYWdOYW1lfSBmcm9tICcuLy4uL2NvbnN0YW50cy9nbG9iYWwnO1xuXG4vKipcbiAqIGdldHMgdGhlIGVsZW1lbnQgaGVhZFxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkKCkge1xuICAgIHJldHVybiBkW2dldEVsZW1lbnRzQnlUYWdOYW1lXSgnaGVhZCcpWzBdIHx8IGQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG5jb25zdCBkZWZhdWx0UmVmcyA9IChkLmJvZHkgfHwgZ2V0SGVhZCgpKS5jaGlsZE5vZGVzO1xuY29uc3QgZGVmYXVsdFJlZiA9IGRlZmF1bHRSZWZzW2RlZmF1bHRSZWZzLmxlbmd0aCAtIDFdO1xuXG4vKipcbiAqIGluc2VydHMgYW4gZWxlbWVudCBiZWZvcmUgdGhlIGdpdmVuIHJlZiBvciBpZiBubyByZWZlcmVuY2UgaXMgZ2l2ZW4gYXMgdGhlIGxhc3QgZWxlbWVudFxuICogb2YgdGhlIGJvZHkgb3IgaGVhZCBkZXBlbmRpbmcgb24gd2hhdCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBbcmVmXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnNlcnRFbGVtZW50KGVsZW1lbnQsIHJlZiA9IGRlZmF1bHRSZWYpIHtcbiAgICByZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgcmVmKTtcbn0iLCJpbXBvcnQge3JlYWR5U3RhdGUsIG9ucmVhZHlzdGF0ZWNoYW5nZX0gZnJvbSAnLi8uLi9jb25zdGFudHMvZ2xvYmFsJztcblxuLyoqXG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudFByb21pc2UoZWxlbWVudCkge1xuICAgIGxldCBjb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGVsZW1lbnRQcm9taXNlcyhyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc3QgcmVqZWN0SGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNvbHZlSGFuZGxlciA9IGZ1bmN0aW9uIHJlamVjdENiKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChlbGVtZW50W3JlYWR5U3RhdGVdKSB7XG4gICAgICAgICAgICBlbGVtZW50W29ucmVhZHlzdGF0ZWNoYW5nZV0gPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcGxldGUgJiYgKGVsZW1lbnRbcmVhZHlTdGF0ZV0gPT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudFthZGRFdmVudExpc3RlbmVyXSgnbG9hZCcsIHJlc29sdmVIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Vycm9yJywgcmVqZWN0SGFuZGxlcik7XG4gICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2Fib3J0JywgcmVqZWN0SGFuZGxlcik7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgbG9hZFN0b3JhZ2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL0xvYWRTdG9yYWdlU2VydmljZSc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGluc2VydEVsZW1lbnQgZnJvbSAnLi9pbnNlcnRFbGVtZW50JztcbmltcG9ydCBsb2FkRWxlbWVudFByb21pc2UgZnJvbSAnLi9sb2FkRWxlbWVudFByb21pc2UnO1xuXG4vKipcbiAqIGxvYWRzIGEgamF2YXNjcmlwdCB1cmwgaWYgaXRzIG5vdCBsb2FkZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRWxlbWVudCh1cmwsIHR5cGUsIGF0dHJpYnV0ZXMgPSB7fSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHR5cGUsIGF0dHJpYnV0ZXMpO1xuICAgIGxldCBsb2FkZWRFbGVtZW50ID0gbG9hZFN0b3JhZ2VTZXJ2aWNlLmxvYWRlZCh1cmwpO1xuXG4gICAgaWYgKGxvYWRlZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsb2FkZWRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlID0gbG9hZEVsZW1lbnRQcm9taXNlKGVsZW1lbnQpO1xuXG4gICAgcHJvbWlzZS50aGVuKGVsZW1lbnQgPT4gbG9hZFN0b3JhZ2VTZXJ2aWNlLnB1c2godXJsLCBlbGVtZW50KSwgKCkgPT4ge1xuICAgIH0pO1xuXG4gICAgaW5zZXJ0RWxlbWVudChlbGVtZW50KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xufSIsImltcG9ydCBsb2FkRWxlbWVudCBmcm9tICcuLy4uL2Z1bmN0aW9ucy9sb2FkRWxlbWVudCc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSnModXJsKSB7XG4gICAgcmV0dXJuIGxvYWRFbGVtZW50KHVybCwgJ3NjcmlwdCcsIHtcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHNyYzogdXJsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgbG9hZEVsZW1lbnQgZnJvbSAnLi8uLi9mdW5jdGlvbnMvbG9hZEVsZW1lbnQnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhXVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRDc3ModXJsLCBtZWRpYSA9ICdhbGwnKSB7XG4gICAgY29uc3QgcCA9IGxvYWRFbGVtZW50KHVybCwgJ2xpbmsnLCB7XG4gICAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXG4gICAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICBocmVmOiB1cmwsXG4gICAgICAgIG1lZGlhOiAnb25seSB4J1xuICAgIH0pO1xuXG4gICAgcC50aGVuKGZ1bmN0aW9uIGFmdGVyQ3NzTG9hZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQubWVkaWEgPSBtZWRpYTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0sICgpID0+IHtcbiAgICB9KTtcblxuICAgIHJldHVybiBwO1xufVxuIiwiLyoqXG4gKiBDYXBpdGFsaXplcyB0aGUgZmlyc3QgbGV0dGVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcih0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xufSIsImltcG9ydCBsb2FkSnMgZnJvbSAnLi9sb2FkZXIvbG9hZEpzJztcbmltcG9ydCBsb2FkQ3NzIGZyb20gJy4vbG9hZGVyL2xvYWRDc3MnO1xuaW1wb3J0IGNhcGl0YWxpemVGaXJzdExldHRlciBmcm9tICcuL2Z1bmN0aW9ucy9jYXBpdGFsaXplRmlyc3RMZXR0ZXInO1xuXG5jb25zdCBsb2FkZXIgPSB7XG4gICAgbG9hZEpzLFxuICAgIGxvYWRDc3MsXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gdHlwZVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWQodHlwZSkge1xuICAgIGNvbnN0IGxvYWRlck5hbWUgPSAnbG9hZCcgKyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIodHlwZSk7XG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTogW107XG5cbiAgICByZXR1cm4gbG9hZGVyW2xvYWRlck5hbWVdLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi8uLi9mdW5jdGlvbnMvY3JlYXRlRWxlbWVudCc7XG5cbi8qKlxuICogY2hlY2tzIHdoZXRoZXIgYSBicm93c2VyIHN1cHBvcnRzIHByZSBsb2FkaW5nIHN0eWxlcyBvciBub3RcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVsb2FkU3VwcG9ydCgpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICAucmVsTGlzdFxuICAgICAgICAgICAgLnN1cHBvcnRzKCdwcmVsb2FkJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCBwcmVsb2FkU3VwcG9ydCBmcm9tICcuL2ZlYXR1cmVzL3ByZWxvYWRTdXBwb3J0JztcbmltcG9ydCBsb2FkQ3NzIGZyb20gJy4vbG9hZGVyL2xvYWRDc3MnO1xuaW1wb3J0IHt3LCBkfSBmcm9tICcuL2NvbnN0YW50cy9nbG9iYWwnO1xuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBsZXQgbGluayA9IGxpbmtzW2ldO1xuXG4gICAgICAgIGlmIChsaW5rLnJlbCA9PT0gJ3ByZWxvYWQnICYmIGxpbmsuZ2V0QXR0cmlidXRlKCdhcycpID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBsb2FkQ3NzKGxpbmsuaHJlZik7XG4gICAgICAgICAgICBsaW5rLnJlbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlbG9hZFBvbHlmaWxsKCkge1xuICAgIGlmICghcHJlbG9hZFN1cHBvcnQoKSkge1xuICAgICAgICBwb2x5ZmlsbCgpO1xuICAgICAgICBsZXQgcnVuID0gdy5zZXRJbnRlcnZhbChwb2x5ZmlsbCwgMzAwKTtcblxuICAgICAgICB3LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBwb2x5ZmlsbCgpO1xuICAgICAgICAgICAgdy5jbGVhckludGVydmFsKHJ1bik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvLyBJbXBvcnQgYSBjb3VwbGUgbW9kdWxlcyBmb3IgdGVzdGluZy5cbmltcG9ydCBsb2FkIGZyb20gJy4vbW9kdWxlcy9sb2FkJztcbmltcG9ydCBwcmVsb2FkUG9seWZpbGwgZnJvbSAnLi9tb2R1bGVzL3ByZWxvYWRQb2x5ZmlsbCc7XG5cbnByZWxvYWRQb2x5ZmlsbCgpO1xuXG5sb2FkKCdqcycsICcuLi9kaXN0L2NvcmUuanMnKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICB9KVxuICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgfSk7XG5cbmxvYWQoJ2NzcycsICd0ZXN0LmNzcycpOyJdLCJuYW1lcyI6WyJTdG9yYWdlIiwiY2FjaGUiLCJ1cmwiLCJlbGVtIiwibG9hZGVkIiwibG9hZFN0b3JhZ2UiLCJkIiwiZG9jdW1lbnQiLCJ3Iiwid2luZG93IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJyZWFkeVN0YXRlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiZW50cmllcyIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImF0dHJpYnV0ZXMiLCJlbGVtZW50IiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRIZWFkIiwiZG9jdW1lbnRFbGVtZW50IiwiZGVmYXVsdFJlZnMiLCJib2R5IiwiY2hpbGROb2RlcyIsImRlZmF1bHRSZWYiLCJsZW5ndGgiLCJpbnNlcnRFbGVtZW50IiwicmVmIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImxvYWRFbGVtZW50UHJvbWlzZSIsImNvbXBsZXRlIiwiUHJvbWlzZSIsImVsZW1lbnRQcm9taXNlcyIsInJlc29sdmUiLCJyZWplY3QiLCJyZWplY3RIYW5kbGVyIiwicmVqZWN0Q2IiLCJlcnJvciIsInJlc29sdmVIYW5kbGVyIiwib25yZWFkeXN0YXRlY2hhbmdlSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2FkRWxlbWVudCIsImxvYWRlZEVsZW1lbnQiLCJsb2FkU3RvcmFnZVNlcnZpY2UiLCJwcm9taXNlIiwidGhlbiIsInB1c2giLCJsb2FkSnMiLCJsb2FkQ3NzIiwibWVkaWEiLCJwIiwiYWZ0ZXJDc3NMb2FkIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwidGV4dCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJsb2FkZXIiLCJsb2FkIiwibG9hZGVyTmFtZSIsImFyZ3MiLCJhcmd1bWVudHMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJhcHBseSIsInByZWxvYWRTdXBwb3J0IiwicmVsTGlzdCIsInN1cHBvcnRzIiwiZSIsInBvbHlmaWxsIiwibGlua3MiLCJpIiwibGluayIsInJlbCIsImdldEF0dHJpYnV0ZSIsImhyZWYiLCJwcmVsb2FkUG9seWZpbGwiLCJydW4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBOzs7O3VCQUlIOzs7Ozs7O2FBS0xDLEtBQUwsR0FBYSxFQUFiOzs7Ozs7Ozs7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
