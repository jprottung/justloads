import isString from '../helper/isString';
import isArray from '../helper/isArray';

export default class ResourceLoadQueue {
    /**
     *
     * @param {string|[]} resourceKeys
     */
    constructor(resourceKeys) {
        if (isString(resourceKeys)) {
            resourceKeys = [resourceKeys];
        }

        if (!isArray(resourceKeys)) {
            throw new TypeError('resource key(s) must be an array or a single string');
        }

        this._resourceKeys = resourceKeys;
    }

    /**
     *
     * @return {[]}
     */
    getResourceKeys() {
        return this._resourceKeys;
    }


}
