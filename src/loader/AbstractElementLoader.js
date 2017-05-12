import AbstractLoader from './AbstractLoader';

class AbstractElementLoader extends AbstractLoader {
    load(resource) {
        const elementProperties = this._prepareElement(resource);

        return this._loadElement(elementProperties);
    }

    /**
     *
     * @param elementProperties
     * @return {Promise}
     * @private
     */
    static _loadElement(elementProperties) {
        return new Promise();
    }

    static _prepareElement(resource) {
        return elementProperties;
    }
}

export default AbstractElementLoader;