const optimizableIsFunction = typeof /./ !== 'function' && typeof Int8Array !== 'object' &&
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

  const getType = {};

  return getType.toString.call(variable) === '[object Function]';
}

/**
 * checks whether variable is a function
 * @param {*} variable
 * @return {*|boolean}
 */
export default function isFunction(variable) {
  return variable && functionTypeCheck(variable);
}
