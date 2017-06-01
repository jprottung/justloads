import Queue from './Queue';

class ObjectFnQueue extends Queue {
  /**
   *
   * @param {Object} obj
   * @param {Array} initial
   * @param {boolean} clone
   */
  constructor(obj, initial = [], clone = false) {
    super(initial, clone);

    this.obj = obj;
  }

  /**
   *
   * @param {string} methodName
   * @return {Function}
   * @private
   */
  resolveFn(methodName) {
    const fn = this.obj[methodName];

    try {
      this.checkMethod(fn);
    } catch (e) {
      throw new ReferenceError(`The function ${methodName} does not exist.'`);
    }

    return fn;
  }

  /**
   *
   * @param {string} methodName
   * @param {Array} methodArgs
   */
  call(methodName, methodArgs = []) {
    if (!methodName) {
      throw new RangeError('please provide at least one argument');
    }

    super.call(this.resolveFn(methodName), methodArgs);
  }
}

export default ObjectFnQueue;
