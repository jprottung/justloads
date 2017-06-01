var d = document;
var w = window;
var getElementsByTagName = 'getElementsByTagName';
var readyState = 'readyState';
var onreadystatechange = 'onreadystatechange';
var addEventListener = 'addEventListener';

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
var TYPE_CONSTANTS = [
  TYPE_JS,
  TYPE_CSS
];

/**
 * capitalizes the first letter of a given text string
 * @param {string} text
 */
function firstToUpper(text) {
  return text.charAt(0)
      .toUpperCase() + text.slice(1);
}

function getFactoryName(name, suffix) {
  if ( suffix === void 0 ) suffix = '';

  return firstToUpper(name) + suffix;
}

var AbstractLoader = function AbstractLoader () {};

AbstractLoader.prototype.load = function load (resource) { // eslint-disable-line
  throw new Error('this is an abstract function');
};

/**
 * checks if the value of a variable is from type string
 * @param {*} variable
 * @return {*|boolean}
 */
function isString(variable) {
  return typeof variable === 'string' || variable instanceof String;
}

/**
 *
 * @param {Object} obj
 * @param {Function} callback
 */
function forEach(obj, callback) {
  Object.keys(obj)
    .forEach(function (key) {
      callback(obj[key], key);
    });
}

/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string|Element} typeOrElement
 * @param {Object} [attributes]
 * @returns {Element}
 */
function createOrModifyElement(typeOrElement, attributes) {
  if ( attributes === void 0 ) attributes = {};

  var element;

  if (isString(typeOrElement)) {
    element = d.createElement(typeOrElement);
  } else {
    element = typeOrElement;
  }

  forEach(attributes, function (value, key) { return element.setAttribute(key, value); });

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
function insertElement(element, ref) {
  if ( ref === void 0 ) ref = defaultRef;

  ref.parentNode.insertBefore(element, ref);
}

function loadElementPromise(element) {
  var complete = false;

  return new Promise(function (resolve, reject) {
    var rejectHandler = function rejectCb(error) {
      reject(error, element);
    };
    var resolveHandler = function rejectCb() {
      resolve(element);
    };

    if (element[readyState]) {
      element[onreadystatechange] = function onreadystatechangeHandler() {
        if (!complete && (element[readyState] === 'complete')) {
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

var AbstractElementLoader = (function (AbstractLoader$$1) {
  function AbstractElementLoader() {
    AbstractLoader$$1.call(this);
    this.beforeAttributes = {};
    this.successAttributes = {};
    this.failAttributes = {};
    this.type = 'div';
  }

  if ( AbstractLoader$$1 ) AbstractElementLoader.__proto__ = AbstractLoader$$1;
  AbstractElementLoader.prototype = Object.create( AbstractLoader$$1 && AbstractLoader$$1.prototype );
  AbstractElementLoader.prototype.constructor = AbstractElementLoader;

  /**
   *
   * @param beforeAttributes
   * @param successAttributes
   * @param failAttributes
   * @return {*}
   */
  AbstractElementLoader.prototype.loadElement = function loadElement (beforeAttributes, successAttributes, failAttributes) {
    if ( beforeAttributes === void 0 ) beforeAttributes = {};
    if ( successAttributes === void 0 ) successAttributes = {};
    if ( failAttributes === void 0 ) failAttributes = {};

    var before = Object.assign({}, this.beforeAttributes, beforeAttributes);
    var success = Object.assign({}, this.successAttributes, successAttributes);
    var fail = Object.assign({}, this.failAttributes, failAttributes);

    var element = createOrModifyElement(this.type, before);

    var promise = loadElementPromise(element);
    promise.then(
      function (element) { return createOrModifyElement(element, success); },
      function (error, element) { return createOrModifyElement(element, fail); });

    insertElement(element);

    return promise;
  };

  return AbstractElementLoader;
}(AbstractLoader));

var CssLoader = (function (AbstractElementLoader$$1) {
  function CssLoader() {
    AbstractElementLoader$$1.call(this);

    this.type = 'link';

    Object.assign(this.beforeAttributes, {
      rel: 'stylesheet',
      media: 'x'
    });

    Object.assign(this.successAttributes, {
      media: 'all'
    });
  }

  if ( AbstractElementLoader$$1 ) CssLoader.__proto__ = AbstractElementLoader$$1;
  CssLoader.prototype = Object.create( AbstractElementLoader$$1 && AbstractElementLoader$$1.prototype );
  CssLoader.prototype.constructor = CssLoader;

  /**
   *
   * @param {Resource} resource
   */
  CssLoader.prototype.load = function load (resource) {
    return this.loadElement({
      href: resource.href
    });
  };

  return CssLoader;
}(AbstractElementLoader));

var JsLoader = (function (AbstractElementLoader$$1) {
  function JsLoader() {
    AbstractElementLoader$$1.call(this);

    this.type = 'script';

    Object.assign(this.beforeAttributes, {
      type: 'text/javascript',
      async: 1
    });
  }

  if ( AbstractElementLoader$$1 ) JsLoader.__proto__ = AbstractElementLoader$$1;
  JsLoader.prototype = Object.create( AbstractElementLoader$$1 && AbstractElementLoader$$1.prototype );
  JsLoader.prototype.constructor = JsLoader;

  /**
   *
   * @param {Resource} resource
   */
  JsLoader.prototype.load = function load (resource) {
    return this.loadElement({
      src: resource.src
    });
  };

  return JsLoader;
}(AbstractElementLoader));

var Loaders = {
  CssLoader: CssLoader,
  JsLoader: JsLoader
};

var LoaderFactory = (function () {
  var loaderStorage = {};

  return {
    /**
     *
     * @param {string} type
     * @return {AbstractLoader}
     */
    get: function get(type) {
      if (TYPE_CONSTANTS.indexOf(type) === -1) {
        throw new ReferenceError(("You tried to get an unsupported loader of type " + type));
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
})();

var optimizableIsFunction = typeof /./ !== 'function' && typeof Int8Array !== 'object' &&
  typeof nodelist !== 'function';

/**
 * resolves whether a variable is of type function
 * @param {*} variable
 * @return {boolean}
 */
function functionTypeCheck(variable) {
  if (optimizableIsFunction) {
    return typeof variable === 'function' || false;
  }

  var getType = {};

  return getType.toString.call(variable) === '[object Function]';
}

/**
 * checks whether variable is a function
 * @param {*} variable
 * @return {*|boolean}
 */
function isFunction(variable) {
  return variable && functionTypeCheck(variable);
}

var Queue = function Queue(initial, clone) {
  if ( initial === void 0 ) initial = [];
  if ( clone === void 0 ) clone = false;

  if (clone) {
    this.queue = initial.slice(0);
  } else {
    this.queue = initial;
  }
};

Queue.prototype.checkMethod = function checkMethod (fn) {
  if (!isFunction(fn)) {
    throw new TypeError('fn must be a function');
  }
};

/**
 *
 */
Queue.prototype.empty = function empty () {
    var this$1 = this;

  var queue = this.queue;
  while (queue.length) {
    var current = queue.pop();
    (ref = this$1).call.apply(ref, current);
  }
    var ref;
};

/**
 *
 * @param fn
 * @param args
 */
Queue.prototype.call = function call (fn, args) {
    if ( args === void 0 ) args = [];

  this.checkMethod(fn);
  fn.apply(void 0, args);
};

Queue.prototype.push = function push () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  (ref = this).call.apply(ref, args);
    var ref;
};

var ObjectFnQueue = (function (Queue$$1) {
  function ObjectFnQueue(obj, initial, clone) {
    if ( initial === void 0 ) initial = [];
    if ( clone === void 0 ) clone = false;

    Queue$$1.call(this, initial, clone);

    this.obj = obj;
  }

  if ( Queue$$1 ) ObjectFnQueue.__proto__ = Queue$$1;
  ObjectFnQueue.prototype = Object.create( Queue$$1 && Queue$$1.prototype );
  ObjectFnQueue.prototype.constructor = ObjectFnQueue;

  /**
   *
   * @param {string} methodName
   * @return {Function}
   * @private
   */
  ObjectFnQueue.prototype.resolveFn = function resolveFn (methodName) {
    var fn = this.obj[methodName];

    try {
      this.checkMethod(fn);
    } catch (e) {
      throw new ReferenceError(("The function " + methodName + " does not exist.'"));
    }

    return fn;
  };

  /**
   *
   * @param {string} methodName
   * @param {Array} methodArgs
   */
  ObjectFnQueue.prototype.call = function call (methodName, methodArgs) {
    if ( methodArgs === void 0 ) methodArgs = [];

    if (!methodName) {
      throw new RangeError('please provide at least one argument');
    }

    Queue$$1.prototype.call.call(this, this.resolveFn(methodName), methodArgs);
  };

  return ObjectFnQueue;
}(Queue));

// Import a couple modules for testing.
var justloads = {
  load: function (type, options) {
    LoaderFactory.get(type)
      .load(options);
  },
};

var jlQueueName = 'jl_queue';
var jlQueue = new ObjectFnQueue(justloads, w[jlQueueName] || []);
jlQueue.empty();
w[jlQueueName] = jlQueue;

export default justloads;
//# sourceMappingURL=justloads.es.js.map
