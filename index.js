// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

/**
 * 
2461. Maximum Sum of Distinct Subarrays With Length K
Solved
Medium
Topics
premium lock iconCompanies
Hint

You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

    The length of the subarray is k, and
    All the elements of the subarray are distinct.

Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions

Example 2:

Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.

 

Constraints:

    1 <= k <= nums.length <= 105
    1 <= nums[i] <= 105


 */

function maximumSubarraySum(nums, k) {
  let maxSum = 0;
  let sum = 0;
  let start = 0;
  let end = -1;
  const lastOccMap = new Map();

  while (end < nums.length - 1) {
    // increase the end side of the window
    end++;
    sum += nums[end];
    // now check if the window will contain duplicate if we include this end num

    const lastIndex = lastOccMap.get(nums[end]);
    const duplicateNumInd =
      lastIndex == undefined || lastIndex < start ? -1 : lastIndex;

    if (duplicateNumInd !== -1) {
      // there is duplicate
      // reposition the start
      for (let i = start; i <= duplicateNumInd; i++) {
        sum -= nums[i];
      }
      start = duplicateNumInd + 1;
    } else {
      // no dupliate
      if (end - start + 1 == k) {
        // window size met
        maxSum = Math.max(maxSum, sum);
        sum -= nums[start];
        start++;
      }
    }
    lastOccMap.set(nums[end], end);
  }

  return maxSum;
}

// const nums = [9, 9, 9, 9, 9, 9, 9];
// const nums = [1, 5, 4, 2, 9, 2, 9, 10, 1, 3, 5, 3, 1, 9];
const nums = [9, 9, 9, 1, 2, 3];
// const nums = [1, 1, 1, 1, 1, 1];
const k = 2;

console.log(nums.toString());
const ans = maximumSubarraySum(nums, k);
console.log(ans);
