// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// 11: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/

// Given a binary array nums, you should delete one element from it.

// Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {

    let start = 0;
    let zeroCount = 0;
    let maxConsOnes = 0;


    for (let end = 0; end < nums.length; end++) {
        // Invariant : window : [start,end -1]
        // zeroCount : number of zero inside the window 
        // valid window : zeroCount <=1

        // Expand : add end element to the window
        if (nums[end] == 0) {
            zeroCount++;
        }

        // Shrink : when window becomes invalid ie zero count becomes > 1
        while (zeroCount > 1) {
            if (nums[start] === 0) {
                zeroCount--
            }
            start++
        }

        // Record : window becomes valid 
        maxConsOnes = Math.max(maxConsOnes, end - start + 1)
    }

    return zeroCount == 0 ? nums.length - 1 : maxConsOnes - 1

};


// test
const nums = [0, 1, 1, 1, 0, 1, 1, 0, 1]
console.log(longestSubarray(nums))