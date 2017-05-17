/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
export default function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
