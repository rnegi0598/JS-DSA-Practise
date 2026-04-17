# Practice Set: Loop Invariants, Graded by Difficulty

Companion to `Three-Part-Correctness-Argument.md`. A progression of problems specifically chosen so each one exercises a *different* flavor of invariant-writing. Work them in order — earlier ones build intuition that makes the later ones easier.

For each: (1) write the invariant, (2) argue initialization, (3) argue maintenance, (4) argue termination (both sub-parts). Don't skip straight to the code — the point is the *sentence*.

---

## Tier 1 — Warmups (single variable, linear scan)

These build the muscle of "translate loop state into a sentence." The code is trivial; the invariant *isn't*.

### 1. Find max of array
```js
function max(arr) {
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > best) best = arr[i];
  }
  return best;
}
```
**Skill:** simplest possible invariant. One sentence. *Hint: "best is the max of..."*

### 2. Count occurrences of a value
```js
function count(arr, target) {
  let c = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) c++;
  }
  return c;
}
```
**Skill:** invariant about a *count* rather than a max. Nearly identical shape to #1 — notice the pattern.

### 3. Reverse an array in place
```js
function reverse(arr) {
  let i = 0, j = arr.length - 1;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++; j--;
  }
}
```
**Skill:** invariant with **two moving pointers** and a statement about *which portions are already done*. *Hint: "elements at indices `[0..i-1]` are the original last `i` elements in reverse, and symmetrically for the right side."*

---

## Tier 2 — Two-pointer

These force you to describe what's true about *both* the already-processed portion and the yet-to-process portion.

### 4. Two Sum (sorted input)
```js
function twoSum(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const s = arr[lo] + arr[hi];
    if (s === target) return [lo, hi];
    if (s < target) lo++;
    else hi--;
  }
  return [-1, -1];
}
```
**Skill:** **conditional** invariant (like binary search). *Hint: "if a solution exists, one of its indices is in `[lo..hi]`."* The hard part is justifying *why* moving `lo` up never eliminates a valid solution.

### 5. Remove duplicates from sorted array (in place)
```js
function dedup(arr) {
  let write = 0;
  for (let read = 0; read < arr.length; read++) {
    if (read === 0 || arr[read] !== arr[read - 1]) {
      arr[write++] = arr[read];
    }
  }
  return write;
}
```
**Skill:** invariant about a *prefix* of the array that's been rewritten. *Hint: "`arr[0..write-1]` contains the distinct values of `arr[0..read-1]` in sorted order."*

### 6. Move zeros to end
```js
function moveZeros(arr) {
  let w = 0;
  for (let r = 0; r < arr.length; r++) {
    if (arr[r] !== 0) arr[w++] = arr[r];
  }
  while (w < arr.length) arr[w++] = 0;
}
```
**Skill:** same shape as #5 but the post-condition is different. Writing both invariants side-by-side reveals the pattern.

---

## Tier 3 — Sliding Window

Build on what you already know from the distinct-subarray problem. Each of these changes exactly one of the three blanks (state / invalid / record).

### 7. Longest substring without repeating characters
```js
function longest(s) {
  const seen = new Set();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left++]);
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```
**Skill:** invariant **with two clauses** — one for the window state, one for `best`. *Hint: "`seen` = chars in `s[left..right-1]`, all distinct; `best` = longest distinct substring in `s[0..right-1]`."*

### 8. Minimum window substring (hardest sliding window)
Given strings `s` and `t`, find the smallest substring of `s` that contains all characters of `t`.

**Skill:** invariant with a **count map and a "missing" counter**. This is the hardest sliding window invariant to state cleanly. *Hint: the invariant has to say what `missing` represents in terms of the current window; expect a clause like "missing = number of character counts in `t` not yet satisfied by the window."*

### 9. Max consecutive 1s after flipping at most k 0s
```js
function longestOnes(arr, k) {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < arr.length; right++) {
    if (arr[right] === 0) zeros++;
    while (zeros > k) {
      if (arr[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```
**Skill:** integer-valued state instead of a set. Good contrast with #7.

---

## Tier 4 — Binary Search Variants (invariant **must** be conditional)

These are where sloppy invariants *silently produce wrong answers*. Writing them precisely is a rite of passage.

### 10. First occurrence of a value (leftmost binary search)
```js
function firstOccurrence(arr, target) {
  let lo = 0, hi = arr.length;  // note: hi is exclusive
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo < arr.length && arr[lo] === target ? lo : -1;
}
```
**Skill:** invariant about a **half-open interval** `[lo, hi)`. *Hint: "all elements in `arr[0..lo-1]` are `< target`, all elements in `arr[hi..n-1]` are `>= target`."* Notice: two clauses, one about *each* side of the interval. This is the template for all "find the boundary" binary searches.

### 11. Search in rotated sorted array
Given a sorted array that's been rotated, find a target. This one is famous for the invariant being *hard to state* because the array isn't globally sorted.

**Skill:** the invariant still says "if target exists, it's in `[lo..hi]`" — the trick is proving **maintenance** when one half of the array is sorted and the other isn't. Forces you to case-split in the maintenance argument.

### 12. Peak element (find any local max)
```js
function findPeak(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```
**Skill:** the invariant is surprising. *Hint: "there exists a peak in `arr[lo..hi]`."* Then ask: why is that preserved? The answer uses the fact that the array has implicit `-infinity` sentinels at both ends.

---

## Tier 5 — Beyond simple loops

These exercise invariants that aren't just about arrays.

### 13. Euclidean algorithm (GCD)
```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
```
**Skill:** the invariant is a **mathematical identity**, not a data-structure statement. *Hint: "gcd(a, b) at the top of every iteration equals gcd(original a, original b)."* Termination is *much* trickier than it looks — you have to argue `b` strictly decreases.

### 14. BFS (shortest path in unweighted graph)
```js
function bfs(start, target, neighbors) {
  const dist = new Map([[start, 0]]);
  const queue = [start];
  while (queue.length) {
    const u = queue.shift();
    if (u === target) return dist.get(u);
    for (const v of neighbors(u)) {
      if (!dist.has(v)) {
        dist.set(v, dist.get(u) + 1);
        queue.push(v);
      }
    }
  }
  return -1;
}
```
**Skill:** invariant about a **queue and a map** *together*. *Hint: "at the top of each iteration, (a) every node in `dist` has its true shortest distance, (b) the queue contains nodes in non-decreasing order of distance, and (c) for every node not yet in `dist`, its shortest distance from `start` is strictly greater than the front of the queue."* Writing the correctness of BFS feels impossible until you see this three-clause invariant — then it's trivial.

### 15. Insertion sort
```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > x) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = x;
  }
}
```
**Skill:** **nested loops, each with its own invariant.** Outer invariant: "`arr[0..i-1]` is a sorted permutation of the original `arr[0..i-1]`." Inner invariant: "`arr[j+2..i]` all hold values > x; the 'hole' is at index `j+1`." Practicing this problem teaches you how to treat nested loops — prove the inner invariant as a lemma, then use it to prove the outer.

---

## Tier 6 — Final Boss

### 16. Quickselect (find k-th smallest)
Use Lomuto or Hoare partition inside a recursive / iterative select.

**Skill:** the invariant crosses recursive calls. You have to say: "the k-th smallest element of the original array is the (k - offset)-th smallest of the current subarray `arr[lo..hi]`, where offset counts how many elements we've already partitioned to the left." This forces you to track state *across* recursion — similar to how real invariants work in production systems.

---

## How to work through this list

Don't just scribble proofs. For each problem:

1. **Write the invariant before looking at any hints.** Read the code, close the tab, state the invariant in plain English.
2. **Try to break it.** Can you construct a loop body modification that technically satisfies your invariant but gives wrong output? If yes, your invariant is too weak — strengthen it.
3. **Try to prove initialization.** If it doesn't work trivially, your invariant is too strong — weaken it.
4. **Compare against the hint** only after attempting. The gap between your version and the hint is the lesson.
5. **Implement the algorithm from scratch** using only your invariant as a guide. This is the real test.

Working through problems 1, 5, 7, 10, 14, and 15 carefully is more valuable than skimming all 16. Depth over breadth.
