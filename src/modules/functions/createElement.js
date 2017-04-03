/**
 * Creates an Element with a given type and a number of attributes
 *
 * @param {string} type
 * @param {Object} [attributes]
 * @returns {Element}
 */
export default function createElement(type, attributes = {}) {
    const element = document.createElement(type);

    for (let attributeKey in attributes) {
        if (attributes.hasOwnProperty(attributeKey)) {
            element.setAttribute(attributeKey, attributes[attributeKey]);
        }
    }

    return element;
}
