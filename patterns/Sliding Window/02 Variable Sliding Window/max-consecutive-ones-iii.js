// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// 10 : https://leetcode.com/problems/max-consecutive-ones-iii/description/
// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {


    let start = 0;
    let zeroCount = 0;
    let maxConsecutiveOnes = 0;

    for (let end = 0; end < nums.length; end++) {
        // Invariant : window [start, end-1]
        // zeroCount = number of zeroes in window  
        // zeroCount <= k
        // maxConsecutiveOnes = maximum length of subarray of consecutive 1s with atmost k from the windows seen so far 
        // valid window : contains 0s <= k 


        // Expand : add the end element to the window
        if (nums[end] === 0) {
            zeroCount++;
        }

        /// Shrink till the number of zeroes in side the window <= k 
        while (zeroCount > k) {
            if (nums[start] == 0)
                zeroCount--

            start++;
        }

        // We have window with 0s <= k along with 1s 

        // Record
        maxConsecutiveOnes = Math.max(maxConsecutiveOnes, end - start + 1)

    }

    return maxConsecutiveOnes;

};


// test 

const nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1];
const k = 3
console.log(longestOnes(nums, k))