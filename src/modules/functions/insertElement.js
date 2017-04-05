

/**
 *
 * @returns {Element}
 */
export function getHead() {
    return d[getElementsByTagName]('head')[0] || d.documentElement;
}

const defaultRefs = (d.body || getHead()).childNodes;
const defaultRef = defaultRefs[defaultRefs.length - 1];

/**
 *
 * @param {Element} element
 * @param {Element} [ref]
 */
export default function (element, ref = defaultRef) {
    ref.parentNode.insertBefore(element, ref);
}