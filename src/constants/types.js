/**
 *
 * @type {string}
 */
export const TYPE_JS = 'js';

/**
 *
 * @type {string}
 */
export const TYPE_CSS = 'css';

/**
 *
 * @type {string}
 */
const TYPE_ELEMENT = 'element';

/**
 *
 * @type {[string]}
 */
export const TYPE_CONSTANTS = [
  TYPE_JS,
  TYPE_CSS,
  TYPE_ELEMENT
];

export const TYPE_HIERARCHIES = {};

TYPE_HIERARCHIES[TYPE_JS] = TYPE_ELEMENT;
TYPE_HIERARCHIES[TYPE_CSS] = TYPE_ELEMENT;

// export TYPE_HIERARCHIES;
