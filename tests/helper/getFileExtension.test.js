import { describe, it } from 'mocha';
import { assert } from 'chai';
import getFileExtension from '../../src/helper/getFileExtension';

describe('getFileExtension', () => {
  it('should resolve the file extension', () => {
    assert.equal(getFileExtension('foo.bar'), 'bar', 'filename should be no problem');
    assert.equal(getFileExtension('/path/foo.bar'), 'bar', 'path should be no problem');
    assert.equal(getFileExtension('hello.foo.bar'), 'bar',
      'filename with dots should be no problem');
    assert.equal(getFileExtension('foo.bar?v=sa'), 'bar',
      'filename with param should be no problem');
  });

  it('should not show if no file extension', () => {
    assert.isNotOk(getFileExtension(''), 'empty is not a file extension');
    assert.isNotOk(getFileExtension('foo/bar'), 'path is not a file extension');
  });
});
