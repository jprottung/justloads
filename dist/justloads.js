var justloads = (function () {
'use strict';

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
 * @type {string}
 */
var TYPE_ELEMENT = 'element';

/**
 *
 * @type {[string]}
 */
var TYPE_CONSTANTS = [
  TYPE_JS,
  TYPE_CSS,
  TYPE_ELEMENT
];

var TYPE_HIERARCHIES = {};

TYPE_HIERARCHIES[TYPE_JS] = TYPE_ELEMENT;
TYPE_HIERARCHIES[TYPE_CSS] = TYPE_ELEMENT;

// export TYPE_HIERARCHIES;

/**
 * capitalizes the first letter of a given text string
 * @param {string} text
 */
function firstToUpper(text) {
  return text.charAt(0)
      .toUpperCase() + text.slice(1);
}

/**
 *
 * @param {string} name
 * @param {string} [suffix]
 * @return {string}
 */
function getFactoryName(name, suffix) {
  if ( suffix === void 0 ) suffix = '';

  return firstToUpper(name) + suffix;
}

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

/**
 * gets the element head
 * @returns {Node}
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
 * @param {Node} [ref]
 */
function insertElement(element, ref) {
  if ( ref === void 0 ) ref = defaultRef;

  ref.parentNode.insertBefore(element, ref);
}

/**
 *
 * @param {Element} element
 * @returns {Promise}
 */
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
      element[onreadystatechange] = function onReadyStateChangeHandler() {
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

var ElementLoader = function ElementLoader () {};

ElementLoader.prototype.load = function load (resource) {
  var element = createOrModifyElement(resource.tag, resource.attr);

  var promise = loadElementPromise(element);
  promise.then(
    function (element) { return createOrModifyElement(element, resource.sAttr); },
    function (error, element) { return createOrModifyElement(element, resource.fAttr); });

  insertElement(element);

  return promise;
};

var Loaders = {
  ElementLoader: ElementLoader
};

var LoaderFactory = (function () {
  var loaderStorage = {};

  /**
   *
   * @param {string} type
   * @return {ElementLoader}
   */
  function get(type) {
    if (TYPE_CONSTANTS.indexOf(type) === -1) {
      throw new ReferenceError(("You tried to get an unsupported loader of type " + type));
    }

    var hierarchyType = TYPE_HIERARCHIES[type];

    if (hierarchyType) {
      type = hierarchyType;
    }

    var storedLoader = loaderStorage[type];

    if (storedLoader) {
      return storedLoader;
    }

    var newLoader = new Loaders[getFactoryName(type, 'Loader')]();
    loaderStorage[type] = newLoader;
    return newLoader;
  }

  /**
   *
   * @param {Resource} resource
   * @returns {Promise}
   */
  function load(resource) {
    return get(resource.type)
      .load(resource);
  }

  return {
    load: load
  };
})();

/**
 *
 * @type {string}
 */
var RESOURCE_INITIALIZED = 'initialized';

/**
 *
 * @type {string}
 */


/**
 *
 * @type {string}
 */


/**
 *
 * @type {string}
 */


/**
 *
 * @type {[string]}
 */

/**
 *
 */
var Resource = function Resource(options) {
  this.key = options.key;
  this.type = options.type;
  this.url = options.url;
  this.status = options.status || RESOURCE_INITIALIZED;
};

var ElementResource = (function (Resource$$1) {
  function ElementResource(options) {
    Resource$$1.call(this, options);
    this.tag = options.tag;
    this.attr = options.attr || {};
    this.fAttr = options.fAttr || {};
    this.sAttr = options.sAttr || {};
  }

  if ( Resource$$1 ) ElementResource.__proto__ = Resource$$1;
  ElementResource.prototype = Object.create( Resource$$1 && Resource$$1.prototype );
  ElementResource.prototype.constructor = ElementResource;

  return ElementResource;
}(Resource));

var JsResource = (function (ElementResource$$1) {
  function JsResource(options) {
    ElementResource$$1.call(this, options);

    this.tag = this.tag || 'script';

    var attr = this.attr;

    attr.src = attr.src || this.url;
    attr.type = attr.type || 'text/javascript';
    attr.defer = attr.defer || 1;
  }

  if ( ElementResource$$1 ) JsResource.__proto__ = ElementResource$$1;
  JsResource.prototype = Object.create( ElementResource$$1 && ElementResource$$1.prototype );
  JsResource.prototype.constructor = JsResource;

  return JsResource;
}(ElementResource));

var STYLE_MEDIA_DEFAULT = 'all';

var CssResource = (function (ElementResource$$1) {
  function CssResource(options) {
    ElementResource$$1.call(this, options);

    this.tag = this.tag || 'link';

    var attr = this.attr;

    attr.rel = attr.rel || 'stylesheet';
    attr.media = attr.media || 'x';
    attr.href = attr.href || this.url;

    var sAttr = this.sAttr;

    sAttr.media = sAttr.media || STYLE_MEDIA_DEFAULT;
  }

  if ( ElementResource$$1 ) CssResource.__proto__ = ElementResource$$1;
  CssResource.prototype = Object.create( ElementResource$$1 && ElementResource$$1.prototype );
  CssResource.prototype.constructor = CssResource;

  return CssResource;
}(ElementResource));

var Resources = {
  JsResource: JsResource,
  CssResource: CssResource,
  ElementResource: ElementResource
};

/**
 * @param {string} pathOrUrl
 */
function getFileExtension(pathOrUrl) {
  var ext = pathOrUrl.substr(pathOrUrl.lastIndexOf('.') + 1);

  return ext.split('?')[0];
}

function resolveType(url) {
  var ext = getFileExtension(url);
  var type = false;

  if (ext === 'js') {
    type = TYPE_JS;
  } else if (ext === 'css') {
    type = TYPE_CSS;
  }

  return type;
}

/**
 *
 * @return {{createResource: (function({key: string, type: string, options: Object, status?: string}))}}
 * @constructor
 */
var ResourceManager = (function () {
  /**
   *
   * @type {Object}
   */
  var resourceStorage = {};

  /**
   * @param {{key:string, type:string, [status]: string}} options
   * @return {Resource}
   */
  function create(options) {
    options.type = options.type || resolveType(options.url || '');

    var type = options.type;

    if (TYPE_CONSTANTS.indexOf(type) === -1) {
      throw new ReferenceError(("You tried to get an unsupported resource of type " + type));
    }

    return new Resources[getFactoryName(type, 'Resource')](options);
  }

  /**
   *
   * @param {string|object} keyOrOptions
   * @returns {Resource}
   */
  function get(keyOrOptions) {
    var options = keyOrOptions;

    if (isString(keyOrOptions)) {
      options = {
        key: keyOrOptions,
        url: keyOrOptions
      };
    }

    var key = options.key;
    var storedResource = resourceStorage[key];

    if (storedResource) {
      return storedResource;
    }

    var resource = create(options);

    resourceStorage[key] = resource;

    return resource;
  }

  return {
    get: get
  };
})();

var betterIsFunctionPossible = typeof /./ !== 'function' && typeof Int8Array !== 'object' &&
  typeof NodeList !== 'function';

/**
 * resolves whether a variable is of type function
 * @param {*} variable
 * @return {boolean}
 */
function functionTypeCheck(variable) {
  if (betterIsFunctionPossible) {
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
    var current = queue.shift();
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
var time = performance.now();

var justloads = {
  load: function (options) {
    var resource = ResourceManager.get(options);
    LoaderFactory.load(resource)
      .then(function () {
        //console.log(`${(performance.now() - time)}: ${resource.key}`);
      });
  },
};

var jlQueueName = 'jl_queue';
var jlQueue = new ObjectFnQueue(justloads, w[jlQueueName] || []);
jlQueue.empty();
w[jlQueueName] = jlQueue;

return justloads;

}());
//# sourceMappingURL=justloads.js.map
