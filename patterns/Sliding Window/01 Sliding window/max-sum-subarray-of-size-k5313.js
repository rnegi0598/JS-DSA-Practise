// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// Given an array of integers arr[]  and a number k. Return the maximum sum of a subarray of size k.

function maxSubarraySum(arr, k) {
  let ans = 0;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    //At the top of each iteration, sum = sum of arr[left..right-1], and ans = max sum of all k-windows seen so far, or 0 if none.
    sum += arr[right];

    if (right - left + 1 == k) {
      ans = Math.max(ans, sum);
      sum -= arr[left];
      left++;
    }
  }
  return ans;
}

console.log("hello");
const arr = [100, 200, 300, 400];
const k = 15;
const ans = maxSubarraySum(arr, k);

console.log(`ans : ${ans}`);
