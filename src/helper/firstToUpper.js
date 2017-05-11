/**
 * capitalizes the first letter of a given text string
 * @param {string} text
 */
export default function firstToUpper(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
