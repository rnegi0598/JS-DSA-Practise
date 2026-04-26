/**
 * 2461. Maximum Sum of Distinct Subarrays With Length K
 *
 * REFERENCE IMPLEMENTATION (for learning).
 *
 * The point of this file is not "the answer" — it's the SHAPE of a sliding
 * window solution. Compare it to your own attempt and notice the structure,
 * not just the logic.
 *
 * The canonical sliding-window template:
 *
 *     for each right in [0, n):
 *         1. EXPAND  -> include nums[right] in the window state
 *         2. SHRINK  -> while window is invalid: remove nums[left], left++
 *         3. RECORD  -> if window matches the target shape, update answer
 *
 * Three small phases. Each one does exactly one job. The "is the window
 * valid?" question lives in ONE place (the shrink loop), so you never have
 * to reason about hidden invariants the way the original code forced you to.
 */

function maximumSubarraySum(nums, k) {
  let maxSum = 0;
  let windowSum = 0;
  let left = 0;

  // Tracks values currently inside the window. We only ever ask one
  // question of it: "is nums[right] already in the window?" — so a Set
  // (membership) is a better fit than a Map of indices.
  const inWindow = new Set();

  for (let right = 0; right < nums.length; right++) {
    // ---- 1. EXPAND ----------------------------------------------------
    // Tentatively bring nums[right] into the window. The window is now
    // possibly invalid (duplicate, or too large) — the next phase fixes it.
    //
    // Notice: we do NOT add to the Set yet. If nums[right] is already in
    // the Set, that IS the duplicate signal; we shrink first, then add.

    // ---- 2. SHRINK ----------------------------------------------------
    // Two reasons the window can be invalid:
    //   (a) nums[right] is already inside  -> shrink until it's gone
    //   (b) window length would exceed k   -> shrink by exactly one
    // Both are handled by the same `while` because the rule is the same:
    // "while the window can't legally accept nums[right], drop the left."
    while (inWindow.has(nums[right]) || right - left + 1 > k) {
      inWindow.delete(nums[left]);
      windowSum -= nums[left];
      left++;
    }

    // Now it's safe to actually include nums[right].
    inWindow.add(nums[right]);
    windowSum += nums[right];

    // ---- 3. RECORD ----------------------------------------------------
    // Window is guaranteed valid (all distinct, length <= k). Only count
    // it when it has reached the target length.
    if (right - left + 1 === k) {
      if (windowSum > maxSum) maxSum = windowSum;
    }
  }

  return maxSum;
}

/* -------------------------------------------------------------------------
 * WHY THIS IS BETTER THAN THE ORIGINAL — read this once, then re-read the
 * code above and see if you can map each point to a line.
 *
 *  1. ONE place asks "is the window valid?"  -> the `while` condition.
 *     In the original, that question was split between the duplicate
 *     branch and the size branch, and correctness depended on a hidden
 *     invariant ("size after repositioning is always <= k-1"). Here the
 *     invariant is enforced visibly, so you don't need to prove anything.
 *
 *  2. NO inner for-loop to "jump" the start pointer. We shrink one step
 *     at a time. Total work is still O(n) amortized — every index is
 *     added once and removed once, period. Easy to see, easy to defend.
 *
 *  3. Data structure matches the question. We only need membership, so
 *     we use a Set. Storing indices in a Map and then doing
 *     `lastIndex < start` arithmetic was simulating membership the long
 *     way around.
 *
 *  4. The loop variable is just `right` going 0..n-1. No `end = -1`
 *     priming, no `while (end < nums.length - 1) { end++; ... }`. Less
 *     state, fewer off-by-ones.
 *
 *  5. Record step is unconditional — it doesn't hide inside an `else`.
 *     If a future variant of the problem changes the "what to record"
 *     rule, you change one block, not two.
 *
 * -------------------------------------------------------------------------
 * MENTAL MODEL TO INTERNALIZE
 *
 *   "Expand right. Shrink left while invalid. Record if shape matches."
 *
 * Almost every variable-size sliding-window problem on LeetCode
 * (longest substring without repeating, min window substring, longest
 * subarray with at-most-k distinct, fruit-into-baskets, etc.) collapses
 * into this same three-line skeleton. The ONLY things that change between
 * problems are:
 *   - what state you maintain (sum, counts, set, max/min of window, ...)
 *   - what "invalid" means       (duplicate? too long? too many distinct?)
 *   - what "record" means        (max sum? longest length? count windows?)
 *
 * Once you see that, you stop solving each problem from scratch — you
 * just fill in the three blanks.
 * ------------------------------------------------------------------------- */

// quick sanity checks
console.log(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)); // 15
console.log(maximumSubarraySum([4, 4, 4], 3));             // 0
console.log(maximumSubarraySum([1, 1, 1, 1, 1, 1], 2));    // 0
console.log(maximumSubarraySum([9, 9, 9, 1, 2, 3], 3));    // 6
console.log(maximumSubarraySum([1, 2, 1, 3, 4], 3));       // 8
