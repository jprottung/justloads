import { describe, it } from 'mocha';
import { assert } from 'chai';
import firstToUpper from '../../src/helper/firstToUpper';

describe('firstToUpper', () => {
  it('should be upper when first is char', () => {
    assert.strictEqual(firstToUpper('asd'), 'Asd', 'first from lower to upper');
    assert.strictEqual(firstToUpper('Asd'), 'Asd', 'first from upper to upper');
  });

  it('should be easy on other functions', () => {
    assert.strictEqual(firstToUpper(''), '', 'empty is empty');
    assert.strictEqual(firstToUpper('0asd'), '0asd', 'number stays');
    assert.strictEqual(firstToUpper('.asd'), '.asd', 'symbol stays');
  });
});
