export default class AbstractLoader {
  /**
   *
   * @param {Resource} resource
   * @abstract
   */
  load(resource) { // eslint-disable-line
    throw new Error('load has to be overwritten');
  }
}
