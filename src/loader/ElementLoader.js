import createOrModifyElement from '../helper/createOrModifyElement';
import insertElement from '../helper/insertElement';
import loadElementPromise from '../helper/loadElementPromise';

class ElementLoader {
  /**
   *
   * @param {ElementResource} resource
   * @returns {Promise}
   */
  load(resource) {
    const element = createOrModifyElement(resource.tag, resource.attr);

    const promise = loadElementPromise(element);
    promise.then(
      element => createOrModifyElement(element, resource.sAttr),
      (error, element) => createOrModifyElement(element, resource.fAttr));

    insertElement(element);

    return promise;
  }
}

export default ElementLoader;
