/**
 *
 * @param {*} variable
 * @return {*|boolean}
 */
export default function isFunction(variable) {
    const getType = {};
    return variable && getType.toString.call(variable) === '[object Function]';
}
