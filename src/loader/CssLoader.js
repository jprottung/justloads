import AbstractElementLoader from './AbstractElementLoader';

class CssLoader extends AbstractElementLoader {
    constructor() {
        super();

        this.type = 'link';

        Object.assign(this.beforeAttributes, {
            rel: 'stylesheet',
            media: 'x'
        });

        Object.assign(this.successAttributes, {
            media: 'all'
        });
    }

    /**
     *
     * @param {Resource} resource
     */
    load(resource) {
        return this.loadElement({
            href: resource.href
        });
    }
}

export default CssLoader;
