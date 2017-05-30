import { describe, it } from 'mocha';
import { assert } from 'chai';
import isBoolean from '../../src/helper/isBoolean';

describe('isBoolean', () => {
  it('should be true when boolean', () => {
    assert.isOk(isBoolean(true), 'true is a boolean');
    assert.isOk(isBoolean(false), 'false is a boolean');
  });

  it('should be false if not', () => {
    assert.isNotOk(isBoolean(null), 'null is not a boolean');
    assert.isNotOk(isBoolean(undefined), 'undefined is not a boolean');
    assert.isNotOk(isBoolean(0), 'number is not a boolean');
    assert.isNotOk(isBoolean(''), 'string is not a boolean');
    assert.isNotOk(isBoolean({}), 'object is not a boolean');
    assert.isNotOk(isBoolean([]), 'array is not a boolean');
    assert.isNotOk(isBoolean(() => {}), 'function is not a boolean');
  });
});
