// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

//https://leetcode.com/problems/find-the-power-of-k-size-subarrays-i/description/

// You are given an array of integers nums of length n and a positive integer k.
// The power of an array is defined as:
// Its maximum element if all of its elements are consecutive and sorted in ascending order.
// -1 otherwise.
// You need to find the power of all subarrays of nums of size k.
// Return an integer array results of size n - k + 1, where results[i] is the power of nums[i..(i + k - 1)].


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {

    let start = 0;
    const results = new Array(nums.length - k + 1).fill(-1);


    for (let end = 0; end < nums.length; end++) {
        // Invariant (top of each iteration):
        // 1. Window range: nums[start..end-1], with end - start <= k.
        // 2. Consecutive property: every adjacent pair in nums[start..end-1]
        //    satisfies nums[i] + 1 === nums[i+1]. (Vacuously true if window
        //    has 0 or 1 elements.)
        // 3. results[i] is correctly filled for every starting index i
        //    where the window [i..i+k-1] fits within nums[0..end-1]:
        //    nums[end of window] if consecutive ascending, -1 (prefilled) otherwise.
        //
        // Initialization: end = 0, start = 0, window is empty,
        //   results is all -1. All three clauses hold vacuously.
        //
        // Termination:
        //   Progress: end strictly increases each iteration, bounded by nums.length.
        //   Correctness: on exit end = nums.length, so all n-k+1 windows have been
        //   processed. results[i] is correct for every i in [0..n-k].

        // Shrink: two reasons to advance start —
        //   (a) end - start >= k: window already at max size, make room.
        //   (b) nums[end] breaks the consecutive chain from nums[end-1]:
        //       the entire current window is invalid with nums[end], so
        //       keep advancing start until the window is empty (start = end).
        //       This resets the consecutive run to start fresh from end.
        while (end - start >= k || (end !== 0 && start < end && nums[end - 1] + 1 !== nums[end])) {
            start++
        }

        // After shrink: nums[start..end] is consecutive ascending and size <= k.

        // Record: window is exactly size k and all elements are consecutive
        // ascending, so the max (power) is the rightmost element nums[end].
        if (end - start + 1 === k) {
            results[start] = nums[end]
        }

    }

    return results


};



// const arr = [1, 2, 3, 4, 3, 2, 5]
// const k = 3; 
const arr = [3, 2, 3, 2, 3, 2]
const k = 2;

const result = resultsArray(arr, k)
console.log(result)