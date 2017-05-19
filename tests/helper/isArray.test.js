import { describe, it } from 'mocha';
import { assert } from 'chai';
import isArray from '../../src/helper/isArray';

describe('isArray', () => {
  it('should be true when array', () => {
    assert.isOk(isArray([]), 'empty array is a array');
    assert.isOk(isArray([0]), 'array is a array');
  });

  it('should be false if not', () => {
    assert.isNotOk(isArray(null), 'null is not a array');
    assert.isNotOk(isArray(undefined), 'undefined is not a array');
    assert.isNotOk(isArray(0), 'number is not a array');
    assert.isNotOk(isArray(''), 'string is not a array');
    assert.isNotOk(isArray({}), 'object is not a array');
    assert.isNotOk(isArray(false), 'boolean is not a array');
    assert.isNotOk(isArray(() => {}), 'function is not a array');
  });
});
