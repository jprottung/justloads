/**
 * tests if a variable is a boolean
 *
 * @param {*} variable
 * @return {boolean}
 */
export default function isBoolean(variable) {
    return Object.prototype.toString.call(variable) === '[object Boolean]';
}
