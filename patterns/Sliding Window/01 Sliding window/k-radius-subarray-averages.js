// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/k-radius-subarray-averages/
// You are given a 0-indexed array nums of n integers, and an integer k.
// The k-radius average for a subarray of nums centered at some index i with the radius k is the average of all elements in nums between the indices i - k and i + k (inclusive). If there are less than k elements before or after the index i, then the k-radius average is -1.
// Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.
// The average of x elements is the sum of the x elements divided by x, using integer division. The integer division truncates toward zero, which means losing its fractional part.
// For example, the average of four elements 2, 3, 1, and 5 is (2 + 3 + 1 + 5) / 4 = 11 / 4 = 2.75, which truncates to 2.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, r) {

    const k = 2 * r + 1;  // window size ; 
    let start = 0;
    const KRadiusAvg = new Array(nums.length).fill(-1)
    let sum = 0;

    for (let end = 0; end < nums.length; end++) {
        // Invariant (top of each iteration):
        // 1. Window range: nums[start..end-1], with end - start <= k.
        // 2. sum: equals the sum of nums[start..end-1].
        // 3. KRadiusAvg[i] = floor(avg of nums[i-r..i+r]) for every center i
        //    whose full window falls within nums[0..end-1], and -1 otherwise.
        //
        // Initialization: end = 0, start = 0, window is empty,
        //   sum = 0, KRadiusAvg is all -1. All three clauses hold vacuously.
        //
        // Termination: loop exits when end = nums.length.
        //   Invariant gives: KRadiusAvg[i] is filled for every center i
        //   whose full window [i-r..i+r] fits in [0..nums.length-1], -1 otherwise.
        //   Progress: end strictly increases each iteration, bounded by nums.length.

        // Shrink: window would exceed size k after expanding, so remove nums[start].
        if (end - start == k) {
            sum -= nums[start]
            start++;
        }

        // Expand: include nums[end] in the window.
        sum += nums[end]

        // Record: window is exactly size k, compute average at the center index.
        if (end - start + 1 == k) {
            const center = (end + start) / 2
            const avg = Math.floor(sum / k)
            KRadiusAvg[center] = avg
        }
    }

    return KRadiusAvg



};


getAverages([1, 2, 3], 2)