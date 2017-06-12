import ElementResource from './ElementResource';

class JsResource extends ElementResource {
  constructor(options) {
    super(options);

    this.tag = this.tag || 'script';

    const attr = this.attr;

    attr.src = attr.src || this.url;
    attr.type = attr.type || 'text/javascript';
    attr.defer = attr.defer || 1;
  }
}

export default JsResource;
