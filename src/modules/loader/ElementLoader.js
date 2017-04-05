const d = document;
const getElementsByTagName = 'getElementsByTagName';
const readyState = 'readyState';
const onreadystatechange = 'onreadystatechange';
const addEventListener = 'addEventListener';

export default class ElementLoader {

    /**
     *
     * @param {string} type
     * @param {Object} [attributes]
     */
    constructor(type, attributes = {}) {
        this.type = type;
        this.attributes = attributes;
        const defaultRefs = (d.body || this._getHead()).childNodes;
        this.defaultRef = defaultRefs[defaultRefs.length - 1];
    }

    /**
     * @return {Element}
     * @private
     */
    static _getHead() {
        return d[getElementsByTagName]('head')[0] || d.documentElement;
    }

    _insertElement(element, ref = this.defaultRef) {
        ref.parentNode.insertBefore(element, ref);
    }

    /**
     *
     * @param {Object} [attributes]
     * @return {Element}
     * @private
     */
    _createElement(attributes = {}) {
        const element = document.createElement(this.type);
        const mergedAttributes = Object.assign({}, this.attributes, attributes);

        for (let attributeKey in mergedAttributes) {
            if (mergedAttributes.hasOwnProperty(attributeKey)) {
                element.setAttribute(attributeKey, mergedAttributes[attributeKey]);
            }
        }

        return element;
    }

    _loadElementPromise(element) {
        let complete = false;

        return new Promise(function elementPromises(resolve, reject) {
            const rejectHandler = function rejectCb(error) {
                    reject(error, element);
                },
                resolveHandler = function rejectCb() {
                    resolve(element);
                };

            if (element[readyState]) {
                element[onreadystatechange] = function onreadystatechangeHandler() {
                    if (!complete && (element[readyState] === 'complete')) {
                        complete = true;
                        resolveHandler();
                    }
                };
            } else {
                element[addEventListener]('load', resolveHandler);
            }

            element[addEventListener]('error', rejectHandler);
            element[addEventListener]('abort', rejectHandler);
        });
    }

    _buildOptions(options) {
        let actualOptions = {
            attributes : Object.assign({}, this.attributes, options.attributes || {}),
            ref : options.ref || this.defaultRef
        };

        
    }

    /**
     * @param {{}} options
     * @return {Promise}
     */
    load(options) {
        let defaults = {
            attributes: {},

        }

        options.attributes = Oboptions.attributes || {};

        const element = this._createElement(attributes);

        const p = this._loadElementPromise(element);
        this._insertElement(element, ref);

        return p;
    }
}