import { RESOURCE_INITIALIZED, RESOURCE_CONSTANTS } from '../constants/status_resource';
import { TYPE_CONSTANTS } from '../constants/types';

/**
 *
 */
export default class Resource {
    /**
     * constructor for the resource
     *
     * @param {{key:string, type:string, options: object, [status]: string}} options
     */
    constructor(options) {
        this._key = options.key;
        this._type = options.type;
        this._status = options.status || RESOURCE_INITIALIZED;
        this._options = options.options;
    }

    /**
     *
     * @return {string}
     */
    getKey() {
        return this._key;
    }

    /**
     *
     * @return {string}
     */
    getType() {
        return this._type;
    }

    /**
     *
     * @param {string} type
     * @private
     * @return {Resource}
     */
    _setType(type) {
        if (TYPE_CONSTANTS.indexOf(type) === -1) {
            this._type = type;
        } else {
            throw new Error('type ' + type + ' not available in types');
        }

        return this;
    }

    /**
     *
     * @return {string}
     */
    getStatus() {
        return this._status;
    }

    /**
     *
     * @param {string} status
     * @return {Resource}
     */
    setStatus(status) {
        if (RESOURCE_CONSTANTS.indexOf(status) === -1) {
            this._status = status;
        } else {
            throw new Error('status ' + status + ' not available in resource constants');
        }

        return this;
    }

    /**
     *
     * @return {object}
     */
    getOptions() {
        return this._options;
    }
}
