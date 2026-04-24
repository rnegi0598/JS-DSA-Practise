// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

/**
 There is a circle of red and blue tiles. You are given an array of integers colors and an integer k. The color of tile i is represented by colors[i]:

    colors[i] == 0 means that tile i is red.
    colors[i] == 1 means that tile i is blue.

An alternating group is every k contiguous tiles in the circle with alternating colors (each tile in the group except the first and last one has a different color from its left and right tiles).

Return the number of alternating groups.

Note that since colors represents a circle, the first and the last tiles are considered to be next to each other.
 *  */

/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  const n = colors.length;
  let ans = 0;
  let start = 0;

  let lastEndIndex = n + k - 1;

  for (let end = 0; end < lastEndIndex; end++) {
    // Invariant : window [start,end-1] , size : end-start
    // window will have alternate elements and size <=k

    // Shrink
    // Case 1 : when window size is > 0 and it does not become alternate on adding of the end element
    if (end - start > 0 && colors[(end - 1) % n] == colors[end % n]) {
      start = end;
    }

    // Case 2: when window size is k
    if (end - start == k) {
      start++;
    }

    // Expand

    // Record
    if (end - start + 1 == k) {
      // we have the window with alternative elements
      ans++;
    }
  }

  return ans;
};

const arr = [0, 0, 1];
const k = 3;
const ans = numberOfAlternatingGroups(arr, k);
console.log(ans);
