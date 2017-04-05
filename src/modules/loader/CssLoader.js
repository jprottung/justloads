import ElementLoader from './ElementLoader';

export default class CssLoader extends ElementLoader {

    constructor() {
        super('link', {
            type: 'text/css',
            rel: 'stylesheet',
            media: 'only x'
        });
    }

    /**
     *
     * @param {string} url
     * @param {string} [media]
     * @param {Object} [attributes]
     * @param {Element} [ref]
     * @return {Promise.<Element>}
     */
    load(url, media = 'all', attributes = {}, ref = this.defaultRef) {
        const mergedAttributes = Object.assign({
            href: url
        }, attributes);

        return this.loadElement(mergedAttributes, ref)
            .then(element => element.media = media);
    }
}
