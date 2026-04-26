# Correctness Proof for Replace the Substring for Balanced String

This note gives a full three-part correctness argument for the sliding-window solution in `index.js`.

---

## Problem Restatement

Let `n = s.length` and let `t = n / 4`.

The string is balanced exactly when each of `Q`, `W`, `E`, and `R` appears `t` times.

We want the minimum-length substring that can be replaced so that the final string becomes balanced.

---

## Key Reframing

The algorithm does **not** reason directly about what is inside the window. Instead, it reasons about what remains **outside** the window.

For a current window `s[start..end]`, define the outside counts:

- `cQ = outsideFreq['Q']`
- `cW = outsideFreq['W']`
- `cE = outsideFreq['E']`
- `cR = outsideFreq['R']`

In the code, `outsideFreq` always stores the counts of characters outside the current window.

The current window is a valid replacement candidate exactly when each outside count is already small enough:

$$
cQ \le t,\quad cW \le t,\quad cE \le t,\quad cR \le t
$$

Why is this the right condition?

Because if the outside part already contains at most `t` of each character, then the replacement substring can supply exactly the missing characters needed to make every total count equal to `t`.

---

## Lemma: Why the Equality Test in the Code Is Correct

Your code uses the helper:

$$
D = \sum_{ch \in \{Q,W,E,R\}} \max(0, t - c_{ch})
$$

This `D` is the number of characters the replacement substring must provide in order to fill the deficits outside the window.

Let the current window length be:

$$
L = end - start + 1
$$

Also define the outside excess:

$$
E = \sum_{ch \in \{Q,W,E,R\}} \max(0, c_{ch} - t)
$$

Since the outside region contains exactly `n - L = 4t - L` characters,

$$
\sum_{ch}(t - c_{ch}) = 4t - (4t - L) = L
$$

But also,

$$
\sum_{ch}(t - c_{ch}) = D - E
$$

Therefore,

$$
D - E = L
\quad\Longrightarrow\quad
D = L + E
$$

So,

$$
D = L \iff E = 0
$$

And `E = 0` is equivalent to saying there is no outside excess, that is,

$$
c_{ch} \le t \text{ for every character } ch
$$

Therefore the condition used by the code,

```js
elementNeededToBalance == end - start + 1
```

is equivalent to:

```js
outsideFreq['Q'] <= t && outsideFreq['W'] <= t && outsideFreq['E'] <= t && outsideFreq['R'] <= t
```

This is the exact validity condition needed by the algorithm.

---

## Loop Invariant

At the top of each outer-loop iteration, just before processing `s[end]`, the following invariant holds:

1. `outsideFreq[ch]` equals the number of occurrences of character `ch` in the outside region `s[0..start-1]` together with `s[end..n-1]`. Equivalently, `outsideFreq` stores the counts of characters outside the current window `s[start..end-1]`.
2. Every window considered earlier has been processed correctly, and `minSubstring` equals the minimum length among all valid windows examined so far.
3. The current window is `s[start..end-1]`.

This is the invariant we prove.

---

## Initialization

Before the first iteration:

- `start = 0`
- `end = 0`
- the current window is `s[0..-1]`, which is the empty window
- `outsideFreq` is initialized by counting all characters of the entire string

So `outsideFreq` clearly stores the counts of characters outside the empty window, because when the window is empty, the outside region is the whole string.

Also, no candidate windows have been processed yet, so setting

```js
minSubstring = n
```

is a valid initial upper bound: the whole string is always replaceable, so the optimal answer is at most `n`.

Thus all clauses of the invariant hold before the loop starts.

Initialization is proved.

---

## Maintenance

Assume the invariant holds at the top of an arbitrary iteration with index `end`.

So before processing `s[end]`, the current window is `s[start..end-1]`, and `outsideFreq` stores the counts outside that window.

We must show that after the loop body finishes, the invariant holds for the next iteration.

### Step 1: Expand the window

The code executes:

```js
outsideFreq[s[end]]--;
```

This moves `s[end]` from the outside region into the window. Therefore, after this update, `outsideFreq` now stores the counts outside the new window `s[start..end]`.

So clause 1 of the invariant remains true for the expanded window.

The code then recomputes:

```js
elementNeededToBalance = findElementNeededToBalance(outsideFreq, maxOccurences)
```

By the lemma above, the test

```js
elementNeededToBalance == end - start + 1
```

is equivalent to saying that the current window `s[start..end]` is a valid replacement candidate.

### Step 2: Shrink while the window is valid

The code then executes:

```js
while (elementNeededToBalance == end - start + 1) {
    minSubstring = Math.min(minSubstring, end - start + 1)
    outsideFreq[s[start]]++;
    elementNeededToBalance = findElementNeededToBalance(outsideFreq, maxOccurences)
    start++;
}
```

Suppose the while-condition is true. Then, by the lemma, the current window is valid. Therefore it is a legitimate candidate answer, so updating

```js
minSubstring = Math.min(minSubstring, end - start + 1)
```

preserves clause 2 of the invariant.

Next, the algorithm shrinks the window from the left:

```js
outsideFreq[s[start]]++;
start++;
```

This moves the old leftmost character out of the window and back into the outside region. Therefore `outsideFreq` once again correctly stores counts outside the new, smaller window.

So clause 1 remains true after every shrink step.

The loop continues shrinking as long as the window remains valid. Hence, for this fixed `end`, the algorithm examines all valid windows ending at `end`, from larger to smaller, and records the smallest one among them.

When the while-loop stops, either:

- the window is no longer valid, or
- `start = end + 1`, so the window has become empty

In either case, `outsideFreq` still correctly describes the outside counts for the current window configuration, and `minSubstring` still stores the best answer among all valid windows seen so far.

Thus, when control reaches the next outer-loop iteration, all three clauses of the invariant hold again.

Maintenance is proved.

---

## Termination

Termination has two parts.

### Part A: The algorithm stops

The outer loop increases `end` by 1 each iteration and runs for at most `n` iterations, so it terminates.

The inner while-loop increases `start` by 1 each time it runs, and `start` can never exceed `n`, so the inner loop also terminates.

Therefore the whole algorithm terminates.

### Part B: When the algorithm stops, the answer is correct

When the outer loop finishes, every possible right endpoint `end` has been processed.

Consider any valid replacement window `s[i..j]`.

When the outer loop reaches `end = j`, the algorithm expands the window to include position `j`, then shrinks from the left while the window remains valid. During this process, every valid window ending at `j` is considered, including `s[i..j]` or some smaller valid window ending at `j`.

Therefore the algorithm cannot miss the optimal answer: for the right endpoint of the optimal window, the shrink loop will record a window of that same length or shorter.

Since `minSubstring` is updated with the minimum over all valid windows considered, and since every optimal candidate is considered at the iteration corresponding to its right endpoint, the final value of `minSubstring` is exactly the minimum length of a substring that can be replaced to balance the string.

Termination is proved.

---

## Why This Fits the Variable Sliding Window Template

This problem uses the same expand-shrink-record structure as other minimum-window problems:

1. Expand the right boundary.
2. Update the maintained state.
3. While the current window is valid, record it and shrink from the left.

The only unusual feature is the meaning of validity.

In many variable-window problems, validity is a condition on the window itself.

Here, validity is a condition on what remains outside the window:

> The outside counts must already be at most `n / 4` for every character.

Once you recognize that point, the invariant and the proof follow the usual sliding-window pattern.

---

## Final Conclusion

The algorithm is correct because:

1. `outsideFreq` is initialized to represent counts outside the empty window.
2. Each expand and shrink operation preserves the meaning of `outsideFreq` as outside counts.
3. The equality test in the code is mathematically equivalent to the true validity condition for a replacement window.
4. For each right endpoint, the shrink loop examines all valid windows ending there and records the shortest one.
5. After all right endpoints are processed, `minSubstring` is the minimum length among all valid replacement windows.

Therefore the function returns the minimum length of a substring that can be replaced to make the string balanced.