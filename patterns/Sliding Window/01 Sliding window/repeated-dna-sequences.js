// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/repeated-dna-sequences/description/
// The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.
// For example, "ACGAATTCCG" is a DNA sequence.
// When studying DNA, it is useful to identify repeated sequences within the DNA.
// Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.


/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {

    const k = 10;
    let start = 0;
    const repeated = new Set()
    const seen = new Set();

    for (let end = 0; end < s.length; end++) {
        // Invariant (top of each iteration):
        // 1. Window range: s[start..end-1], with end - start <= k.
        // 2. seen: contains every k-length substring of s ending before index end
        //    that has been seen exactly once so far.
        // 3. repeated: contains every k-length substring of s ending before index end
        //    that has been seen more than once.
        // Note: no per-character state maintained — substring is extracted
        // fresh at record time via slice, so expand/shrink only move pointers.

        // Shrink: window size would exceed k, advance start to make room.
        if (end - start == k) {
            start++
        }

        // Record
        if (end - start + 1 == k) {
            const substring = s.slice(start, end + 1);


            if (seen.has(substring)) {
                repeated.add(substring)
            } else {
                seen.add(substring)
            }
        }

    }


    return Array.from(repeated);
};