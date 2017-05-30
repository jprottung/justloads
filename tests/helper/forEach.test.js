import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import forEach from '../../src/helper/forEach';

describe('forEach', () => {

  it('should not call the callback for empty objects', () => {
    const forEachCbSpy = sinon.spy();

    // test empty object
    const emptyTestObject = {};
    forEach(emptyTestObject, forEachCbSpy);
    assert.equal(forEachCbSpy.callCount, 0, 'empty object should not result in a call');
    forEachCbSpy.reset();
  });

  it('should call the callback for every key value pair', () => {
    const forEachCbSpy = sinon.spy();

    // test object with keys
    const testObject = {
      foo: 'foo',
      bar: 'bar',
    };
    forEach(testObject, forEachCbSpy);
    assert.equal(forEachCbSpy.callCount, 2, 'two key object should result in two calls');
    forEachCbSpy.reset();
  });

  it('should call the callback with value first and key second', () => {
    const forEachCbSpy = sinon.spy();

    // test object key value order
    const testObject = {
      foo: 'foo2',
    };
    forEach(testObject, forEachCbSpy);
    assert.deepEqual(forEachCbSpy.firstCall.args, [
      'foo2',
      'foo'
    ], 'value should be first then key on objects');
    forEachCbSpy.reset();
  });
});
