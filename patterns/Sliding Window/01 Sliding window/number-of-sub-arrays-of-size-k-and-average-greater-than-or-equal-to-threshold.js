// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
// Given an array of integers arr and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
  const sumThreshold = threshold * k;
  let ans = 0;
  let start = 0;
  let sum = 0;
  for (let end = 0; end < arr.length; end++) {
    // Invariant: window [start, end-1], sum = arr[start] + ... + arr[end-1], size <= k.
    // ans = count of size-k windows with sum >= sumThreshold seen so far.

    // Shrink: fixed-size window, no distinctness — remove one element when
    // window has already reached size k. Current window size = end - start.
    if (end - start === k) {
      sum -= arr[start];
      start++;
    }

    // Expand: include arr[end] in the window.
    sum += arr[end];

    // Record: window [start, end] has reached size k and meets the threshold.
    if (end - start + 1 === k && sum >= sumThreshold) {
      ans++;
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === arr.length.
  // 2. Every window of size k is visited: when end = i+k-1 for any valid start i,
  //    the window [i, i+k-1] is exactly size k and gets checked against the threshold.
  return ans;
};
