### 1. Find max of array
- Invariant: At the top of each iteration, best equals the maximum of arr[0..i-1]. (Precondition: arr.length ≥ 1.)
- Initialization: Before the loop, i = 1, so arr[0..i-1] = arr[0..0] = [arr[0]]. We set best = arr[0], which is trivially the max. ✓
- Maintenance: Assume at the top of iteration i: best = max of arr[0..i-1]. The body sets best = max(best, arr[i]) = max(max of arr[0..i-1], arr[i]) = max of arr[0..i]. When i 
  increments to i+1, the invariant reads best = max of arr[0..(i+1)-1] = max of arr[0..i]. ✓
- Termination (progress): i strictly increases each iteration and the loop exits when i = arr.length. So the loop ends after arr.length - 1 iterations.
- Termination (correctness): Upon exit, i = arr.length. The invariant gives best = max of arr[0..arr.length-1], which is the max of the whole array. ✓


---
### 2. Count occurrences of a value
- Invariant: At the top of each iteration, c equals the number of occurrences of target in arr[0..i-1].
- Initialization: Before the loop, i = 0, so the range arr[0..-1] is empty and contains 0 occurrences. We set c = 0. ✓
- Maintenance: Assume c = count in arr[0..i-1] at the top. The body increments c iff arr[i] === target. So afterward, c =
  count in arr[0..i-1] + [arr[i] === target ? 1 : 0] = count in arr[0..i]. When i becomes i+1, the invariant reads count in
  arr[0..i]. ✓
- Termination (progress): i strictly increases and is bounded above by arr.length, so the loop exits after exactly arr.length
   iterations.
- Termination (correctness): On exit, i = arr.length. Invariant gives c = count in arr[0..arr.length-1] = count in the whole
  array. ✓


   ---
### 3. Reverse an array in place   

-  Invariant (three clauses): Let A be the original array. At the top of each iteration, with i + j = length - 1:
    -  1. For all k in [0..i-1]: arr[k] = A[length-1-k].
    -  2. For all k in [j+1..length-1]: arr[k] = A[length-1-k].
    -  3. For all k in [i..j]: arr[k] = A[k].
-  Initialization: i = 0, j = length - 1. Ranges [0..-1] and [length..length-1] are empty (clauses 1 and 2 vacuous). Range
  [0..length-1] is the whole array, still unmodified, so clause 3 holds. ✓
-  Maintenance: By clause 3, arr[i] = A[i] and arr[j] = A[j] before the swap. After swapping: arr[i] = A[j] = A[length-1-i] 
  (clause 1 extended) and arr[j] = A[i] = A[length-1-j] (clause 2 extended). After i++ and j--, the middle shrinks by two cells
   (both now belong to the "done" regions), so clause 3 still holds for the smaller range. ✓
-  Termination (progress): i strictly increases and j strictly decreases. After at most ⌈length/2⌉ iterations, i ≥ j and the
  loop exits.
-  Termination (correctness): On exit i ≥ j. If length is even, the middle is empty and clauses 1+2 cover every index. If
  length is odd, the middle is one element which by clause 3 equals A[i] — the correct value for the center of a reversed
  odd-length array. Either way, the final array reverses the original. ✓


### 4. Two Sum (sorted input)
- Preconditions: array is sorted non-decreasing.
Invariant: If there exist indices a < b with arr[a] + arr[b] = target, then lo ≤ a and b ≤ hi.
- Initialization: lo = 0, hi = length - 1. [lo..hi] is the whole array, so any valid pair trivially satisfies lo ≤ a and b ≤ hi. ✓

- Maintenance: Let s = arr[lo] + arr[hi]. Three cases:
  - s === target: we return immediately with a correct answer. Invariant maintenance is moot.
  - s > target: for any k in [lo..hi-1], sortedness gives arr[k] + arr[hi] ≥ arr[lo] + arr[hi] > target, so hi cannot be part
   of any valid pair in the current window. Any solution in [lo..hi] must be in [lo..hi-1]. hi-- preserves the invariant.
  - s < target: symmetrically, lo cannot be part of any valid pair in the current window. lo++ preserves the invariant.

Termination (progress): Each iteration either returns or strictly shrinks hi - lo by 1. After at most length - 1 
  iterations, lo >= hi and the loop exits.

Termination (correctness): On exit, lo >= hi, so [lo..hi] has at most one index. A valid pair needs two distinct indices,
  so by the invariant no solution exists. Returning [-1, -1] is correct. ✓
