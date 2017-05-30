import { describe, it } from 'mocha';
import { assert } from 'chai';
import isFunction from '../../src/helper/isFunction';

describe('isFunction', () => {
  it('should be true when function', () => {
    assert.isOk(isFunction(() => {}), 'arrow function is a function');
    assert.isOk(isFunction(function(){}), 'empty function is a function'); // eslint-disable-line
  });

  it('should be false if not', () => {
    assert.isNotOk(isFunction(null), 'null is not a function');
    assert.isNotOk(isFunction(undefined), 'undefined is not a function');
    assert.isNotOk(isFunction(0), 'number is not a function');
    assert.isNotOk(isFunction(''), 'string is not a function');
    assert.isNotOk(isFunction({}), 'object is not a function');
    assert.isNotOk(isFunction([]), 'array is not a function');
    assert.isNotOk(isFunction(false), 'boolean is not a function');
  });
});
