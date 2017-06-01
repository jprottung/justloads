import Resource from '../models/Resource';

/**
 *
 * @return {{createResource: (function({key: string, type: string, options: Object, status?: string}))}}
 * @constructor
 */
const ResourceFactory = (() => {
  /**
   *
   * @type {Object}
   */
  const resourceStorage = {};

  return {
    /**
     *
     * @param {{key:string, type:string, options: object, [status]: string}} options
     * @return {Resource}
     */
    createResource: (options) => {
      const key = options.key;
      const storedResource = resourceStorage[key];

      if (storedResource) {
        return storedResource;
      }

      const newResource = new Resource(options);
      resourceStorage[key] = newResource;

      return newResource;
    }
  };
})();

export default ResourceFactory;
