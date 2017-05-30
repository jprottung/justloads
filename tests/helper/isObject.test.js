import { describe, it } from 'mocha';
import { assert } from 'chai';
import isObject from '../../src/helper/isObject';

describe('isObject', () => {
  it('should be true when object', () => {
    assert.isOk({}, 'empty object is an object');
    assert.isOk({ e: 3 }, 'object is an object');
  });

  it('should be false if not', () => {
    assert.isNotOk(isObject(null), 'null is not an object');
    assert.isNotOk(isObject(undefined), 'undefined is not an object');
    assert.isNotOk(isObject(0), 'number is not an object');
    assert.isNotOk(isObject(''), 'string is not an object');
    assert.isNotOk(isObject(false), 'boolean is not an object');
    assert.isNotOk(isObject([]), 'array is not an object');
    assert.isNotOk(isObject(() => {
    }), 'function is not an object');
  });
});
