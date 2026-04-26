// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/sliding-window-maximum/
// Problem: Given array nums and window size k, return array of maximum elements in each sliding window

/**
 * Sliding Window Maximum using Monotonic Deque
 * Time Complexity: O(n) - each element enters and leaves deque at most once
 * Space Complexity: O(k) - deque stores at most k elements
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let start = 0;
    const ans = [];
    const dequeue = []; // Monotonic deque storing indices

    /*
     * LOOP INVARIANT (Three-Part Correctness Argument):
     *
     * At the top of iteration 'end':
     * 1. Window state: Current window is nums[start..end-1] with size <= k
     * 2. Deque property: dequeue contains indices from current window in decreasing order of values
     *    - dequeue[0] has index of maximum element in current window
     *    - dequeue is monotonic: nums[dequeue[i]] >= nums[dequeue[i+1]] for all valid i
     *    - all indices in dequeue are >= start (within current window bounds)
     * 3. Result state: ans contains maximum of all previous size-k windows
     */

    for (let end = 0; end < nums.length; end++) {

        /* MAINTENANCE - Part 1: Shrink window if it exceeds size k */
        if (end - start == k) {
            // Window [start, end-1] has size k, need to shrink by moving start
            // Remove start index from deque front if it's the maximum we're about to lose
            if (dequeue.length > 0 && dequeue[0] == start) {
                dequeue.shift(); // Remove the outgoing maximum
            }
            start++; // Shrink window from left
            // Invariant maintained: window is now [start, end-1] with size < k
        }

        /* MAINTENANCE - Part 2: Maintain monotonic decreasing property */
        // Remove all elements from deque rear that are <= nums[end]
        // This maintains the property that deque[0] is always the maximum
        while (dequeue.length > 0 && nums[dequeue[dequeue.length - 1]] <= nums[end]) {
            dequeue.pop(); // Remove smaller elements that can never be maximum
        }

        // Add current index to deque rear
        dequeue.push(end);
        // Invariant maintained: deque is monotonic decreasing

        /* RECORD: When window reaches size k, record the maximum */
        if (end - start + 1 == k) {
            // Window [start, end] has exactly size k
            // dequeue[0] contains index of maximum element in this window
            ans.push(nums[dequeue[0]]);
        }

        // Invariant maintained for next iteration:
        // - Window will be [start, end] with size <= k
        // - dequeue maintains monotonic property for current window
    }

    /*
     * TERMINATION:
     * 1. Progress: 'end' increases by 1 each iteration, loop terminates when end = nums.length
     * 2. Correctness: For every valid k-sized window [i, i+k-1], when end = i+k-1:
     *    - The window has exactly size k
     *    - dequeue[0] contains the index of maximum element in that window
     *    - This maximum gets added to ans
     *    Therefore, ans contains maximum of all k-sized windows in order
     */

    return ans;
};


/*
 * INITIALIZATION PROOF:
 * - start = 0, end will start at 0, so initial window nums[0..-1] is empty
 * - dequeue = [] (empty), which vacuously satisfies monotonic property
 * - ans = [] (empty), which is correct as no k-sized windows processed yet
 * - All clauses of invariant hold trivially for empty window
 */

// Test Cases
console.log("=== Sliding Window Maximum Tests ===\n");

// Test 1: Standard case from LeetCode
const nums1 = [1, 3, -1, -3, 5, 3, 6, 7];
const k1 = 3;
const result1 = maxSlidingWindow(nums1, k1);
console.log(`Input: nums = [${nums1}], k = ${k1}`);
console.log(`Output: [${result1}]`);
console.log(`Expected: [3, 3, 5, 5, 6, 7]`);
console.log(`Match: ${JSON.stringify(result1) === JSON.stringify([3, 3, 5, 5, 6, 7])}\n`);

// Test 2: Single element
const nums2 = [1];
const k2 = 1;
const result2 = maxSlidingWindow(nums2, k2);
console.log(`Input: nums = [${nums2}], k = ${k2}`);
console.log(`Output: [${result2}]`);
console.log(`Expected: [1]`);
console.log(`Match: ${JSON.stringify(result2) === JSON.stringify([1])}\n`);

// Test 3: Decreasing sequence
const nums3 = [7, 6, 5, 4, 3, 2, 1];
const k3 = 3;
const result3 = maxSlidingWindow(nums3, k3);
console.log(`Input: nums = [${nums3}], k = ${k3}`);
console.log(`Output: [${result3}]`);
console.log(`Expected: [7, 6, 5, 4, 3]`);
console.log(`Match: ${JSON.stringify(result3) === JSON.stringify([7, 6, 5, 4, 3])}\n`);

// Test 4: All elements same
const nums4 = [4, 4, 4, 4];
const k4 = 2;
const result4 = maxSlidingWindow(nums4, k4);
console.log(`Input: nums = [${nums4}], k = ${k4}`);
console.log(`Output: [${result4}]`);
console.log(`Expected: [4, 4, 4]`);
console.log(`Match: ${JSON.stringify(result4) === JSON.stringify([4, 4, 4])}\n`);