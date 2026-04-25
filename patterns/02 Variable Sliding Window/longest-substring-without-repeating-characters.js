// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/


// Given a string s, find the length of the longest substring without duplicate characters.


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {

    let start = 0;
    const windowChars = new Set();
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        // Invariant: window [start, end-1] contains all unique characters.
        // windowChars = characters in s[start..end-1]. ans = max valid window length seen so far.

        // Shrink (before expand): Set can't represent duplicates after insertion,
        // so we remove the conflict first — shrink until s[end] is no longer in the window.
        while (windowChars.has(s[end])) {
            windowChars.delete(s[start]);
            start++;
        }

        // Expand: s[end] is guaranteed not in the windowChars, safe to add.
        windowChars.add(s[end]);

        // Record (longest variant): window [start, end] is the longest valid window ending at end.
        maxLength = Math.max(maxLength, end - start + 1);
    }

    // Termination: end reaches s.length. For any unique-character substring [i, j],
    // when end = j, start <= i (start only advances to remove a duplicate of s[end],
    // never past a valid start). So [start, j] is at least as long — the max is captured.
    return maxLength;


};




// test

const s = "bbbbb"
console.log(lengthOfLongestSubstring(s))