// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/count-subarrays-with-score-less-than-k/description/


// The score of an array is defined as the product of its sum and its length.

// For example, the score of [1, 2, 3, 4, 5] is (1 + 2 + 3 + 4 + 5) * 5 = 75.
// Given a positive integer array nums and an integer k, return the number of non-empty subarrays of nums whose score is strictly less than k.

// A subarray is a contiguous sequence of elements within an array.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {


    let start = 0;
    let windowSum = 0;
    let subarrayCount = 0;


    for (let end = 0; end < nums.length; end++) {
        // Invariant : window [start , end -1] 
        // windowSum = nums[start] + .. nums[end-1]
        // score of this window  may be valid
        // subarrayCount = number of valid subarrays with score < k 


        // Expand  : add end element to the window which might make the score >= k
        windowSum += nums[end];

        // window [start,end]
        // Shrink :  so that the score ramins < k
        while (start <= end && windowSum * (end - start + 1) >= k) {
            windowSum -= nums[start]
            start++;
        }

        // here we have the valid window with score < k
        // if score of the window < k then score of the all the subarrays of it will also be  < k
        // subarrays of this window that end with end is the window size: [end] [ end-1, end] .... [start,end] 
        const windowSize = end - start + 1;
        subarrayCount += windowSize;
    }
    return subarrayCount
};




// test
const nums = [2, 1, 4, 3, 5]
const k = 10;

// const nums = [9, 5, 3, 8, 4, 7, 2, 7, 4, 5, 4, 9, 1, 4, 8, 10, 8, 10, 4, 7]
// const k = 4;


console.log(countSubarrays(nums, k))