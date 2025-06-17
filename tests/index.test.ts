import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generate, isValid } from '../src/index.ts';
import npmPackage from '../src/index.ts';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.strictEqual(typeof npmPackage, 'object');
  });

  it('should have a generate,isValid property', () => {
    assert.deepStrictEqual(Object.keys(npmPackage), ['generate', 'isValid']);
  });
});

describe('Generate Function', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof generate, 'function');
  });

  it('should return a valid UUPID', () => {
    const actual = generate();
    assert.equal(isValid(actual), true);
  });
});

describe('isValid Function', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof isValid, 'function');
  });

  it('should be truthy when given an valid UUPID', () => {
    const gen_UUPID = generate();
    console.log(gen_UUPID)
    assert.equal(isValid(gen_UUPID), true);
  });

  it('should be falsey when given an invalid UUPID', () => {
    const actual = isValid('this is an invalid UUPID');
    assert.equal(isValid(actual), false);
  });
});