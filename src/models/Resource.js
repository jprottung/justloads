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
    this.key = options.key;
    this.type = options.type;
    this.status = options.status || RESOURCE_INITIALIZED;
  }

  /**
   *
   * @return {string}
   */
  getKey() {
    return this.key;
  }

  /**
   *
   * @return {string}
   */
  getType() {
    return this.type;
  }

  /**
   *
   * @param {string} type
   * @private
   * @return {Resource}
   */
  setType(type) {
    if (TYPE_CONSTANTS.indexOf(type) === -1) {
      this.type = type;
    } else {
      throw new Error(`type ${type} not available in types`);
    }

    return this;
  }

  /**
   *
   * @return {string}
   */
  getStatus() {
    return this.status;
  }

  /**
   *
   * @param {string} status
   * @return {Resource}
   */
  setStatus(status) {
    if (RESOURCE_CONSTANTS.indexOf(status) === -1) {
      this.status = status;
    } else {
      throw new Error(`status ${status} not available in resource constants`);
    }

    return this;
  }

  /**
   *
   * @return {object}
   */
  getOptions() {
    return this.options;
  }
}
