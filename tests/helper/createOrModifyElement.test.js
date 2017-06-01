import { describe, it } from 'mocha';
import { assert } from 'chai';

import createOrModifyElement from '../../src/helper/createOrModifyElement';
import isElement from '../../src/helper/isElement';

describe('createOrModifyElement', () => {

  it('should create an element', () => {
    assert.isOk(isElement(createOrModifyElement('div')), 'without attributes');
    assert.isOk(isElement(createOrModifyElement('div', {
      id: 'foo',
      class: 'foo bar'
    })), 'with attributes');
  });

  it('should return an element when there is an element passed', () => {
    const element = document.createElement('div');

    assert.isOk(isElement(createOrModifyElement(element)), 'without attributes');
    assert.isOk(isElement(createOrModifyElement(element, {
      id: 'foo',
      class: 'foo bar'
    })), 'with attributes');
  });

  it('should create or modify an element with given attributes', () => {
    const createdElem = createOrModifyElement('div', {
      id: 'foo',
      class: 'foo bar'
    });

    assert.isOk(createdElem.getAttribute('id') === 'foo' &&
      createdElem.getAttribute('class') === 'foo bar', 'attributes set on creation');
    // test element modification
    const elem = document.createElement('div');

    elem.setAttribute('id', 'foo');
    elem.setAttribute('class', 'foo');

    const modifiedElem = createOrModifyElement(elem, {
      class: 'foo bar',
      'data-test': 'foo'
    });

    assert.isOk(modifiedElem.getAttribute('id') === 'foo' &&
      modifiedElem.getAttribute('class') === 'foo bar' &&
      modifiedElem.getAttribute('data-test') === 'foo', 'attributes modified and extended');
  });

});
