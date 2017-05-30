/**
 * tests if a variable is a boolean
 *
 * @param variable
 * @return {boolean}
 */
export default function isBoolean(variable) {
  return variable === true || variable === false || toString.call(variable) === '[object Boolean]';
}
