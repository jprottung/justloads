
import isArray from './isArray';

/**
 * Simple is object check.
 * @param {*} variable
 * @returns {*|boolean}
 */
export default function isObject(variable) {
  return (variable && typeof variable === 'object' &&
  !isArray(variable) && variable !== null);
}
