/**
 *
 * @param {Array|Object} obj
 * @param {Function} callback
 */
export default function forEach(obj, callback) {
    for (let key in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(key)) continue;

        callback(obj[key], key);
    }
}
