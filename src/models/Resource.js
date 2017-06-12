import { RESOURCE_INITIALIZED } from '../constants/status_resource';

/**
 *
 */
export default class Resource {
  /**
   * constructor for the resource
   *
   * @param {{key:string, type:string, url:string, [status]: string}} options
   */
  constructor(options) {
    this.key = options.key;
    this.type = options.type;
    this.url = options.url;
    this.status = options.status || RESOURCE_INITIALIZED;
  }
}
