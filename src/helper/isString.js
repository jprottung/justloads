/**
 * checks if the value of a variable is from type string
 * @param {*} variable
 * @return {boolean}
 */
export default function isString(variable) {
    return typeof variable === 'string' || variable instanceof String;
}
