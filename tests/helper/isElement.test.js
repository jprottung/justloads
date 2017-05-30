import { describe, it } from 'mocha';
import { assert } from 'chai';
import createTestDom from './../test_helpers/createTestDom';
import isElement from '../../src/helper/isElement';

describe('isElement', () => {
  it('should be true when element', () => {
    const dom = createTestDom();
    const document = dom.window.document;
    assert.isOk(isElement(document.createElement('div')), 'element is an element');
  });

  it('should be false if not', () => {
    assert.isNotOk(isElement(null), 'null is not an element');
    assert.isNotOk(isElement(undefined), 'undefined is not an element');
    assert.isNotOk(isElement(0), 'number is not an element');
    assert.isNotOk(isElement(''), 'string is not an element');
    assert.isNotOk(isElement(false), 'boolean is not an element');
    assert.isNotOk(isElement([]), 'array is not an element');
    assert.isNotOk(isElement({}), 'object is not an element');
    assert.isNotOk(isElement(() => {
    }), 'function is not an element');
  });
});
