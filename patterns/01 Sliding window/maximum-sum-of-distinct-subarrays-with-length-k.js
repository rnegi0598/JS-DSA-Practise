// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/ , /patterns)

/*
Algorithm 



*/

function maximumSubarraySum(nums, k) {
  let maxSum = 0,
    sum = 0;

  const lastOccMap = new Map();

  let start = 0,
    end = 0;
  lastOccMap.set(nums[end], end);
  sum = nums[end];

  while (end < nums.length) {
    // we get here the window
    if (end - start + 1 == k) {
      if (sum > maxSum) {
        maxSum = sum;
      }

      sum -= nums[start];
      start++;
    }

    end++;

    // we don't have the complete window here
    // check if the new element is already present or not, appending new element will make the window for comparison
    const lastOccIndexOfCurrentNumber = lastOccMap.get(nums[end]);
    const isCurrentElementDuplicate =
      lastOccIndexOfCurrentNumber !== undefined &&
      lastOccIndexOfCurrentNumber >= start
        ? true
        : false;

    // for duplicate we can reposition the start here
    if (
      isCurrentElementDuplicate &&
      lastOccIndexOfCurrentNumber !== undefined
    ) {
      // reposition the start
      const newStartInd = lastOccIndexOfCurrentNumber + 1;
      // sum recalculate
      for (let i = start; i < newStartInd; i++) {
        sum -= nums[i];
      }

      start = newStartInd;
    }

    sum += nums[end];

    // console.log(
    //   `map : ${JSON.stringify(Array.from(lastOccMap.entries()))} , window: ${nums.slice(start, end + 1)} , sum :${sum} `,
    // );

    // window size reached

    // updat the last occ
    lastOccMap.set(nums[end], end);
  }

  return maxSum;
}

// const nums = [9, 9, 9, 9, 9, 9, 9];
// const nums = [1, 5, 4, 2, 9, 2, 9, 10, 1, 3, 5, 3, 1, 9];
// const nums = [9, 9, 9, 1, 2, 3];
const nums = [1, 1, 1, 1, 1, 1];
const k = 2;

console.log(nums.toString());
const ans = maximumSubarraySum(nums, k);
console.log(ans);

// learning
/**
 * also consider the smallest possible case
 * how to handle 0 , undefined and other falsy values .
 * pseudo code
 */
