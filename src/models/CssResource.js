import ElementResource from './ElementResource';
import { STYLE_MEDIA_DEFAULT } from '../constants/resource';

class CssResource extends ElementResource {
  constructor(options) {
    super(options);

    this.tag = this.tag || 'link';

    const attr = this.attr;

    attr.rel = attr.rel || 'stylesheet';
    attr.media = attr.media || 'x';
    attr.href = attr.href || this.url;

    const sAttr = this.sAttr;

    sAttr.media = sAttr.media || STYLE_MEDIA_DEFAULT;
  }
}

export default CssResource;
