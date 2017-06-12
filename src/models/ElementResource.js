import Resource from './Resource';

class ElementResource extends Resource {
  /**
   * constructor for the resource
   *
   * @param {{key:string, tag: string, type:string, options: object, [status]: string, [attr]:object, [fAttr]: object, [sAttr]: object}} options
   */
  constructor(options) {
    super(options);
    this.tag = options.tag;
    this.attr = options.attr || {};
    this.fAttr = options.fAttr || {};
    this.sAttr = options.sAttr || {};
  }
}

export default ElementResource;
