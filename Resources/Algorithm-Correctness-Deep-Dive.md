# Deep Dive: Each Technique Applied to the Distinct-Subarray Problem

Companion to `Algorithm-Correctness-Checklist.md`. The checklist tells you *what* to do; this file walks through *how*, using one concrete problem as the running example.

Running reference:

```js
function maximumSubarraySum(nums, k) {
  let maxSum = 0;
  let windowSum = 0;
  let left = 0;
  const inWindow = new Set();

  for (let right = 0; right < nums.length; right++) {
    while (inWindow.has(nums[right]) || right - left + 1 > k) {
      inWindow.delete(nums[left]);
      windowSum -= nums[left];
      left++;
    }
    inWindow.add(nums[right]);
    windowSum += nums[right];
    if (right - left + 1 === k) {
      if (windowSum > maxSum) maxSum = windowSum;
    }
  }
  return maxSum;
}
```

See `patterns/01 Sliding window/maximum-sum-of-distinct-subarrays-with-length-k.reference.js` for the annotated original.

---

## 1. Invariant — "the sentence that's always true"

An invariant is a property that holds **at the top of every iteration** of your main loop. Think of it as a contract the loop body promises not to break.

**The invariant for our code:**

> At the top of the `for` loop, `inWindow` contains exactly the values in `nums[left..right-1]`, those values are all distinct, `windowSum` equals their sum, and `right - left <= k`.

Why does this matter? Because if this sentence is true, then every decision inside the loop is easy to justify:

- `inWindow.has(nums[right])` correctly asks "is nums[right] a duplicate *in the current window*?" — because the invariant guarantees that Set mirrors reality.
- `right - left + 1 > k` correctly asks "would adding nums[right] make the window too long?"
- The record step at the end is safe because we just restored the invariant (now for the extended range).

**Failed invariant = bug.** If you ever add to `windowSum` but forget to add to `inWindow`, your invariant breaks, and *every subsequent iteration is running on a lie*. That's why bugs in sliding window feel so chaotic — one bad update poisons everything downstream.

**Practice drill:** Before writing any loop, write the invariant as a one-line comment above it. If you can't write it, you don't yet understand your own solution.

---

## 2. Edge Cases — the systematic list

For *this* problem, here's how the table from the checklist looks filled in:

| Edge case | Input | Expected | Why it's a stress test |
|---|---|---|---|
| Empty array | `[]`, `k=3` | `0` | Loop never enters — return value must be sensible |
| k larger than n | `[1,2]`, `k=5` | `0` | `right - left + 1 === k` never true |
| k = n, all distinct | `[1,2,3]`, `k=3` | `6` | Window covers whole array |
| k = n, with dupes | `[1,2,1]`, `k=3` | `0` | Impossible to satisfy distinctness |
| All duplicates | `[4,4,4]`, `k=3` | `0` | `while` loop has to fire every single iteration |
| Duplicate at the very end | `[1,2,3,1]`, `k=3` | `6` | Forces shrinking past multiple positions |
| k = 1 | `[5,1,9]`, `k=1` | `9` | Every single element is trivially a valid window |

Notice: each row exercises a **different branch** of the code. Row 5 exercises the `inWindow.has(nums[right])` branch. Row 3 exercises the "never shrink" path. Row 6 exercises the "shrink a lot at once" path.

This is the mindset: *which line of my code does this test case actually exercise?* If you can't map a test to a line, your tests are redundant.

---

## 3. Hand-Trace — the discipline

Let me trace `nums = [1, 5, 4, 2, 9, 9, 9], k = 3`:

| right | nums[r] | while action | left | inWindow | sum | size | recorded? | maxSum |
|---|---|---|---|---|---|---|---|---|
| 0 | 1 | — | 0 | {1} | 1 | 1 | no | 0 |
| 1 | 5 | — | 0 | {1,5} | 6 | 2 | no | 0 |
| 2 | 4 | — | 0 | {1,5,4} | 10 | 3 | **yes** | 10 |
| 3 | 2 | size 4>3, drop 1 | 1 | {5,4,2} | 11 | 3 | **yes** | 11 |
| 4 | 9 | size 4>3, drop 5 | 2 | {4,2,9} | 15 | 3 | **yes** | 15 |
| 5 | 9 | 9 in set → drop 4, drop 2, drop 9 | 5 | {9} | 9 | 1 | no | 15 |
| 6 | 9 | 9 in set → drop 9 | 6 | {9} | 9 | 1 | no | 15 |

Final: **15** ✓

Notice what the trace exposed: at `right=5` the while loop ran **three times in one iteration**. If you only imagined it running once, your mental model is wrong. Hand-tracing *reveals mental model bugs*, which are the hardest kind to debug.

Rule: when hand-tracing, **don't skip iterations in your head**. Write each line. Your confidence comes from the mechanical act, not the conclusion.

---

## 4. Three-Part Correctness Argument

This is the most powerful technique. Spoken out loud:

**(a) Initialization.** Before the loop, `left = 0`, `right = 0` (loop hasn't started), so the range `nums[left..right-1]` is `nums[0..-1]` — empty. `inWindow = {}`, `windowSum = 0`. Invariant holds. ✓

**(b) Maintenance.** Assume the invariant holds at the top. Two things can happen:

- The `while` fires. Each iteration of it removes `nums[left]` from both the Set and sum, then increments `left`. This shrinks the range `nums[left..right-1]` by one element on the left — invariant still holds for the smaller range.
- After the `while` exits, we know (i) `nums[right]` isn't in the Set, and (ii) `right - left + 1 <= k`. We add `nums[right]` to both Set and sum. Now `inWindow` and `windowSum` correctly describe `nums[left..right]`, which is what the invariant demands at the *next* iteration (when `right` will have incremented). ✓

**(c) Termination.** After `right = n-1`, the loop exits. At every iteration where the window size equaled `k`, we considered it for `maxSum`. The subtle question: *did we consider every valid window?* Answer: for each end-index `r`, `left` is the smallest index such that `nums[left..r]` is distinct and length ≤ k. If a valid k-window ends at `r`, its start index must be ≥ `left` — because `left` only advances when forced, meaning the current left position is still potentially usable. This is worth convincing yourself of on paper.

This is how professionals talk about their algorithms in interviews and PRs. Learn to say it.

---

## 5. Complexity as a Sanity Check

Naïvely, the code looks like O(n·k) — an outer `for` and an inner `while`. But look at `left`: it starts at 0 and only ever increments. It can increment at most `n` times *across the whole run*, not per iteration.

**Amortized analysis:**
- Every index enters `inWindow` exactly once (one `add`).
- Every index leaves `inWindow` at most once (one `delete`).
- Total Set operations: ≤ `2n`.
- Overall: **O(n) time, O(min(n,k)) space.**

**The sanity check:** if your hand-trace shows the while loop running a lot in some iterations but rarely in others, *and* you can argue that the total work across all iterations is bounded by `n`, you're probably right. If it feels like the while might run `k` times in every single iteration for some pathological input — dig deeper; you might have a real O(nk) on your hands.

**Practical tip:** whenever you see `left` only ever incrementing (never resetting, never going backward), trust the O(n) analysis.

---

## 6. Property-Based Thinking

Instead of hardcoding expected outputs, encode *rules about the answer*:

```js
function properties(nums, k, result) {
  // P1: Non-negative.
  console.assert(result >= 0);

  // P2: Bounded above by the sum of the k largest values.
  const topK = [...nums].sort((a, b) => b - a).slice(0, k).reduce((a, b) => a + b, 0);
  console.assert(result <= topK);

  // P3: If all elements are distinct and n >= k, result is just the max window sum.
  if (new Set(nums).size === nums.length && nums.length >= k) {
    let s = 0;
    for (let i = 0; i < k; i++) s += nums[i];
    let maxW = s;
    for (let i = k; i < nums.length; i++) {
      s += nums[i] - nums[i - k];
      maxW = Math.max(maxW, s);
    }
    console.assert(result === maxW);
  }

  // P4: Result = 0 iff no valid distinct k-window exists.
  // (verify with brute force)
}
```

Now generate 100 random inputs and run `properties(nums, k, maximumSubarraySum(nums, k))`. If any assert fires, you've found a bug *without knowing what the right answer should be*. Much more powerful than hand-written test cases.

---

## 7. Brute Force as Oracle

The brute force for this problem:

```js
function brute(nums, k) {
  let best = 0;
  for (let i = 0; i + k <= nums.length; i++) {
    const slice = nums.slice(i, i + k);
    if (new Set(slice).size === k) {
      best = Math.max(best, slice.reduce((a, b) => a + b, 0));
    }
  }
  return best;
}

// Random differential testing
for (let trial = 0; trial < 1000; trial++) {
  const n = Math.floor(Math.random() * 12) + 1;
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 5));
  const k = Math.floor(Math.random() * n) + 1;
  const fast = maximumSubarraySum(nums, k);
  const slow = brute(nums, k);
  if (fast !== slow) {
    console.log("MISMATCH:", nums, k, "fast=", fast, "slow=", slow);
    break;
  }
}
```

Two things to appreciate here:

1. The brute force is **obviously correct** — you can stare at it and convince yourself in 10 seconds. That's why it's an oracle.
2. The random inputs use a **small value range** (0–4) to force collisions. Randomly generated distinct inputs would never exercise the duplicate-handling code. *Engineer your random inputs to hit the interesting cases.*

---

## 8. The Three-Blanks Framework

This is the big payoff. Every variable-size sliding window problem fits this template:

```
for right in 0..n:
    EXPAND: update state with nums[right]
    SHRINK: while INVALID(state): remove nums[left], left++
    RECORD: if SHAPE(state) matches: update answer
```

Fill in three blanks:

| Problem | State | Invalid means | Record when |
|---|---|---|---|
| **Max sum distinct k-window** (our problem) | Set + sum | duplicate OR length > k | length === k |
| **Longest substring w/o repeating** | Set | duplicate | always (max length) |
| **Min window substring** | Count map + missing counter | still missing chars | when valid (min length) |
| **Fruit into baskets** | Count map | distinct count > 2 | always (max length) |
| **Longest w/ at most K distinct** | Count map | distinct count > K | always (max length) |
| **Subarrays with sum = K** (positives) | running sum | sum > K | sum === K |

Once you see this, you stop solving each problem from scratch. You ask three questions and the code writes itself.

---

## Putting It Together: A Workflow

When attempting a new problem, here's the order of operations that separates confident coders from hopeful ones:

1. **Identify the pattern.** (Is this sliding window? Two pointers? DP?)
2. **Fill in the three blanks.** (state / invalid / record)
3. **Write the invariant as a comment.**
4. **List 5 edge cases** *before* coding.
5. **Write the code.**
6. **Hand-trace one small input.** (Not the given example — pick your own.)
7. **Recite the three-part argument** (initialization / maintenance / termination) out loud.
8. **Recompute complexity** and sanity-check that the code shape matches.
9. **Write a brute force.** Random-test them against each other.
10. **Check properties** (non-negative? bounded?).

Skip any of these and you're leaving confidence on the table.
