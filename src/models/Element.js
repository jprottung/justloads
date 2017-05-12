import { d } from './../constants/global';
import entries from '../helper/entries';
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
        this.element = this._createElement();
    }

    /**
     *
     * @param {Object} attributes
     */
    static assignAttributes(attributes = null) {
        if(isObject(attributes)) {
            Object.assign(this.attrs, attributes);
        }
        for(let [key, value] of entries(this.attrs)) {
            this.element.setAttribute(key, value);
        }
    }

    /**
     *
     * @return {Element}
     * @private
     */
    static _createElement() {
        const element = d.createElement(this.type);

        this.assignAttributes();

        return element;
    }
}

export default Element;
