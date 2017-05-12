import extend from '../helper/extend';
import {
    LOADER_INITIALIZED,
    LOADER_SUCCESS,
    LOADER_FAILED,
    LOADER_STARTED
} from '../modules/constants/status';

export default class AbstractLoader {
    /**
     *
     * @param {Resource} resource
     */
    load(resource) { // eslint-disable-line
        throw new Error('this is an abstract method');
    }
}
