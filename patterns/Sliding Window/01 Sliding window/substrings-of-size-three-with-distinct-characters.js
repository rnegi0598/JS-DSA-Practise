// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

/*
Question description  
https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/description/
A string is good if there are no repeated characters.
Given a string s​​​​​, return the number of good substrings of length three in s​​​​​​.
Note that if there are multiple occurrences of the same substring, every occurrence should be counted
*/

/**
 * @param {string} s
 * @return {number}
 */
var countGoodSubstrings = function (s) {
  // window size k = 3
  let start = 0;
  let count = 0;
  const set = new Set();

  for (let end = 0; end < s.length; end++) {
    // Invariant : window [start, end-1] . All the elements inside the window will be unique. window size will be  <= k = 3 . and we will have count of the process windows which were valid till now .

    // Shrink : for inserting end element into the window we should make the window ready for it to be inserted . This will happen only if there are no duplicates in the window and size of the new window <= k .
    // current window size = end - start

    while (set.has(s[end]) || end - start >= 3) {
      set.delete(s[start]);
      start++;
    }

    // Expand
    set.add(s[end]);
    if (end - start + 1 == 3) {
      count++;
    }
  }

  // Termination :
  // Loop will end as end will reach a point where it's value becomes to the string length .
  // when the end becomes = s.length -1 ie last character then it would have processed all the possible windows .
  return count;
};
