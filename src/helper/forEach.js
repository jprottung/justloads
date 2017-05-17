/**
 *
 * @param {Array|Object} obj
 * @param {Function} callback
 */
export default function forEach(obj, callback) {
  Object.entries(obj)
    .forEach(([key, value]) => {
      callback(value, key);
    });
}
