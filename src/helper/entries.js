/**
 * generates an generator for better loop through object entries
 *
 * @param {Object} obj
 */
export default function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [
            key,
            obj[key]
        ];
    }
}
