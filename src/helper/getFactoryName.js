import firstToUpper from './firstToUpper';

/**
 *
 * @param {string} name
 * @param {string} [suffix]
 * @return {string}
 */
export default function getFactoryName(name, suffix = '') {
  return firstToUpper(name) + suffix;
}
