export default class AbstractLoader {
  /**
   *
   * @param {Resource} resource
   */
  load(resource) { // eslint-disable-line
    throw new Error('this is an abstract function');
  }
}
