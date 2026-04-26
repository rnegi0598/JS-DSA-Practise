// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)
// https://leetcode.com/problems/minimum-size-subarray-sum/description/

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.


/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {

    let start = 0;
    let sum = 0;
    let min = Number.POSITIVE_INFINITY;

    for (let end = 0; end < nums.length; end++) {

        // Invariant: window [start, end-1] has sum < target (i.e. invalid — no valid shorter window ends before end).
        // sum = sum of nums[start..end-1]. min = smallest valid window length seen so far.

        // Expand: add nums[end] to the window. This may make sum >= target (valid).
        sum += nums[end];

        // Shrink + Record (shortest variant: record inside the shrink loop)
        // While window [start, end] is valid (sum >= target), it's a candidate.
        // Record its length, then shrink from the left to look for an even shorter valid window.
        while (sum >= target) {
            min = Math.min(min, end - start + 1);
            sum -= nums[start];
            start++;
        }
        // After the while: window [start, end] has sum < target again — invariant restored.
    }

    // Termination: end reaches nums.length. Every valid window was considered
    // because: for any valid subarray [i, j] with sum >= target, when end = j,
    // start <= i (start only advances past positions whose windows were already recorded).
    // So [start, j] had sum >= target, and we recorded all shrink steps including length j - i + 1.
    return min === Number.POSITIVE_INFINITY ? 0 : min;

};



// test
const nums = [2, 3, 1, 2, 4, 3];
const target = 4;
console.log(minSubArrayLen(target, nums))