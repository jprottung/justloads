/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string|Element} typeOrElement
 * @param {Object} [attributes]
 * @returns {Element}
 */
import isString from './isString';
import { d } from './../constants/global';
import forEach from './forEach';

export default function createOrModifyElement(typeOrElement, attributes = {}) {
  let element;

  if (isString(typeOrElement)) {
    element = d.createElement(typeOrElement);
  } else {
    element = typeOrElement;
  }

  forEach(attributes, (value, key) => element.setAttribute(key, value));

  return element;
}
