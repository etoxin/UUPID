/**
 * @file index.js
 * @description A sample implementation of the UUPID (Universally Unique Pronounceable Identifier) standard.
 * This module provides functions to generate and validate UUPIDs based on a small,
 * pronounceable dictionary and cryptographically secure random number generation.
 */

const crypto = require('crypto');

/**
 * @constant {Array<string>} UUPID_DICTIONARY - A small sample dictionary of pronounceable units.
 * In a full implementation, this would be a much larger, carefully curated list
 * of 2, 3, and 4-letter sound combinations.
 * The casing is preserved as it appears in this dictionary.
 */
const UUPID_DICTIONARY = [
  "Aqua", "Blit", "Cron", "Deep", "Echo", "Flux", "Grid", "Hymn",
  "Icon", "Jade", "Kite", "Luna", "Myst", "Nova", "Omen", "Pure",
  "Quas", "Rune", "Shor", "Tron", "Unic", "Vort", "Wave", "Xyle",
  "Yarn", "Zest", "Glim", "Fush", "Koda", "Lyra", "Nomi", "Poin",
  "Aura", "View", "Star", "Path", "Trek", "Find", "More", "Zone",
  "Link", "Crea", "Rela", "Cyan", "Blue", "Gold", "Riva", "Swif",
  "Tide", "Blom", "Eria", "Sent", "Sync", "Data", "Core", "Arch",
  "Base", "Meta", "Omni", "Port", "Code", "Nexa", "Prim", "Quest"
];

/**
 * @constant {number} DICTIONARY_SIZE - The number of entries in the UUPID_DICTIONARY.
 */
const DICTIONARY_SIZE = UUPID_DICTIONARY.length; // Currently 64

/**
 * @constant {number} BITS_PER_UNIT_SIMULATED - The number of bits of entropy
 * simulated to be consumed per unit selection, as per the UUPID spec.
 * The spec aims for 13 or 14 bits/unit (8192-16384 entries).
 * For this sample, we generate enough random bits for 13 bits,
 * then take modulo DICTIONARY_SIZE to map to our small dictionary.
 */
const BITS_PER_UNIT_SIMULATED = 13; // Simulates selection from an 8192-entry dictionary

/**
 * @constant {number} NUM_UNITS - The number of pronounceable units in a generated UUPID.
 * The UUPID spec targets 9-10 units for ~126 bits of entropy.
 * Here, 10 units * 13 bits/unit = 130 bits total entropy.
 */
const NUM_UNITS = 10;

/**
 * Generates a Universally Unique Pronounceable Identifier (UUPID).
 * This function uses a cryptographically secure random number generator (CSPRNG)
 * to select units from the defined dictionary, then formats them into a
 * hyphen-separated string.
 *
 * @returns {string} A new UUPID string (e.g., "Aqua-Blit-Cron-Deep-Echo-Flux-Grid-Hymn-Icon-Jade").
 */
function generate(): string {
  const uupidSegments = [];
  // Calculate total bits needed for NUM_UNITS at BITS_PER_UNIT_SIMULATED.
  const totalBitsNeeded = NUM_UNITS * BITS_PER_UNIT_SIMULATED;
  // Calculate total bytes needed. Round up to ensure enough random data.
  const totalBytesNeeded = Math.ceil(totalBitsNeeded / 8);

  // Generate cryptographically secure random bytes.
  // Using Buffer for efficient bit manipulation.
  const randomBytes = crypto.randomBytes(totalBytesNeeded);

  let bitBuffer = 0;   // Stores extracted bits that haven't been used yet.
  let bitsInBuffer = 0; // Number of valid bits currently in bitBuffer.
  let byteIndex = 0;   // Current index in randomBytes buffer.

  for (let i = 0; i < NUM_UNITS; i++) {
    // Ensure we have enough bits in the buffer for the next unit.
    while (bitsInBuffer < BITS_PER_UNIT_SIMULATED) {
      if (byteIndex >= randomBytes.length) {
        // This case should ideally not happen if totalBytesNeeded is calculated correctly,
        // but it's a safeguard against insufficient random data.
        throw new Error("Insufficient random bytes for UUPID generation.");
      }
      // Add the next byte to the bitBuffer.
      // Shift existing bits left and OR in the new byte.
      bitBuffer = (bitBuffer << 8) | randomBytes[byteIndex];
      bitsInBuffer += 8;
      byteIndex++;
    }

    // Extract BITS_PER_UNIT_SIMULATED from the MSB of bitBuffer.
    // Use a mask to get only the desired number of bits.
    const mask = (1 << BITS_PER_UNIT_SIMULATED) - 1;
    const rawIndex = (bitBuffer >> (bitsInBuffer - BITS_PER_UNIT_SIMULATED)) & mask;

    // Map the raw index (from the simulated larger dictionary range)
    // to an index within our actual small dictionary.
    // Note: This modulo operation introduces a slight bias if (2^BITS_PER_UNIT_SIMULATED % DICTIONARY_SIZE) != 0.
    // For a production-grade UUPID, a bias-free algorithm would re-roll if rawIndex is out of range,
    // or the dictionary size would be a power of 2 aligned with the bit count.
    const dictionaryIndex = rawIndex % DICTIONARY_SIZE;

    // Remove the used bits from the bitBuffer.
    bitsInBuffer -= BITS_PER_UNIT_SIMULATED;
    // Clear the consumed bits from the MSB of bitBuffer.
    // The remaining bits are at the LSB, ready for the next iteration.
    bitBuffer &= ((1 << bitsInBuffer) - 1);

    uupidSegments.push(UUPID_DICTIONARY[dictionaryIndex]);
  }

  return uupidSegments.join('-');
}

/**
 * Validates if a given string is a correctly formatted UUPID according to this sample's rules.
 * This checks:
 * 1. Correct number of hyphen-separated segments.
 * 2. Each segment exists in the UUPID_DICTIONARY with its exact casing.
 *
 * @param {string} uupidString - The string to validate.
 * @returns {boolean} True if the string is a valid UUPID, false otherwise.
 */
function isValid(uupidString: string): boolean {
  if (typeof uupidString !== 'string') return false;

  const segments = uupidString.split('-');

  // Check if the number of segments matches.
  if (segments.length !== NUM_UNITS) return false;

  // Check if each segment is present in the dictionary with correct casing.
  for (const segment of segments) {
    if (!UUPID_DICTIONARY.includes(segment)) return false;
  }

  return true;
}

// Export the functions for use as an NPM module.
module.exports = {
  generate,
  isValid
};