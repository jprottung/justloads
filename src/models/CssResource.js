import ElementResource from './ElementResource';
import { STYLE_MEDIA_DEFAULT } from '../constants/resource';

class CssResource extends ElementResource {
  constructor(options) {
    options.type = 'link';
    super(options);

    this.href = options.href;
    this.media = options.media || STYLE_MEDIA_DEFAULT;
  }
}

export default CssResource;
