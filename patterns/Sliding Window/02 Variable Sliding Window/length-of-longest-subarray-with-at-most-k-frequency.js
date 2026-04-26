// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {


    let start = 0;
    let longestGood = 0;
    const freq = new Map();

    for (let end = 0; end < nums.length; end++) {
        // Invariant: window [start,end-1]
        // freq contains the fre of each element of the window 
        // freq of each element of the winow is <= k

        // Expand : add the end element to the window 
        freq.set(nums[end], (freq.get(nums[end]) ?? 0) + 1);


        // Shrink so that the window remains good . And the only way it would become not good is by adding end element . 
        while (freq.get(nums[end]) > k) {

            freq.set(nums[start], freq.get(nums[start]) - 1);

            if (freq.get(nums[start]) === 0) {
                freq.delete(nums[start])
            }

            start++;
        }

        // after this window becomes good  ie all elements in the window have frequency <= k 

        // Record the longest good 
        longestGood = Math.max(longestGood, end - start + 1)

    }

    return longestGood;
};



// test
const nums = [1, 2, 3, 1, 2, 3, 1, 2];
const k = 3

console.log(maxSubarrayLength(nums, k))