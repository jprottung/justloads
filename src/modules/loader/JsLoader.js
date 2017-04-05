import ElementLoader from './ElementLoader';

export default class CssLoader extends ElementLoader {

    constructor() {
        super('script', {
            async: true,
        });
    }

    /**
     *
     * @param {string} url
     * @param {Object} [attributes]
     * @param {Element} [ref]
     * @return {Promise.<Element>}
     */
    load(url, attributes = {}, ref = this.defaultRef) {
        const mergedAttributes = Object.assign({
            src: url
        }, attributes);

        return this.loadElement(mergedAttributes, ref);
    }
}
