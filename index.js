// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/

/**
You are given a 0-indexed string blocks of length n, where blocks[i] is either 'W' or 'B', representing the color of the ith block. The characters 'W' and 'B' denote the colors white and black, respectively.

You are also given an integer k, which is the desired number of consecutive black blocks.

In one operation, you can recolor a white block such that it becomes a black block.

Return the minimum number of operations needed such that there is at least one occurrence of k consecutive black blocks. 
*/

/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  let start = 0;
  let ans = Infinity;
  let whiteCount = 0;

  for (let end = 0; end < blocks.length; end++) {
    // Invariant: window [start, end-1], size = end - start <= k.
    // whiteCount = number of 'W's in the window.
    // ans = min whiteCount across all size-k windows seen so far (Infinity if none).

    // Shrink: fixed-size window, no distinctness — remove one element when
    // window has already reached size k.
    if (end - start === k) {
      if (blocks[start] === "W") {
        whiteCount--;
      }
      start++;
    }

    // Expand: include blocks[end] in the window.
    if (blocks[end] === "W") {
      whiteCount++;
    }

    // Record: window [start, end] has reached size k — check if this window
    // needs fewer recolors than the best seen so far.
    if (end - start + 1 === k) {
      ans = Math.min(ans, whiteCount);
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === blocks.length.
  // 2. Every window of size k is visited: when end = i+k-1 for any valid start i,
  //    the window [i, i+k-1] is exactly size k and gets checked.
  return ans;
};
