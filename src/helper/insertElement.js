import {d, getElementsByTagName} from './../constants/global';

/**
 * gets the element head
 * @returns {Element}
 */
export function getHead() {
    return d[getElementsByTagName]('head')[0] || d.documentElement;
}

const defaultRefs = (d.body || getHead()).childNodes;
const defaultRef = defaultRefs[defaultRefs.length - 1];

/**
 * inserts an element before the given ref or if no reference is given as the last element
 * of the body or head depending on what is already registered
 * @param {Element} element
 * @param {Element} [ref]
 */
export default function insertElement(element, ref = defaultRef) {
    ref.parentNode.insertBefore(element, ref);
}