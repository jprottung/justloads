import AbstractElementLoader from './AbstractElementLoader';

class JsLoader extends AbstractElementLoader {
  constructor() {
    super();

    this.type = 'script';

    Object.assign(this.beforeAttributes, {
      type: 'text/javascript',
      async: 1
    });
  }

  /**
   *
   * @param {Resource} resource
   */
  load(resource) {
    return this.loadElement({
      src: resource.src
    });
  }
}

export default JsLoader;
