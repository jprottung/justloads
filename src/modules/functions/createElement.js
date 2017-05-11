import { d } from './../constants/global';
import entries from './entries';

/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string} type
 * @param {Object} [attributes]
 * @returns {Element}
 */
export default function createElement(type, attributes = {}) {
    const element = d.createElement(type);

    for (let [key, value] of entries(attributes)) {
        element.setAttribute(key, value);
    }

    return element;
}
