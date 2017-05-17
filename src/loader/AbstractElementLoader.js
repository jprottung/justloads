import AbstractLoader from './AbstractLoader';
import createOrModifyElement from '../helper/createOrModifyElement';
import insertElement from '../helper/insertElement';
import loadElementPromise from '../helper/loadElementPromise';

class AbstractElementLoader extends AbstractLoader {
    constructor() {
        super();
        this.beforeAttributes = {};
        this.successAttributes = {};
        this.failAttributes = {};
        this.type = 'div';
    }

    /**
     *
     * @param beforeAttributes
     * @param successAttributes
     * @param failAttributes
     * @return {*}
     */
    loadElement(beforeAttributes = {}, successAttributes = {}, failAttributes = {}) {
        const before = Object.assign({}, this.beforeAttributes, beforeAttributes);
        const success = Object.assign({}, this.successAttributes, successAttributes);
        const fail = Object.assign({}, this.failAttributes, failAttributes);

        const element = createOrModifyElement(this.type, before);

        const promise = loadElementPromise(element);
        promise.then(
            element => createOrModifyElement(element, success),
            (error, element) => createOrModifyElement(element, fail));

        insertElement(element);

        return promise;
    }
}

export default AbstractElementLoader;