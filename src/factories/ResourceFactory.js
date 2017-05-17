import Resource from '../models/Resource';

/**
 *
 * @type {{createResource}}
 */
const ResourceFactory = () => {
  /**
   *
   * @type {{}}
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
};

export default ResourceFactory;
