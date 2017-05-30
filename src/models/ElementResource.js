import Resource from './Resource';

class ElementResource extends Resource {
  constructor(options) {
    super(options);
    this.type = options.type;
  }
}

export default ElementResource;
