import { describe, it } from 'mocha';
import { assert } from 'chai';
import extend from '../../src/helper/extend';

describe('extend', () => {
  it('should work with multiple objects', () => {
    assert.deepEqual(extend(), {}, 'no arg is fine');
    assert.deepEqual(extend({}), {}, 'one arg is fine');
    assert.deepEqual(extend({}, {}), {}, 'two args are fine');
  });

  it('should should extend object', () => {
    assert.deepEqual(extend({ foo: 'foo' }, { bar: 'bar' }), {
      foo: 'foo',
      bar: 'bar'
    }, 'keys and values get created');
    assert.deepEqual(extend({ foo: 'foo' }, { foo: 'foo2' }), {
      foo: 'foo2'
    }, 'values get overridden');
  });

  it('should take empty objects and non empty objects', () => {
    assert.deepEqual(extend({}, { foo: 'foo' }), { foo: 'foo' }, 'first argument is empty');
    assert.deepEqual(extend({ foo: 'foo' }, {}), { foo: 'foo' }, 'second argument is empty');
  });
});

describe('extendDeep', () => {
  it('should work with multiple objects', () => {
    assert.deepEqual(extend(true), {}, 'no arg is fine');
    assert.deepEqual(extend(true, {}), {}, 'one arg is fine');
    assert.deepEqual(extend(true, {}, {}), {}, 'two args are fine');
  });

  it('should should extend object', () => {
    assert.deepEqual(extend(true, { foo: 'foo' }, { bar: 'bar' }), {
      foo: 'foo',
      bar: 'bar'
    }, 'keys and values get created');
    assert.deepEqual(extend(true, { foo: 'foo' }, { foo: 'foo2' }), {
      foo: 'foo2'
    }, 'values get overridden');
  });

  it('should deep extend object', () => {
    assert.deepEqual(extend(true, { foo: { bar: 'bar' } }, { foo: { foo: 'foo' } }),
      {
        foo: {
          bar: 'bar',
          foo: 'foo'
        }
      }, 'create in sub object');

    assert.deepEqual(extend(true, { foo: { bar: 'bar' } }, { foo: { bar: 'bar2' } }),
      {
        foo: {
          bar: 'bar2'
        }
      }, 'override in sub object');

    assert.deepEqual(extend(true, { foo: ['bar'] }, { foo: ['bar'] }),
      {
        foo: [
          'bar',
          'bar'
        ]
      }, 'concat of sub array');
  });

  it('should take empty objects and non empty objects', () => {
    assert.deepEqual(extend(true, {}, { foo: 'foo' }), { foo: 'foo' }, 'first argument is empty');
    assert.deepEqual(extend(true, { foo: 'foo' }, {}), { foo: 'foo' }, 'second argument is empty');

    assert.deepEqual(extend(true, { foo: {} }, { foo: { bar: 'bar' } }),
      { foo: { bar: 'bar' } }, 'first sub object is empty');
    assert.deepEqual(extend(true, { foo: { bar: 'bar' } }, { foo: {} }),
      { foo: { bar: 'bar' } }, 'second sub object is empty');

    assert.deepEqual(extend(true, { foo: [] }, { foo: ['bar'] }),
      { foo: ['bar'] }, 'first sub array is empty');
    assert.deepEqual(extend(true, { foo: ['bar'] }, { foo: [] }),
      { foo: ['bar'] }, 'second sub array is empty');
  });

});
