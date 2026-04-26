// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// My attempt

/***
You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:
- The length of the subarray is k, and
- All the elements of the subarray are distinct.
Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.
A subarray is a contiguous non-empty sequence of elements within an array.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
  let ans = 0;
  let sum = 0;
  let left = 0;
  const set = new Set();

  for (let right = 0; right < nums.length; right++) {
    // Invariant : Window [left,right-1] will have distinct elements . window size <=k . sum will be sum of all the elements of the window . ans is the maxsum of the windows processed so far.

    // shrink : For adding new right element we have to make the window ready for it to insert . And for that we have to eliminate the duplicate if they exist or shrink the window size so that we have size < k . size of window [left,right-1] = right - left
    while (set.has(nums[right]) || right - left >= k) {
      sum -= nums[left];
      set.delete(nums[left]);
      left++;
    }

    // Expand
    // now right element can be safely inserted
    // on reaching here we can either have size < k or equal to k afer including the new right element
    sum += nums[right];
    set.add(nums[right]);

    // Record
    if (right - left + 1 == k) {
      ans = Math.max(ans, sum);
    }
  }

  // termination :
  // the loop wll terminate as right will at some point reach the condition right < nums.length
  // and for last right = nums.length -1 we should have processed all of the window
  return ans;
};
