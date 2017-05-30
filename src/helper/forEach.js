/**
 *
 * @param {Object} obj
 * @param {Function} callback
 */
export default function forEach(obj, callback) {
  Object.keys(obj)
    .forEach(key => {
      callback(obj[key], key);
    });
}
