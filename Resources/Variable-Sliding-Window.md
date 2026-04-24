# Variable Sliding Window — Approach & Template

Companion to the fixed sliding window template used in `patterns/01 Sliding window/`. The core methodology (invariant + three-part correctness argument + Shrink/Expand/Record) carries over directly. Only **what triggers each phase** changes.

---

## Fixed vs Variable — What Changes

| Aspect | Fixed Window | Variable Window |
|---|---|---|
| **Window size** | Always `k` | Grows/shrinks based on a validity condition |
| **Shrink trigger** | `size == k` (make room for new element) | **window is invalid** (restore validity) |
| **Expand** | Always add `nums[right]` | Same — always add `nums[right]` |
| **Record trigger** | `size == k` | Depends on the variant (longest, shortest, count) |
| **Loop structure** | `for right` with `if` shrink | `for right` with **`while` shrink** |

---

## The Key Difference: Shrink Becomes a `while`, Not an `if`

In fixed window, shrink removes exactly one element:
```js
// Fixed: remove one to keep size = k
if (end - start === k) {
    // remove nums[start] from state
    start++;
}
```

In variable window, you shrink **as long as** the window is invalid:
```js
// Variable: shrink until window is valid again
while (/* window is invalid */) {
    // remove nums[left] from state
    left++;
}
```

### Order flip

- **Fixed window**: often shrink *before* expanding (make room, then insert).
- **Variable window**: typically **expand first, then shrink** to restore validity.

Both orderings work if you adjust the invariant consistently — but expand-then-shrink is the more natural pattern for variable windows because you need to see the new element before you can judge whether the window is valid.

---

## Template

```js
var solve = function(nums, /* params */) {
    let left = 0;
    let ans = /* initial value */;
    // window state (sum, map, count, etc.)

    for (let right = 0; right < nums.length; right++) {
        // Invariant: window [left, right-1] is VALID.
        // State variables accurately reflect that window.

        // Expand: add nums[right] to the window state
        // (this may temporarily make the window invalid)

        // Shrink: restore validity
        while (/* window [left, right] is invalid */) {
            // remove nums[left] from state
            left++;
        }

        // Record: window [left, right] is now the largest valid
        // window ending at right — record the answer
        ans = /* update based on problem type */;
    }

    return ans;
};
```

---

## Three Recording Variants

The "Record" phase depends on what the problem asks:

### 1. Longest / Maximum — record after shrinking

The window `[left, right]` is the largest valid window ending at `right`.

```js
// after the while loop
ans = Math.max(ans, right - left + 1);
```

**Examples:** Longest Substring Without Repeating Characters, Max Consecutive Ones III, Longest Repeating Character Replacement.

### 2. Shortest / Minimum — record inside the shrink loop

Every valid window before you shrink further is a candidate.

```js
while (/* window is valid and meets the target */) {
    ans = Math.min(ans, right - left + 1);
    // remove nums[left] from state
    left++;
}
```

**Examples:** Minimum Size Subarray Sum.

### 3. Count subarrays — count valid subarrays ending at `right`

Every valid window `[left, right]` implies `right - left + 1` valid subarrays ending at `right` (all subarrays `[left, right], [left+1, right], ..., [right, right]`).

```js
// after the while loop
ans += right - left + 1;
```

**Examples:** Subarray Product Less Than K, Count Subarrays With Score Less Than K.

---

## Invariant Adjustment

The invariant keeps the same shape as fixed window, but replace the size clause:

- **Fixed**: "window `[left, right-1]` has size ≤ k, state reflects that window"
- **Variable**: "window `[left, right-1]` **satisfies the validity condition**, state reflects that window"

### The three blanks (same as fixed window)

Every sliding-window problem is just three blanks:

1. **What state do I maintain?** (sum, frequency map, set, count, etc.)
2. **What does "invalid" mean?** (sum ≥ target, duplicate exists, distinct count > k, etc.)
3. **What do I record?** (max length, min length, count, etc.)

---

## Three-Part Correctness Argument (adapted)

The three-part argument applies identically. The main subtlety is in maintenance and termination.

### Initialization

Before the loop, `left = 0`, `right = 0`, window `[0, -1]` is empty. An empty window is trivially valid. State variables reflect the empty window. ✓

### Maintenance

Assume at the top of iteration `right = r`, window `[left, r-1]` is valid and state reflects it.

1. **Expand**: add `nums[r]` to state. Window becomes `[left, r]`. This may make it invalid.
2. **Shrink**: the `while` loop removes from the left until validity is restored. Each removal updates state consistently. `left` strictly increases and is bounded by `right + 1`, so the inner loop terminates.
3. **Record**: window `[left, r]` is now valid. Record the answer.

At the top of iteration `r+1`, window `[left, r]` is valid and state reflects it. ✓

### Termination

- **Progress**: `right` strictly increases each iteration. The outer loop exits when `right = n`.
- **Correctness**: depends on the recording variant:
  - **Longest**: for every valid subarray `[i, j]`, when `right = j`, `left ≤ i` (because `left` only advances to restore validity, and `[i, j]` is valid). So the window `[left, j]` is at least as long — the max is captured.
  - **Shortest**: when the window first becomes valid (meets target), we record before shrinking. We then shrink while still valid, recording each time — so the shortest valid window ending at or before `right` is captured.
  - **Count**: every valid subarray `[i, right]` is counted as part of `right - left + 1` when `right` is the right endpoint.

---

## "At Least" and "Exact K" Variants

### At Least K

Once a window `[left, right]` becomes valid (meets the "at least" condition), **all extensions to the right are also valid**. So the count of valid subarrays with right endpoint at `right` is `left + 1` (all starting positions `0, 1, ..., left`).

```js
while (/* window is valid */) {
    left++;
}
// left is now the first position where [left, right] is invalid
// so valid starting positions are 0..left-1
ans += left;
```

### Exact K

Use the subtraction formula: `Exact(K) = AtMost(K) - AtMost(K-1)`.

Write an `atMost(k)` helper that counts subarrays satisfying the condition with at most `k`, then:

```js
return atMost(k) - atMost(k - 1);
```

---

## Edge Cases to Check (same checklist as fixed window)

| Boundary | Question |
|---|---|
| **Empty input** | `[]` — does it return the base case? |
| **Single element** | Does the single-element window get evaluated? |
| **All valid** | Entire array is one valid window |
| **None valid** | No valid window exists — correct default? |
| **Validity flips at every step** | Window shrinks back to size 1 or 0 repeatedly |

---

## Summary

Your fixed-window approach needs only these updates for variable window:

1. `if` shrink → `while` shrink (driven by validity, not size)
2. Expand typically goes *before* shrink
3. Record logic depends on whether you want longest, shortest, or count
4. Invariant says "valid" instead of "size ≤ k"

Everything else — the invariant discipline, three-part proof, edge case checking, brute-force comparison — stays exactly the same.
