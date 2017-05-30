/**
 * Returns true if it is a DOM element
 * @param {*} variable
 * @return {*|boolean}
 */
export default function isElement(variable) {
  return (
    typeof HTMLElement === 'object' ? variable instanceof HTMLElement : //DOM2
      variable && typeof variable === 'object' && variable !== null &&
      variable.nodeType === 1 && typeof variable.nodeName === 'string'
  );
}
