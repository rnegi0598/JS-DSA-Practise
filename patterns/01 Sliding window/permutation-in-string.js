// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/permutation-in-string/
// Given two strings s1 and s2, return true if s2 contains permutation of s1, or false otherwise.
// s1 and s2 consist of lowercase English letters.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let start = 0;
  const s1CharCount = new Array(26).fill(0);
  const windowCharCount = new Array(26).fill(0);

  // update the s1 char count array
  for (let i = 0; i < s1.length; i++) {
    s1CharCount[charIndex(s1[i])]++;
  }

  for (let end = 0; end < s2.length; end++) {
    // Invariant: window [start, end-1], size = end - start <= s1.length.
    // windowCharCount = frequency of each character in the window.
    // No match has been found in any size-s1.length window seen so far.

    // Shrink: fixed-size window — remove one element when window has
    // already reached size s1.length.
    if (end - start === s1.length) {
      windowCharCount[charIndex(s2[start])]--;
      start++;
    }

    // Expand: include s2[end] in the window.
    windowCharCount[charIndex(s2[end])]++;

    // Record: window [start, end] has reached target size — check if its
    // character frequencies match s1 (i.e. window is a permutation of s1).
    if (end - start + 1 === s1.length) {
      if (areArraysEqual(windowCharCount, s1CharCount)) {
        return true;
      }
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === s2.length.
  // 2. Every window of size s1.length is visited and checked against s1's frequencies.
  //    If none matched, no permutation of s1 exists in s2.
  return false;
};

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function charIndex(ch) {
  return ch.charCodeAt(0) - 97;
}
