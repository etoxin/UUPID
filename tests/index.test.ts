import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generate, isValid, NUM_UNITS, UUPID_DICTIONARY } from '../src/index.ts';
import npmPackage from '../src/index.ts';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.strictEqual(typeof npmPackage, 'object');
  });

  it('should have a generate,isValid property', () => {
    assert.deepStrictEqual(Object.keys(npmPackage), ['UUPID_DICTIONARY','NUM_UNITS','generate', 'isValid']);
  });
});

describe('Generate Function', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof generate, 'function');
  });

  it('should return a string', () => {
    const uupid = generate();
    assert.strictEqual(typeof uupid, 'string', 'Generated UUPID should be a string');
  });

    it('should return a UUPID with the correct number of segments', () => {
    const uupid = generate();
    const segments = uupid.split('-');
    assert.strictEqual(segments.length, NUM_UNITS, `Generated UUPID should have ${NUM_UNITS} segments`);
  });

  it('should return a UUPID where each segment is from the dictionary and preserves casing', () => {
    const uupid = generate();
    const segments = uupid.split('-');
    segments.forEach(segment => {
      assert.ok(UUPID_DICTIONARY.includes(segment), `Segment "${segment}" should exist in the dictionary with exact casing`);
    });
  });

  it('should generate unique UUPIDs', () => {
    const UUPID_SET_SIZE = 10_000_000;
    const result = new Set();
    for (let step = 0; step < UUPID_SET_SIZE; step++) {
      // Set will remove duplicates and change set size if duplicates are found.
      result.add(generate());
    }
    assert.strictEqual(result.size, UUPID_SET_SIZE)
  });

  it('should generate different UUPIDs on successive calls (high probability)', () => {
    // Due to the nature of random numbers, there's a theoretical chance of collision,
    // but with CSPRNG and sufficient entropy, it should be extremely rare.
    // We'll generate a few and check for uniqueness.
    const uupid1 = generate();
    const uupid2 = generate();
    const uupid3 = generate();
    assert.notStrictEqual(uupid1, uupid2, 'Consecutive UUPIDs should be different');
    assert.notStrictEqual(uupid1, uupid3, 'Consecutive UUPIDs should be different');
    assert.notStrictEqual(uupid2, uupid3, 'Consecutive UUPIDs should be different');
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