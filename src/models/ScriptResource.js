import ElementResource from './ElementResource';
import { SCRIPT_ASYNC } from '../constants/resource';

class ScriptResource extends ElementResource {
    constructor(options) {
        options.type = 'script';
        super(options);

        this.src = options.src;
        this.loadType = options.loadType || SCRIPT_ASYNC;
    }
}

export default ScriptResource;