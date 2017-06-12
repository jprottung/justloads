/**
 *
 * @return {{createResource: (function({key: string, type: string, options: Object, status?: string}))}}
 * @constructor
 */
import { TYPE_CONSTANTS } from '../constants/types';
import getFactoryName from '../helper/getFactoryName';
import Resources from '../models/Resources';
import isString from '../helper/isString';
import resolveType from '../helper/resolveType';

const ResourceManager = (() => {
  /**
   *
   * @type {Object}
   */
  const resourceStorage = {};

  /**
   * @param {{key:string, type:string, [status]: string}} options
   * @return {Resource}
   */
  function create(options) {
    options.type = options.type || resolveType(options.url || '');

    const type = options.type;

    if (TYPE_CONSTANTS.indexOf(type) === -1) {
      throw new ReferenceError(`You tried to get an unsupported resource of type ${type}`);
    }

    return new Resources[getFactoryName(type, 'Resource')](options);
  }

  /**
   *
   * @param {string|object} keyOrOptions
   * @returns {Resource}
   */
  function get(keyOrOptions) {
    let options = keyOrOptions;

    if (isString(keyOrOptions)) {
      options = {
        key: keyOrOptions,
        url: keyOrOptions
      };
    }

    const key = options.key;
    const storedResource = resourceStorage[key];

    if (storedResource) {
      return storedResource;
    }

    const resource = create(options);

    resourceStorage[key] = resource;

    return resource;
  }

  return {
    get
  };
})();

export default ResourceManager;
