import isFunction from '../helper/isFunction';

class Queue {
  constructor(initial = [], clone = false) {
    if (clone) {
      this.queue = initial.slice(0);
    } else {
      this.queue = initial;
    }
  }

  checkMethod(fn) {
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
      this.call(...current);
    }
  }

  /**
   *
   * @param fn
   * @param args
   */
  call(fn, args = []) {
    this.checkMethod(fn);
    fn(...args);
  }

  push(...args) {
    this.call(...args);
  }
}

export default Queue;
