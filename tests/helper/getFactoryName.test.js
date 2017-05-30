import { describe, it } from 'mocha';
import { assert } from 'chai';
import getFactoryName from '../../src/helper/getFactoryName';

describe('getFactoryName', () => {

  it('should not have a suffix if not provided', () => {
    assert.strictEqual(getFactoryName(''), '', 'empty to empty');
    assert.strictEqual(getFactoryName('asd'), 'Asd', 'text to upper without suffix');
  });

  it('should have a suffix if provided', () => {
    assert.strictEqual(getFactoryName('', 'Peter'), 'Peter', 'empty to suffix');
    assert.strictEqual(getFactoryName('asd', 'Peter'), 'AsdPeter', 'text to upper with suffix');
  });
});
