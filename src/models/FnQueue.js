import Queue from './Queue';

/**
 *
 */
class FnQueue extends Queue {
    /**
     *
     * @param {Function} fn
     * @param {Array} [initial]
     * @param {boolean} [clone]
     */
    constructor(fn, initial = [], clone = false) {
        super(initial, clone);

        super._checkMethod(fn);
        this.fn = fn;
    }

    /**
     *
     * @param {Array} methodArgs
     */
    call(methodArgs = []) {
        super.call(this.fn, methodArgs);
    }
}

export default FnQueue;
