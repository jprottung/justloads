import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import resolveType from '../../src/helper/resolveType';

describe('resolveType', () => {
  it('should recognize known extensions', () => {
    assert.equal(resolveType('foo.bar'), 'bar', 'filename should be no problem');
    assert.equal(resolveType('/path/foo.bar'), 'bar', 'path should be no problem');
    assert.equal(resolveType('hello.foo.bar'), 'bar',
      'filename with dots should be no problem');
    assert.equal(resolveType('foo.bar?v=sa'), 'bar',
      'filename with param should be no problem');
  });

  it('should not recognize not known extensions', () => {
    assert.isNotOk(resolveType(''), 'empty is not a file extension');
    assert.isNotOk(resolveType('foo/bar'), 'path is not a file extension');
  });
});
