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
    console.log(uupid1);
    console.log(uupid2);
    console.log(uupid3);
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
  it('should return false for non-string inputs', () => {
    assert.strictEqual(isValid(null), false, 'null should be invalid');
    assert.strictEqual(isValid(undefined), false, 'undefined should be invalid');
    assert.strictEqual(isValid(123), false, 'number should be invalid');
    assert.strictEqual(isValid({}), false, 'object should be invalid');
    assert.strictEqual(isValid([]), false, 'array should be invalid');
  });

  it('should return false for an empty string', () => {
    assert.strictEqual(isValid(''), false, 'Empty string should be invalid');
  });

  it('should return false for a UUPID with an incorrect number of segments', () => {
    // Assuming NUM_UNITS_TEST is 10
    const tooFewSegments = 'Aqua-Blit-Cron';
    const tooManySegments = 'Aqua-Blit-Cron-Deep-Echo-Flux-Grid-Hymn-Icon-Jade-Extra';
    assert.strictEqual(isValid(tooFewSegments), false, 'UUPID with too few segments should be invalid');
    assert.strictEqual(isValid(tooManySegments), false, 'UUPID with too many segments should be invalid');
  });

  it('should return false if any segment is not in the dictionary', () => {
    // Generate a valid UUPID and then modify one segment to be invalid
    const validUUPID = generate();
    const segments = validUUPID.split('-');
    segments[0] = 'InvalidWord'; // Replace first segment with a known invalid one
    const uupidWithInvalidSegment = segments.join('-');
    assert.strictEqual(isValid(uupidWithInvalidSegment), false, 'UUPID with an unknown segment should be invalid');
  });

  it('should return false if any segment has incorrect casing (not in dictionary)', () => {
    const validUUPID = generate();
    const segments = validUUPID.split('-');
    // Assuming 'Aqua' is in dictionary, 'aqua' is not
    const originalFirstSegment = segments[0];
    const manipulatedSegment = originalFirstSegment.toLowerCase(); // Change casing
    
    // Only run this test if the lowercase version is truly NOT in the dictionary
    if (!UUPID_DICTIONARY.includes(manipulatedSegment)) {
      segments[0] = manipulatedSegment;
      const uupidWithIncorrectCasing = segments.join('-');
      assert.strictEqual(isValid(uupidWithIncorrectCasing), false, 'UUPID with incorrect segment casing should be invalid');
    }
  });

  it('should return true for a correctly generated UUPID', () => {
    const uupid = generate();
    assert.strictEqual(isValid(uupid), true, 'A freshly generated UUPID should be valid');
  });

  it('should return true for a manually constructed valid UUPID (if using known dictionary words)', () => {
    // Construct a UUPID using words guaranteed to be in the dictionary
    // This assumes the dictionary used in tests is exactly the one in index.js
    if (UUPID_DICTIONARY.length >= NUM_UNITS) {
      const knownValidSegments = UUPID_DICTIONARY.slice(0, NUM_UNITS);
      const manualValidUUPID = knownValidSegments.join('-');
      assert.strictEqual(isValid(manualValidUUPID), true, 'Manually constructed valid UUPID should be valid');
    }
  });
});