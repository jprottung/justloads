const nativeIsArray = Array.isArray;

/**
 * tests if variable is array
 *
 * @param {*} variable
 * @return {*|boolean}
 */
export default nativeIsArray || function isArray(variable) {
  return toString.call(variable) === '[object Array]';
};
