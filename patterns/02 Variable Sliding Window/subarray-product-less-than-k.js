// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// https://leetcode.com/problems/subarray-product-less-than-k/

// Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {

    // Edge case: all elements are >= 1, so no subarray can have product < 1 (or < 0).
    if (k <= 1) return 0;

    let start = 0;
    let validSubarrayCount = 0;
    let windowProduct = 1;

    for (let end = 0; end < nums.length; end++) {
        // Invariant: window [start, end-1] has windowProduct < k.
        // windowProduct = product of nums[start..end-1].
        // validSubarrayCount = total number of valid subarrays (product < k) ending before end.

        // Expand: include nums[end]. windowProduct may become >= k (invalid).
        windowProduct *= nums[end];

        // Shrink: restore validity by removing from start until windowProduct < k.
        while (start <= end && windowProduct >= k) {
            windowProduct /= nums[start];
            start++;
        }

        // Record (count variant): window [start, end] is the largest valid window ending at end.
        // Every subarray ending at end with start index in [start, end] also has product < k.
        // That's end - start + 1 new valid subarrays: [start,end], [start+1,end], ..., [end,end].
        validSubarrayCount += end - start + 1;

        // Invariant restored: window [start, end] has windowProduct < k.
    }

    // Termination: end reaches nums.length. For every valid subarray [i, j] with product < k,
    // when end = j, start <= i (start only advances past positions that made product >= k).
    // So the subarray [i, j] was counted as one of the end - start + 1 subarrays at iteration j.
    return validSubarrayCount;

};


// test
const nums = [10, 5, 2, 6]
const k = 100;

// const nums = [10, 5, 2, 6]
// const k = 0;

console.log(numSubarrayProductLessThanK(nums, k))