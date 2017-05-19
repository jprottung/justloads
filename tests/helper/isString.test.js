import { describe, it } from 'mocha';
import { assert } from 'chai';
import isString from '../../src/helper/isString';

describe('isString', () => {
  it('should be true when string', () => {
    assert.isOk(isString(''), 'empty string is a string');
    assert.isOk(isString('asdasd'), 'string is a string');
  });

  it('should be false if not', () => {
    assert.isNotOk(isString(null), 'null is not a string');
    assert.isNotOk(isString(undefined), 'undefined is not a string');
    assert.isNotOk(isString(0), 'number is not a string');
    assert.isNotOk(isString([]), 'array is not a string');
    assert.isNotOk(isString({}), 'object is not a string');
    assert.isNotOk(isString(false), 'boolean is not a string');
    assert.isNotOk(isString(() => {}), 'function is not a string');
  });
});
