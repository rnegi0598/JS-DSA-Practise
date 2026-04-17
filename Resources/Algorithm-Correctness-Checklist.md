# How to Be Confident Your Algorithm Is Correct

Good question — and an important one. "It passes the examples" is not the same as "it's correct." Here's the toolkit experienced people actually use. None of it is magic; it's just disciplined habits.

---

## 1. State the invariant *before* you write the loop

An **invariant** is a sentence that is true at the top of every iteration. For a sliding-window problem like *Maximum Sum of Distinct Subarrays With Length K*, the invariant is:

> "At the start of each iteration, `inWindow` contains exactly the distinct values in `nums[left..right-1]`, and `windowSum` is their sum."

If you can't write that sentence, you don't understand your own loop yet. Write it as a comment first, then make the code preserve it.

**Rule of thumb:** every line inside the loop either *uses* the invariant or *restores* it. Nothing else.

---

## 2. Check the three boundaries explicitly

Most bugs hide at boundaries. For any algorithm, walk through:

| Boundary | Question to ask |
|---|---|
| **Empty input** | `[]`, `""`, `k = 0` — does it return something sensible? |
| **Single element** | `[5]` with `k = 1` — does the loop even run once correctly? |
| **All same / all distinct** | `[4,4,4]` vs `[1,2,3,4,5]` — opposite extremes |
| **k equals n** | Whole array is one window |
| **k > n** | Impossible window — what happens? |
| **First and last index** | Does `right = 0` work? Does `right = n-1` work? |

Look at the sanity-check cases at the bottom of a good reference solution — they're not random; each one pokes a different boundary (duplicates, all-same, small k, duplicates at the front, clean case).

---

## 3. Trace by hand on a tiny input

Before trusting code, pick an input with 4–6 elements and **walk through every iteration on paper**, writing down the state (`left`, `right`, `windowSum`, `inWindow`) after each step. If the hand-trace matches the expected output, your mental model is consistent with your code. If it doesn't, you've found the bug *before* the debugger has to.

This feels slow. It isn't — it replaces an hour of confused debugging.

---

## 4. Argue correctness in three pieces

Borrowed from how loop proofs are taught:

1. **Initialization** — is the invariant true *before* the loop starts?
2. **Maintenance** — if the invariant holds at the top of an iteration, does it still hold at the bottom?
3. **Termination** — when the loop exits, does the invariant + exit condition imply the answer is correct?

You don't have to write a formal proof. Just say each of the three out loud. If you stumble on one, that's where the bug is.

---

## 5. Count the work (complexity as a sanity check)

In sliding window: "every index enters the window once and leaves once → O(n)." If your analysis gives you O(n) but your code has a nested `while` that *looks* like it could run n times per iteration, stop and re-examine. A mismatch between your expected complexity and the code's shape is a strong signal something is off.

---

## 6. Property-based thinking (even without a library)

Instead of only checking specific outputs, ask: **what must always be true of the output?**

For the distinct-subarray problem:
- The answer is `>= 0` always.
- The answer is `<=` sum of the k largest values.
- If no valid window exists, the answer is `0`.

Generate random small inputs, run your algorithm, and check the properties. This catches cases you'd never think to write by hand.

---

## 7. Compare against a brute force

For any optimized algorithm, write the obvious O(n²) or O(n·k) version first (or alongside). Run both on random inputs, assert they agree. When they disagree, you have a minimal failing case for free.

```js
function brute(nums, k) {
  let best = 0;
  for (let i = 0; i + k <= nums.length; i++) {
    const slice = nums.slice(i, i + k);
    if (new Set(slice).size === k) best = Math.max(best, slice.reduce((a, b) => a + b));
  }
  return best;
}
```

Use `brute` as a test oracle against your fast version.

---

## 8. Separate the three questions (for sliding window specifically)

Every sliding-window problem is just **three blanks**:

- What state do I maintain?
- What does "invalid" mean?
- What do I record?

If you can answer those three in one sentence each *before* coding, your solution will almost write itself — and you'll know why each line is there.

---

## TL;DR — the habit to build

1. Write the invariant as a comment.
2. List 4–5 edge cases before coding.
3. Hand-trace a small input.
4. Cross-check with a brute-force on random inputs.
5. Recompute the complexity and make sure the code shape matches.

Do this for your next 10 problems and it will become automatic. Confidence doesn't come from "I think it works" — it comes from *not being able to think of a case that breaks it, having tried*.
