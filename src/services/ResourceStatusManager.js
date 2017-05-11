import ResourceFactory from '../factories/ResourceFactory';
import { LOAD_CONSTANTS, LOAD_INITIALIZED } from '../constants/status';

'use strict';

const StatusManager = (function () {
    const resourceStatusDatabase = {};
    const resourceQueueDatabase

    /**
     * checks if load instance exists already
     *
     * @param {string} key
     * @return {boolean}
     * @throws ReferenceError
     * @private
     */
    function _checkExists(key) {
        if (resourceStatusDatabase[key] === undefined) {
            throw new ReferenceError('the resource load instance with key ' + key + ' does not' +
                ' exist yet');
        }

        return true;
    }

    return {
        /**
         *
         * @param {{key, url}} properties
         */
        addResource: function (properties) {
            const resource = ResourceFactory.createResource(properties);

            resourceStatusDatabase[resource.get('key')] = {
                status: LOAD_INITIALIZED,
                resource: resource
            };
        },
        /**
         *
         * @param {string} key
         * @param {string} status
         */
        updateStatus: function (key, status) {
            if (LOAD_CONSTANTS.indexOf(status) === -1) {
                throw new Error('the load status ' + status + ' is not valid');
            }

            if (_checkExists(key)) {
                resourceStatusDatabase[key].status = status;
            }
        },
        /**
         *
         * @param {key} key
         * @return {string|undefined}
         */
        getStatus: function (key) {
            let status;
            if (_checkExists(key)) {
                status = resourceStatusDatabase[key].status;
            }

            return status;
        }
    };
})();

export default StatusManager;