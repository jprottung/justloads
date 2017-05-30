/**
 * Capitalizes the first letter
 *
 * @param {string} text
 * @returns {string}
 */
export default function capitalizeFirstLetter(text) {
  return text.charAt(0)
      .toUpperCase() + text.slice(1);
}
