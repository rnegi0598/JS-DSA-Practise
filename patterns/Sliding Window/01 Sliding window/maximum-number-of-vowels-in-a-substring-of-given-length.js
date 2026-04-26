// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

/**
 Problem Description: Maximum Number of Vowels in a Substring of Given Length
https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/
Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let start = 0;
  let vowelsCount = 0;
  let ans = 0;

  for (let end = 0; end < s.length; end++) {
    // Invariant: window [start, end-1] has size <= k, all elements accounted for.
    // vowelsCount = number of vowels in window [start, end-1].
    // ans = max vowel count across all size-k windows seen so far (0 if none).

    // Shrink: fixed-size window, no distinctness constraint — only need to
    // remove one element when window has already reached size k.
    if (end - start === k) {
      if (isVowel(s[start])) {
        vowelsCount--;
      }
      start++;
    }

    // Expand: include s[end] in the window.
    if (isVowel(s[end])) {
      vowelsCount++;
    }

    // Record: window [start, end] has reached target size k.
    if (end - start + 1 === k) {
      ans = Math.max(ans, vowelsCount);
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === s.length.
  // 2. Every window of size k is visited: when end = i+k-1 for any valid start i,
  //    the window [i, i+k-1] is exactly size k and gets recorded.
  return ans;
};

const vowelSet = new Set("aeiouAEIOU");
function isVowel(ch) {
  return vowelSet.has(ch);
}
