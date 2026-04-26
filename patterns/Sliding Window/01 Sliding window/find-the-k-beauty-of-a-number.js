// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/find-the-k-beauty-of-a-number/
// The k-beauty of an integer num is defined as the number of substrings of num when it is read as a string that meet the following conditions:
// It has a length of k.
// It is a divisor of num.
// Given integers num and k, return the k-beauty of num.
// Note : Leading zeros are allowed. 0 is not a divisor of any value.

/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 */
var divisorSubstrings = function (num, k) {
  // a is a divisor of b if b%a = 0

  let start = 0;
  let numString = String(num);
  let ans = 0;
  for (let end = 0; end < numString.length; end++) {
    // Invariant: window [start, end-1], size = end - start <= k.
    // No running state to maintain — window is defined purely by [start, end]
    // and the divisor check is computed on-demand from the substring.
    // ans = count of size-k windows whose numeric value divides num (0 if none).

    // Shrink: fixed-size window, no expand state — just advance start when
    // window has already reached size k.
    if (end - start === k) {
      start++;
    }

    // Expand: no state to update — the substring is read directly in the record step.

    // Record: window [start, end] has reached size k — extract the substring,
    // convert to number, and check if it divides num.
    if (end - start + 1 === k && isKBeauty(num, numString, start, end)) {
      ans++;
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === numString.length.
  // 2. Every window of size k is visited: when end = i+k-1 for any valid start i,
  //    the window [i, i+k-1] is exactly size k and gets checked for k-beauty.
  return ans;
};

function isKBeauty(num, str, startInd, endInd) {
  const divisor = Number(str.slice(startInd, endInd + 1));
  return divisor !== 0 && num % divisor === 0;
}
