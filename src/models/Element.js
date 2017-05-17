import { d } from './../constants/global';
import forEach from '../helper/forEach';
import isObject from '../helper/isObject';

class Element {
  /**
   *
   * @param {{type:string, attrs:Object}} options
   */
  constructor({
                type,
                attributes = {}
              }) {
    this.type = type;
    this.attrs = attributes;
    this.element = this.createElement();
  }

  /**
   *
   * @param {Object} attributes
   */
  static assignAttributes(attributes = null) {
    if (isObject(attributes)) {
      Object.assign(this.attrs, attributes);
    }

    forEach(this.attrs, (value, key) => this.element.setAttribute(key, value));
  }

  /**
   *
   * @return {Element}
   * @private
   */
  static createElement() {
    const element = d.createElement(this.type);

    this.assignAttributes();

    return element;
  }
}

export default Element;
