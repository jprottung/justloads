(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.justloads = factory());
}(this, (function () { 'use strict';

/**
 *
 * @type {string}
 */
var TYPE_JS = 'js';

/**
 *
 * @type {string}
 */
var TYPE_CSS = 'css';

/**
 *
 * @type {[string]}
 */
var TYPE_CONSTANTS = [TYPE_JS, TYPE_CSS];

/**
 * capitalizes the first letter of a given text string
 * @param {string} text
 */
function firstToUpper(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getFactoryName(name) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return firstToUpper(name) + suffix;
}

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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */

/**
 * tests if a variable is a boolean
 *
 * @param {*} variable
 * @return {boolean}
 */

/**
 * tests if variable is array
 *
 * @param {*} variable
 * @return {boolean}
 */

var AbstractLoader = function () {
    function AbstractLoader() {
        classCallCheck(this, AbstractLoader);
    }

    createClass(AbstractLoader, [{
        key: 'load',

        /**
         *
         * @param {Resource} resource
         */
        value: function load(resource) {
            // eslint-disable-line
            throw new Error('this is an abstract function');
        }
    }]);
    return AbstractLoader;
}();

var d = document;

var getElementsByTagName = 'getElementsByTagName';
var readyState = 'readyState';
var onreadystatechange = 'onreadystatechange';
var addEventListener = 'addEventListener';

/**
 *
 * @param {Array|Object} obj
 * @param {Function} callback
 */
function forEach(obj, callback) {
    for (var key in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(key)) continue;

        callback(obj[key], key);
    }
}

/**
 * checks if the value of a variable is from type string
 * @param {*} variable
 * @return {boolean}
 */
function isString(variable) {
  return typeof variable === 'string' || variable instanceof String;
}

/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string|Element} typeOrElement
 * @param {Object} [attributes]
 * @returns {Element}
 */
function createOrModifyElement(typeOrElement) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var element = void 0;

    if (isString(typeOrElement)) {
        element = d.createElement(typeOrElement);
    } else {
        element = typeOrElement;
    }

    forEach(attributes, function (value, key) {
        return element.setAttribute(key, value);
    });

    return element;
}

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

var AbstractElementLoader = function (_AbstractLoader) {
    inherits(AbstractElementLoader, _AbstractLoader);

    function AbstractElementLoader() {
        classCallCheck(this, AbstractElementLoader);

        var _this = possibleConstructorReturn(this, (AbstractElementLoader.__proto__ || Object.getPrototypeOf(AbstractElementLoader)).call(this));

        _this.beforeAttributes = {};
        _this.successAttributes = {};
        _this.failAttributes = {};
        _this.type = 'div';
        return _this;
    }

    /**
     *
     * @param beforeAttributes
     * @param successAttributes
     * @param failAttributes
     * @return {*}
     */


    createClass(AbstractElementLoader, [{
        key: 'loadElement',
        value: function loadElement() {
            var beforeAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var successAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var failAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var before = Object.assign({}, this.beforeAttributes, beforeAttributes);
            var success = Object.assign({}, this.successAttributes, successAttributes);
            var fail = Object.assign({}, this.failAttributes, failAttributes);

            var element = createOrModifyElement(this.type, before);

            var promise = loadElementPromise(element);
            promise.then(function (element) {
                return createOrModifyElement(element, success);
            }, function (error, element) {
                return createOrModifyElement(element, fail);
            });

            insertElement(element);

            return promise;
        }
    }]);
    return AbstractElementLoader;
}(AbstractLoader);

var CssLoader = function (_AbstractElementLoade) {
    inherits(CssLoader, _AbstractElementLoade);

    function CssLoader() {
        classCallCheck(this, CssLoader);

        var _this = possibleConstructorReturn(this, (CssLoader.__proto__ || Object.getPrototypeOf(CssLoader)).call(this));

        _this.type = 'link';

        Object.assign(_this.beforeAttributes, {
            rel: 'stylesheet',
            media: 'x'
        });

        Object.assign(_this.successAttributes, {
            media: 'all'
        });
        return _this;
    }

    /**
     *
     * @param {Resource} resource
     */


    createClass(CssLoader, [{
        key: 'load',
        value: function load(resource) {
            return this.loadElement({
                href: resource.href
            });
        }
    }]);
    return CssLoader;
}(AbstractElementLoader);

var JsLoader = function (_AbstractElementLoade) {
    inherits(JsLoader, _AbstractElementLoade);

    function JsLoader() {
        classCallCheck(this, JsLoader);

        var _this = possibleConstructorReturn(this, (JsLoader.__proto__ || Object.getPrototypeOf(JsLoader)).call(this));

        _this.type = 'script';

        Object.assign(_this.beforeAttributes, {
            type: 'text/javascript',
            async: 1
        });
        return _this;
    }

    /**
     *
     * @param {Resource} resource
     */


    createClass(JsLoader, [{
        key: 'load',
        value: function load(resource) {
            return this.loadElement({
                src: resource.src
            });
        }
    }]);
    return JsLoader;
}(AbstractElementLoader);

var Loaders = {
    CssLoader: CssLoader,
    JsLoader: JsLoader
};

var LoaderFactory = function () {
    var loaderStorage = {};

    return {
        /**
         *
         * @param {string} type
         * @return {AbstractLoader}
         */
        get: function get(type) {
            if (TYPE_CONSTANTS.indexOf(type) === -1) {
                throw new ReferenceError('You tried to get an unsupported loader of type ' + type);
            }

            var storedLoader = loaderStorage[type];

            if (storedLoader) {
                return storedLoader;
            }

            var newLoader = new Loaders[getFactoryName(type, 'Loader')]();
            loaderStorage[type] = newLoader;
            return newLoader;
        }
    };
}();

/**
 *
 * @param {*} variable
 * @return {*|boolean}
 */
function isFunction(variable) {
  var getType = {};
  return variable && getType.toString.call(variable) === '[object Function]';
}

var Queue = function () {
    function Queue() {
        var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var clone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        classCallCheck(this, Queue);

        if (clone) {
            this.queue = initial.slice(0);
        } else {
            this.queue = initial;
        }
    }

    createClass(Queue, [{
        key: 'empty',


        /**
         *
         */
        value: function empty() {
            var queue = this.queue;
            while (queue.length) {
                var current = queue.pop();
                this.call.apply(this, current);
            }
        }

        /**
         *
         * @param fn
         * @param args
         */

    }, {
        key: 'call',
        value: function call(fn) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            this._checkMethod(fn);
            fn.apply(args);
        }
    }, {
        key: 'push',
        value: function push() {
            this.call.apply(this, arguments);
        }
    }], [{
        key: '_checkMethod',
        value: function _checkMethod(fn) {
            if (!isFunction(fn)) {
                throw new TypeError('fn must be a function');
            }
        }
    }]);
    return Queue;
}();

var ObjectFnQueue = function (_Queue) {
    inherits(ObjectFnQueue, _Queue);

    /**
     *
     * @param {Object} obj
     * @param {Array} initial
     * @param {boolean} clone
     */
    function ObjectFnQueue(obj) {
        var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var clone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        classCallCheck(this, ObjectFnQueue);

        var _this = possibleConstructorReturn(this, (ObjectFnQueue.__proto__ || Object.getPrototypeOf(ObjectFnQueue)).call(this, initial, clone));

        _this.obj = obj;
        return _this;
    }

    /**
     *
     * @param {string} methodName
     * @return {Function}
     * @private
     */


    createClass(ObjectFnQueue, [{
        key: '_resolveFn',
        value: function _resolveFn(methodName) {
            var fn = this.obj[methodName];

            try {
                get(ObjectFnQueue.prototype.__proto__ || Object.getPrototypeOf(ObjectFnQueue.prototype), '_checkMethod', this).call(this, fn);
            } catch (e) {
                throw new ReferenceError('The function ' + methodName + ' does not exist.');
            }

            return fn;
        }

        /**
         *
         * @param {string} methodName
         * @param {Array} methodArgs
         */

    }, {
        key: 'call',
        value: function call(methodName) {
            var methodArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            debugger;
            if (!methodName) {
                throw new RangeError('please provide at least one argument');
            }

            get(ObjectFnQueue.prototype.__proto__ || Object.getPrototypeOf(ObjectFnQueue.prototype), 'call', this).call(this, this._resolveFn(methodName), methodArgs);
        }
    }]);
    return ObjectFnQueue;
}(Queue);

// Import a couple modules for testing.
var justloads = {
    load: function load(type, options) {
        debugger;
        LoaderFactory.get(type).load(options);
    }
};

window.jl_queue = new ObjectFnQueue(justloads, window.jl_queue || []);

return justloads;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdGxvYWRzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnRzL3R5cGVzLmpzIiwiLi4vc3JjL2hlbHBlci9maXJzdFRvVXBwZXIuanMiLCIuLi9zcmMvaGVscGVyL2dldEZhY3RvcnlOYW1lLmpzIiwiLi4vc3JjL2hlbHBlci9pc09iamVjdC5qcyIsIi4uL3NyYy9oZWxwZXIvaXNCb29sZWFuLmpzIiwiLi4vc3JjL2hlbHBlci9pc0FycmF5LmpzIiwiLi4vc3JjL2xvYWRlci9BYnN0cmFjdExvYWRlci5qcyIsIi4uL3NyYy9jb25zdGFudHMvZ2xvYmFsLmpzIiwiLi4vc3JjL2hlbHBlci9mb3JFYWNoLmpzIiwiLi4vc3JjL2hlbHBlci9pc1N0cmluZy5qcyIsIi4uL3NyYy9oZWxwZXIvY3JlYXRlT3JNb2RpZnlFbGVtZW50LmpzIiwiLi4vc3JjL2hlbHBlci9pbnNlcnRFbGVtZW50LmpzIiwiLi4vc3JjL2hlbHBlci9sb2FkRWxlbWVudFByb21pc2UuanMiLCIuLi9zcmMvbG9hZGVyL0Fic3RyYWN0RWxlbWVudExvYWRlci5qcyIsIi4uL3NyYy9sb2FkZXIvQ3NzTG9hZGVyLmpzIiwiLi4vc3JjL2xvYWRlci9Kc0xvYWRlci5qcyIsIi4uL3NyYy9sb2FkZXIvTG9hZGVycy5qcyIsIi4uL3NyYy9mYWN0b3JpZXMvTG9hZGVyRmFjdG9yeS5qcyIsIi4uL3NyYy9oZWxwZXIvaXNGdW5jdGlvbi5qcyIsIi4uL3NyYy9tb2RlbHMvUXVldWUuanMiLCIuLi9zcmMvbW9kZWxzL09iamVjdEZuUXVldWUuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IFRZUEVfSlMgPSAnanMnO1xuXG4vKipcbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9DU1MgPSAnY3NzJztcblxuLyoqXG4gKlxuICogQHR5cGUge1tzdHJpbmddfVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9DT05TVEFOVFMgPSBbXG4gICAgVFlQRV9KUyxcbiAgICBUWVBFX0NTU1xuXTtcbiIsIi8qKlxuICogY2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGxldHRlciBvZiBhIGdpdmVuIHRleHQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaXJzdFRvVXBwZXIodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGV4dC5zbGljZSgxKTtcbn1cbiIsImltcG9ydCBmaXJzdFRvVXBwZXIgZnJvbSAnLi9maXJzdFRvVXBwZXInO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IFtzdWZmaXhdXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZhY3RvcnlOYW1lKG5hbWUsIHN1ZmZpeCA9ICcnKSB7XG4gICAgcmV0dXJuIGZpcnN0VG9VcHBlcihuYW1lKSArIHN1ZmZpeDtcbn1cbiIsIi8qKlxuICogU2ltcGxlIGlzIG9iamVjdCBjaGVjay5cbiAqIEBwYXJhbSBpdGVtXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNPYmplY3QoaXRlbSkge1xuICAgIHJldHVybiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkgJiYgaXRlbSAhPT0gbnVsbCk7XG59IiwiLyoqXG4gKiB0ZXN0cyBpZiBhIHZhcmlhYmxlIGlzIGEgYm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFyaWFibGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YXJpYWJsZSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpID09PSAnW29iamVjdCBCb29sZWFuXSc7XG59XG4iLCIvKipcbiAqIHRlc3RzIGlmIHZhcmlhYmxlIGlzIGFycmF5XG4gKlxuICogQHBhcmFtIHsqfSB2YXJpYWJsZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBcnJheSh2YXJpYWJsZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhcmlhYmxlKTtcbn1cbiIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vaGVscGVyL2V4dGVuZCc7XG5pbXBvcnQge1xuICAgIExPQURFUl9JTklUSUFMSVpFRCxcbiAgICBMT0FERVJfU1VDQ0VTUyxcbiAgICBMT0FERVJfRkFJTEVELFxuICAgIExPQURFUl9TVEFSVEVEXG59IGZyb20gJy4uL21vZHVsZXMvY29uc3RhbnRzL3N0YXR1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0TG9hZGVyIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICovXG4gICAgbG9hZChyZXNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBpcyBhbiBhYnN0cmFjdCBmdW5jdGlvbicpO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGNvbnN0IGQgPSBkb2N1bWVudDtcbmV4cG9ydCBjb25zdCB3ID0gd2luZG93O1xuZXhwb3J0IGNvbnN0IGdldEVsZW1lbnRzQnlUYWdOYW1lID0gJ2dldEVsZW1lbnRzQnlUYWdOYW1lJztcbmV4cG9ydCBjb25zdCByZWFkeVN0YXRlID0gJ3JlYWR5U3RhdGUnO1xuZXhwb3J0IGNvbnN0IG9ucmVhZHlzdGF0ZWNoYW5nZSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuZXhwb3J0IGNvbnN0IGFkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7IiwiLyoqXG4gKlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgICAvLyBza2lwIGxvb3AgaWYgdGhlIHByb3BlcnR5IGlzIGZyb20gcHJvdG90eXBlXG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhbGxiYWNrKG9ialtrZXldLCBrZXkpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogY2hlY2tzIGlmIHRoZSB2YWx1ZSBvZiBhIHZhcmlhYmxlIGlzIGZyb20gdHlwZSBzdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFyaWFibGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhcmlhYmxlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PT0gJ3N0cmluZycgfHwgdmFyaWFibGUgaW5zdGFuY2VvZiBTdHJpbmc7XG59XG4iLCIvKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudCB3aXRoIGEgZ2l2ZW4gdHlwZSBhbmQgYSBudW1iZXIgb2YgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfEVsZW1lbnR9IHR5cGVPckVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXR0cmlidXRlc11cbiAqIEByZXR1cm5zIHtFbGVtZW50fVxuICovXG5pbXBvcnQgeyBkIH0gZnJvbSAnLi8uLi9jb25zdGFudHMvZ2xvYmFsJztcbmltcG9ydCBmb3JFYWNoIGZyb20gJy4vZm9yRWFjaCc7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU9yTW9kaWZ5RWxlbWVudCh0eXBlT3JFbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICBsZXQgZWxlbWVudDtcblxuICAgIGlmIChpc1N0cmluZyh0eXBlT3JFbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50ID0gZC5jcmVhdGVFbGVtZW50KHR5cGVPckVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0eXBlT3JFbGVtZW50O1xuICAgIH1cblxuICAgIGZvckVhY2goYXR0cmlidXRlcywgKHZhbHVlLCBrZXkpID0+IGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuIiwiaW1wb3J0IHtkLCBnZXRFbGVtZW50c0J5VGFnTmFtZX0gZnJvbSAnLi8uLi9jb25zdGFudHMvZ2xvYmFsJztcblxuLyoqXG4gKiBnZXRzIHRoZSBlbGVtZW50IGhlYWRcbiAqIEByZXR1cm5zIHtFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGVhZCgpIHtcbiAgICByZXR1cm4gZFtnZXRFbGVtZW50c0J5VGFnTmFtZV0oJ2hlYWQnKVswXSB8fCBkLmRvY3VtZW50RWxlbWVudDtcbn1cblxuY29uc3QgZGVmYXVsdFJlZnMgPSAoZC5ib2R5IHx8IGdldEhlYWQoKSkuY2hpbGROb2RlcztcbmNvbnN0IGRlZmF1bHRSZWYgPSBkZWZhdWx0UmVmc1tkZWZhdWx0UmVmcy5sZW5ndGggLSAxXTtcblxuLyoqXG4gKiBpbnNlcnRzIGFuIGVsZW1lbnQgYmVmb3JlIHRoZSBnaXZlbiByZWYgb3IgaWYgbm8gcmVmZXJlbmNlIGlzIGdpdmVuIGFzIHRoZSBsYXN0IGVsZW1lbnRcbiAqIG9mIHRoZSBib2R5IG9yIGhlYWQgZGVwZW5kaW5nIG9uIHdoYXQgaXMgYWxyZWFkeSByZWdpc3RlcmVkXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3JlZl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChlbGVtZW50LCByZWYgPSBkZWZhdWx0UmVmKSB7XG4gICAgcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHJlZik7XG59IiwiaW1wb3J0IHtyZWFkeVN0YXRlLCBvbnJlYWR5c3RhdGVjaGFuZ2UsIGFkZEV2ZW50TGlzdGVuZXJ9IGZyb20gJy4vLi4vY29uc3RhbnRzL2dsb2JhbCc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZEVsZW1lbnRQcm9taXNlKGVsZW1lbnQpIHtcbiAgICBsZXQgY29tcGxldGUgPSBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBlbGVtZW50UHJvbWlzZXMocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnN0IHJlamVjdEhhbmRsZXIgPSBmdW5jdGlvbiByZWplY3RDYihlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvciwgZWxlbWVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzb2x2ZUhhbmRsZXIgPSBmdW5jdGlvbiByZWplY3RDYigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBpZiAoZWxlbWVudFtyZWFkeVN0YXRlXSkge1xuICAgICAgICAgICAgZWxlbWVudFtvbnJlYWR5c3RhdGVjaGFuZ2VdID0gZnVuY3Rpb24gb25yZWFkeXN0YXRlY2hhbmdlSGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBsZXRlICYmIChlbGVtZW50W3JlYWR5U3RhdGVdID09PSAnY29tcGxldGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRbYWRkRXZlbnRMaXN0ZW5lcl0oJ2xvYWQnLCByZXNvbHZlSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50W2FkZEV2ZW50TGlzdGVuZXJdKCdlcnJvcicsIHJlamVjdEhhbmRsZXIpO1xuICAgICAgICBlbGVtZW50W2FkZEV2ZW50TGlzdGVuZXJdKCdhYm9ydCcsIHJlamVjdEhhbmRsZXIpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IEFic3RyYWN0TG9hZGVyIGZyb20gJy4vQWJzdHJhY3RMb2FkZXInO1xuaW1wb3J0IGNyZWF0ZU9yTW9kaWZ5RWxlbWVudCBmcm9tICcuLi9oZWxwZXIvY3JlYXRlT3JNb2RpZnlFbGVtZW50JztcbmltcG9ydCBpbnNlcnRFbGVtZW50IGZyb20gJy4uL2hlbHBlci9pbnNlcnRFbGVtZW50JztcbmltcG9ydCBsb2FkRWxlbWVudFByb21pc2UgZnJvbSAnLi4vaGVscGVyL2xvYWRFbGVtZW50UHJvbWlzZSc7XG5cbmNsYXNzIEFic3RyYWN0RWxlbWVudExvYWRlciBleHRlbmRzIEFic3RyYWN0TG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iZWZvcmVBdHRyaWJ1dGVzID0ge307XG4gICAgICAgIHRoaXMuc3VjY2Vzc0F0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5mYWlsQXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB0aGlzLnR5cGUgPSAnZGl2JztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBiZWZvcmVBdHRyaWJ1dGVzXG4gICAgICogQHBhcmFtIHN1Y2Nlc3NBdHRyaWJ1dGVzXG4gICAgICogQHBhcmFtIGZhaWxBdHRyaWJ1dGVzXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKi9cbiAgICBsb2FkRWxlbWVudChiZWZvcmVBdHRyaWJ1dGVzID0ge30sIHN1Y2Nlc3NBdHRyaWJ1dGVzID0ge30sIGZhaWxBdHRyaWJ1dGVzID0ge30pIHtcbiAgICAgICAgY29uc3QgYmVmb3JlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iZWZvcmVBdHRyaWJ1dGVzLCBiZWZvcmVBdHRyaWJ1dGVzKTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3VjY2Vzc0F0dHJpYnV0ZXMsIHN1Y2Nlc3NBdHRyaWJ1dGVzKTtcbiAgICAgICAgY29uc3QgZmFpbCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmFpbEF0dHJpYnV0ZXMsIGZhaWxBdHRyaWJ1dGVzKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlT3JNb2RpZnlFbGVtZW50KHRoaXMudHlwZSwgYmVmb3JlKTtcblxuICAgICAgICBjb25zdCBwcm9taXNlID0gbG9hZEVsZW1lbnRQcm9taXNlKGVsZW1lbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICBlbGVtZW50ID0+IGNyZWF0ZU9yTW9kaWZ5RWxlbWVudChlbGVtZW50LCBzdWNjZXNzKSxcbiAgICAgICAgICAgIChlcnJvciwgZWxlbWVudCkgPT4gY3JlYXRlT3JNb2RpZnlFbGVtZW50KGVsZW1lbnQsIGZhaWwpKTtcblxuICAgICAgICBpbnNlcnRFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RFbGVtZW50TG9hZGVyOyIsImltcG9ydCBBYnN0cmFjdEVsZW1lbnRMb2FkZXIgZnJvbSAnLi9BYnN0cmFjdEVsZW1lbnRMb2FkZXInO1xuXG5jbGFzcyBDc3NMb2FkZXIgZXh0ZW5kcyBBYnN0cmFjdEVsZW1lbnRMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudHlwZSA9ICdsaW5rJztcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuYmVmb3JlQXR0cmlidXRlcywge1xuICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICBtZWRpYTogJ3gnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdWNjZXNzQXR0cmlidXRlcywge1xuICAgICAgICAgICAgbWVkaWE6ICdhbGwnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICBsb2FkKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRFbGVtZW50KHtcbiAgICAgICAgICAgIGhyZWY6IHJlc291cmNlLmhyZWZcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDc3NMb2FkZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3RFbGVtZW50TG9hZGVyIGZyb20gJy4vQWJzdHJhY3RFbGVtZW50TG9hZGVyJztcblxuY2xhc3MgSnNMb2FkZXIgZXh0ZW5kcyBBYnN0cmFjdEVsZW1lbnRMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudHlwZSA9ICdzY3JpcHQnO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5iZWZvcmVBdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAgICAgICAgIGFzeW5jOiAxXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICBsb2FkKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRFbGVtZW50KHtcbiAgICAgICAgICAgIHNyYzogcmVzb3VyY2Uuc3JjXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSnNMb2FkZXI7XG4iLCJcbmltcG9ydCBDc3NMb2FkZXIgZnJvbSAnLi9Dc3NMb2FkZXInO1xuaW1wb3J0IEpzTG9hZGVyIGZyb20gJy4vSnNMb2FkZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgQ3NzTG9hZGVyLFxuICAgIEpzTG9hZGVyXG59O1xuXG4iLCJpbXBvcnQgeyBUWVBFX0NPTlNUQU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgZ2V0RmFjdG9yeU5hbWUgZnJvbSAnLi4vaGVscGVyL2dldEZhY3RvcnlOYW1lJztcbmltcG9ydCBMb2FkZXJzIGZyb20gJy4uL2xvYWRlci9Mb2FkZXJzJztcblxuY29uc3QgTG9hZGVyRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbG9hZGVyU3RvcmFnZSA9IHt9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICAgICAqIEByZXR1cm4ge0Fic3RyYWN0TG9hZGVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQodHlwZSkge1xuICAgICAgICAgICAgaWYgKFRZUEVfQ09OU1RBTlRTLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdZb3UgdHJpZWQgdG8gZ2V0IGFuIHVuc3VwcG9ydGVkIGxvYWRlciBvZiB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3RvcmVkTG9hZGVyID0gbG9hZGVyU3RvcmFnZVt0eXBlXTtcblxuICAgICAgICAgICAgaWYgKHN0b3JlZExvYWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZWRMb2FkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0xvYWRlciA9IG5ldyBMb2FkZXJzW2dldEZhY3RvcnlOYW1lKHR5cGUsICdMb2FkZXInKV0oKTtcbiAgICAgICAgICAgIGxvYWRlclN0b3JhZ2VbdHlwZV0gPSBuZXdMb2FkZXI7XG4gICAgICAgICAgICByZXR1cm4gbmV3TG9hZGVyO1xuICAgICAgICB9XG4gICAgfTtcblxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyRmFjdG9yeTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFyaWFibGVcbiAqIEByZXR1cm4geyp8Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNGdW5jdGlvbih2YXJpYWJsZSkge1xuICAgIGNvbnN0IGdldFR5cGUgPSB7fTtcbiAgICByZXR1cm4gdmFyaWFibGUgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL2hlbHBlci9pc0Z1bmN0aW9uJztcblxuY2xhc3MgUXVldWUge1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWwgPSBbXSwgY2xvbmUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2xvbmUpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWUgPSBpbml0aWFsLnNsaWNlKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5xdWV1ZSA9IGluaXRpYWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgX2NoZWNrTWV0aG9kKGZuKSB7XG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ZuIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBlbXB0eSgpIHtcbiAgICAgICAgY29uc3QgcXVldWUgPSB0aGlzLnF1ZXVlO1xuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gcXVldWUucG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGwuYXBwbHkodGhpcywgY3VycmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmblxuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICovXG4gICAgY2FsbChmbiwgYXJncyA9IFtdKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrTWV0aG9kKGZuKTtcbiAgICAgICAgZm4uYXBwbHkoYXJncyk7XG4gICAgfVxuXG4gICAgcHVzaCgpIHtcbiAgICAgICAgdGhpcy5jYWxsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWV1ZTtcbiIsImltcG9ydCBRdWV1ZSBmcm9tICcuL1F1ZXVlJztcblxuY2xhc3MgT2JqZWN0Rm5RdWV1ZSBleHRlbmRzIFF1ZXVlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBpbml0aWFsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9uZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9iaiwgaW5pdGlhbCA9IFtdLCBjbG9uZSA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKGluaXRpYWwsIGNsb25lKTtcblxuICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVzb2x2ZUZuKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgY29uc3QgZm4gPSB0aGlzLm9ialttZXRob2ROYW1lXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3VwZXIuX2NoZWNrTWV0aG9kKGZuKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdUaGUgZnVuY3Rpb24gJyArIG1ldGhvZE5hbWUgKyAnIGRvZXMgbm90IGV4aXN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2RBcmdzXG4gICAgICovXG4gICAgY2FsbChtZXRob2ROYW1lLCBtZXRob2RBcmdzID0gW10pIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIGlmICghbWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuY2FsbCh0aGlzLl9yZXNvbHZlRm4obWV0aG9kTmFtZSksIG1ldGhvZEFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0Rm5RdWV1ZTtcbiIsIi8vIEltcG9ydCBhIGNvdXBsZSBtb2R1bGVzIGZvciB0ZXN0aW5nLlxuaW1wb3J0IExvYWRlckZhY3RvcnkgZnJvbSAnLi9mYWN0b3JpZXMvTG9hZGVyRmFjdG9yeSc7XG5pbXBvcnQgT2JqZWN0Rm5RdWV1ZSBmcm9tICcuL21vZGVscy9PYmplY3RGblF1ZXVlJztcblxuY29uc3QganVzdGxvYWRzID0ge1xuICAgIGxvYWQ6IGZ1bmN0aW9uICh0eXBlLCBvcHRpb25zKSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICBMb2FkZXJGYWN0b3J5LmdldCh0eXBlKS5sb2FkKG9wdGlvbnMpO1xuICAgIH0sXG59O1xuXG53aW5kb3cuamxfcXVldWUgPSBuZXcgT2JqZWN0Rm5RdWV1ZShqdXN0bG9hZHMsIHdpbmRvdy5qbF9xdWV1ZSB8fCBbXSk7XG5cbmV4cG9ydCBkZWZhdWx0IGp1c3Rsb2FkcztcbiJdLCJuYW1lcyI6WyJUWVBFX0pTIiwiVFlQRV9DU1MiLCJUWVBFX0NPTlNUQU5UUyIsImZpcnN0VG9VcHBlciIsInRleHQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiZ2V0RmFjdG9yeU5hbWUiLCJuYW1lIiwic3VmZml4IiwiQWJzdHJhY3RMb2FkZXIiLCJyZXNvdXJjZSIsIkVycm9yIiwiZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJyZWFkeVN0YXRlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvckVhY2giLCJvYmoiLCJjYWxsYmFjayIsImtleSIsImhhc093blByb3BlcnR5IiwiaXNTdHJpbmciLCJ2YXJpYWJsZSIsIlN0cmluZyIsImNyZWF0ZU9yTW9kaWZ5RWxlbWVudCIsInR5cGVPckVsZW1lbnQiLCJhdHRyaWJ1dGVzIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZSIsImdldEhlYWQiLCJkb2N1bWVudEVsZW1lbnQiLCJkZWZhdWx0UmVmcyIsImJvZHkiLCJjaGlsZE5vZGVzIiwiZGVmYXVsdFJlZiIsImxlbmd0aCIsImluc2VydEVsZW1lbnQiLCJyZWYiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibG9hZEVsZW1lbnRQcm9taXNlIiwiY29tcGxldGUiLCJQcm9taXNlIiwiZWxlbWVudFByb21pc2VzIiwicmVzb2x2ZSIsInJlamVjdCIsInJlamVjdEhhbmRsZXIiLCJyZWplY3RDYiIsImVycm9yIiwicmVzb2x2ZUhhbmRsZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2VIYW5kbGVyIiwiQWJzdHJhY3RFbGVtZW50TG9hZGVyIiwiYmVmb3JlQXR0cmlidXRlcyIsInN1Y2Nlc3NBdHRyaWJ1dGVzIiwiZmFpbEF0dHJpYnV0ZXMiLCJ0eXBlIiwiYmVmb3JlIiwiT2JqZWN0IiwiYXNzaWduIiwic3VjY2VzcyIsImZhaWwiLCJwcm9taXNlIiwidGhlbiIsIkNzc0xvYWRlciIsImxvYWRFbGVtZW50IiwiaHJlZiIsIkpzTG9hZGVyIiwic3JjIiwiTG9hZGVyRmFjdG9yeSIsImxvYWRlclN0b3JhZ2UiLCJnZXQiLCJpbmRleE9mIiwiUmVmZXJlbmNlRXJyb3IiLCJzdG9yZWRMb2FkZXIiLCJuZXdMb2FkZXIiLCJMb2FkZXJzIiwiaXNGdW5jdGlvbiIsImdldFR5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJRdWV1ZSIsImluaXRpYWwiLCJjbG9uZSIsInF1ZXVlIiwiY3VycmVudCIsInBvcCIsImFwcGx5IiwiZm4iLCJhcmdzIiwiX2NoZWNrTWV0aG9kIiwiYXJndW1lbnRzIiwiVHlwZUVycm9yIiwiT2JqZWN0Rm5RdWV1ZSIsIm1ldGhvZE5hbWUiLCJlIiwibWV0aG9kQXJncyIsIlJhbmdlRXJyb3IiLCJfcmVzb2x2ZUZuIiwianVzdGxvYWRzIiwib3B0aW9ucyIsImxvYWQiLCJ3aW5kb3ciLCJqbF9xdWV1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFJQSxBQUFPLElBQU1BLFVBQVUsSUFBaEI7Ozs7OztBQU1QLEFBQU8sSUFBTUMsV0FBVyxLQUFqQjs7Ozs7O0FBTVAsQUFBTyxJQUFNQyxpQkFBaUIsQ0FDMUJGLE9BRDBCLEVBRTFCQyxRQUYwQixDQUF2Qjs7QUNoQlA7Ozs7QUFJQSxBQUFlLFNBQVNFLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCO1NBQ2hDQSxLQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlQyxXQUFmLEtBQStCRixLQUFLRyxLQUFMLENBQVcsQ0FBWCxDQUF0Qzs7O0FDR1csU0FBU0MsY0FBVCxDQUF3QkMsSUFBeEIsRUFBMkM7TUFBYkMsTUFBYSx1RUFBSixFQUFJOztTQUMvQ1AsYUFBYU0sSUFBYixJQUFxQkMsTUFBNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEo7Ozs7R0FLQTs7QUNMQTs7Ozs7R0FNQTs7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
