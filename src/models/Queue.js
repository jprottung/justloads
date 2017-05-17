import isFunction from '../helper/isFunction';

class Queue {
    constructor(initial = [], clone = false) {
        if (clone) {
            this.queue = initial.slice(0);
        } else {
            this.queue = initial;
        }
    }

    static _checkMethod(fn) {
        if (!isFunction(fn)) {
            throw new TypeError('fn must be a function');
        }
    }

    /**
     *
     */
    empty() {
        const queue = this.queue;
        while (queue.length) {
            const current = queue.pop();
            this.call.apply(this, current);
        }
    }

    /**
     *
     * @param fn
     * @param args
     */
    call(fn, args = []) {
        this._checkMethod(fn);
        fn.apply(args);
    }

    push() {
        this.call.apply(this, arguments);
    }
}

export default Queue;
