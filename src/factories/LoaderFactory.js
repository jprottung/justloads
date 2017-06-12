import { TYPE_CONSTANTS, TYPE_HIERARCHIES } from '../constants/types';
import getFactoryName from '../helper/getFactoryName';
import Loaders from '../loader/Loaders';

const LoaderFactory = (() => {
  const loaderStorage = {};

  /**
   *
   * @param {string} type
   * @return {ElementLoader}
   */
  function get(type) {
    if (TYPE_CONSTANTS.indexOf(type) === -1) {
      throw new ReferenceError(`You tried to get an unsupported loader of type ${type}`);
    }

    let hierarchyType = TYPE_HIERARCHIES[type];

    if (hierarchyType) {
      type = hierarchyType;
    }

    const storedLoader = loaderStorage[type];

    if (storedLoader) {
      return storedLoader;
    }

    const newLoader = new Loaders[getFactoryName(type, 'Loader')]();
    loaderStorage[type] = newLoader;
    return newLoader;
  }

  /**
   *
   * @param {Resource} resource
   * @returns {Promise}
   */
  function load(resource) {
    return get(resource.type)
      .load(resource);
  }

  return {
    load
  };
})();

export default LoaderFactory;
