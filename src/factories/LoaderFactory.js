import { TYPE_CONSTANTS } from '../constants/types';
import getFactoryName from '../helper/getFactoryName';
import Loaders from '../loader/Loaders';

const LoaderFactory = (function () {
    const loaderStorage = {};

    return {
        /**
         *
         * @param {string} type
         * @return {AbstractLoader}
         */
        get: function get(type) {
            if (TYPE_CONSTANTS.indexOf(type) === -1) {
                throw new ReferenceError('You tried to get an unsupported loader of type ' + type);
            }

            const storedLoader = loaderStorage[type];

            if (storedLoader) {
                return storedLoader;
            }

            const newLoader = new Loaders[getFactoryName(type, 'Loader')]();
            loaderStorage[type] = newLoader;
            return newLoader;
        }
    };

}());

export default LoaderFactory;
