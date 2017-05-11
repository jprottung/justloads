import extend from '../helper/extend';
import {
    LOADER_INITIALIZED,
    LOADER_SUCCESS,
    LOADER_FAILED,
    LOADER_STARTED
} from '../modules/constants/status';

export default class Loader {
    /**
     *
     * @param {Object} [options]
     * @param {Object} [callbacks]
     */
    constructor(options = {}, callbacks = {}) {
        this._config = extend(true, this._defaultConfig(), options);
        this._callbacks = extend(this._defaultCallbacks, callbacks);
        this._status = LOADER_INITIALIZED;
        this._callbacks.onInit(this);
    }

    /**
     * wrapper method for getting default values
     * @return {{}}
     * @private
     */
    _defaultConfig() {
        return {};
    }

    /**
     *
     * @return {{onInit: (function()), onStart: (function()), onSuccess: (function()), onError: (function()), onAlways: (function())}}
     * @private
     */
    _defaultCallbacks() {
        return {
            onInit: () => {
            },
            onStart: () => {
            },
            onSuccess: () => {
            },
            onError: () => {
            },
            onAlways: () => {
            },
        };
    }

    _load(parameters = {}) {
        const xhr = new XMLHttpRequest();

    }

    fetch(parameters = {}) {
        this._status = LOADER_STARTED;
        this._callbacks.onStart(this);
        const promise = this._load(parameters);

        promise
            .then((result) => {
                this._callbacks.onSuccess(this, result);
                this._status = LOADER_SUCCESS;
            })
            .catch(
                (error) => {
                    this._callbacks.onError(this, error);
                    this._status = LOADER_FAILED;
                })
            .then(() => this._callbacks.onAlways(this));

        return promise;
    }

    /**
     *
     * @return {string}
     */
    status() {
        return this._status;
    }
}
