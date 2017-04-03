/**
 *
 * @type {Object}
 */
const loadCache = [];

/**
 * checks if already in storage
 *
 * @param {string} url
 * @return {boolean}
 */
export function loaded(url) {
    return loadCache[url];
}

/**
 *
 * @param {string} url
 * @param {Element} elem
 */
export function push(url, elem) {
    if (!loaded(url)) {
        loadCache[url] = elem;
    }
}

