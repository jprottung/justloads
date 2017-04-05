/**
 * Implements a
 */
export default class Storage {
    /**
     *
     */
    constructor() {
        /**
         *
         * @type {Object.<string, Element>}
         */
        this.cache = {};
    }

    /**
     *
     * @param url
     * @return {Element}
     */
    loaded(url) {
        return this.cache[url];
    }

    /**
     *
     * @param {string} url
     * @param {Element} elem
     */
    push(url, elem) {
        if (!this.loaded(url)) {
            this.cache[url] = elem;
        }
    }

    /**
     *
     * @param {string} url
     */
    remove(url) {
        if (this.loaded(url)) {
            delete this.cache[url];
        }
    }
}
