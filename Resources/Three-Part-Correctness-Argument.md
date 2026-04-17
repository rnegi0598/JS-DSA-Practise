# The Three-Part Correctness Argument, Deeply

Companion to `Algorithm-Correctness-Checklist.md` and `Algorithm-Correctness-Deep-Dive.md`. This file zooms in on one technique — the three-part (loop invariant) argument — because it's the single most powerful correctness tool you'll learn.

---

## Why three parts? (The big idea)

The three-part argument is nothing more than **mathematical induction, applied to loops**. If you've seen induction before (prove P(0), then prove P(n) ⇒ P(n+1), conclude P holds for all n), you already know the whole game.

| Induction | Loop invariant |
|---|---|
| Base case | **Initialization** (invariant holds before loop) |
| Inductive step | **Maintenance** (if invariant holds at top of iteration, it holds at top of next one) |
| Conclusion | **Termination** (when loop exits, invariant + exit condition imply correctness) |

The "invariant" is the statement P you're proving by induction. That's it. Nothing more mystical.

This matters because induction is how we reason about things with *arbitrarily many steps* without having to simulate every step. A loop that runs a million iterations? You can't trace it. But you can prove it correct with three small arguments.

---

## Part 1 — Initialization: "start in a known-good state"

**The claim:** before the loop runs even once, the invariant is already true.

This is the **base case**. It's usually trivial — almost always the invariant is true *because the range the invariant describes is empty*, and vacuous statements about empty things are free.

### Example: sum of array

```js
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
```

Invariant: *"At the top of iteration i, `sum` equals the sum of `arr[0..i-1]`."*

Initialization: before the loop, `i = 0`, so `arr[0..-1]` is empty, and its sum is 0. We set `sum = 0`. Invariant holds. ✓

### Example: our sliding window

Invariant: *"At the top, `inWindow` = distinct values in `nums[left..right-1]`, `windowSum` is their sum, distinct, length ≤ k."*

Initialization: `left = 0`, `right = 0`, so the range `nums[0..-1]` is empty. `inWindow = {}`, `windowSum = 0`. All clauses of the invariant are vacuously true (empty set is trivially distinct, length 0 ≤ k). ✓

### The pitfall to watch for

If initialization *doesn't* work out trivially, your invariant is probably **too strong**. Weaken it. A common fix: change `>` to `≥`, or insert "or the range is empty" as an escape hatch.

Example: if you tried to invariant "maxSum is the max over some window seen so far," you'd fail initialization because no window has been seen. Better invariant: "maxSum is the max over all size-k valid windows ending in `[0..right-1]`, or 0 if none." Now the empty range case is explicit.

---

## Part 2 — Maintenance: "one step doesn't break it"

**The claim:** assume the invariant holds at the top of an arbitrary iteration. Show it still holds at the top of the *next* iteration.

This is the **inductive step** and is usually the hardest part of the three. It's where real bugs hide.

The technique: walk through the loop body line by line, explaining how each line either (a) temporarily breaks the invariant and then (b) a later line fixes it, so that by the end of the body the invariant is restored.

### Example: sum of array

Assume at top of iteration i, `sum = arr[0..i-1]`. The body executes `sum += arr[i]`. Now `sum = arr[0..i-1] + arr[i] = arr[0..i]`. After the loop increments to iteration i+1, the invariant becomes "`sum = arr[0..i]`" — exactly what we have. ✓

### Example: our sliding window (carefully)

Assume at top of iteration `right = r`:
- `inWindow` = distinct values in `nums[left..r-1]`
- `windowSum` = their sum
- length `r - left ≤ k`

Body:

```js
while (inWindow.has(nums[r]) || r - left + 1 > k) {
  inWindow.delete(nums[left]);
  windowSum -= nums[left];
  left++;
}
inWindow.add(nums[r]);
windowSum += nums[r];
if (r - left + 1 === k) { /* record */ }
```

Each while iteration: we delete `nums[left]` from the Set, subtract it from `windowSum`, increment `left`. That means the "range described by the invariant" shrank by one on the left. The invariant **still holds** for the new, smaller range `nums[left+1..r-1]`.

After the while exits, two facts are locked in: `nums[r]` is not in the Set, and `r - left + 1 ≤ k`. Now we add `nums[r]` to both the Set and the sum. So now:
- `inWindow` = distinct values in `nums[left..r]`
- `windowSum` = their sum
- length `r - left + 1 ≤ k`, and still all distinct

At the top of iteration `r+1`, the invariant says: `inWindow` = distinct values in `nums[left..(r+1)-1]` = `nums[left..r]`. ✓ Exactly what we have.

### The pitfall to watch for

Maintenance is where you catch **"I forgot to update one of the two data structures"** bugs. If you updated `windowSum` but not `inWindow`, then at the top of the next iteration the invariant's clause *"inWindow = ..."* is no longer true. The invariant exposed the bug.

**Rule of thumb:** if your state has two pieces (Set + sum, count map + counter, etc.), every write must touch both or your invariant breaks.

---

## Part 3 — Termination: "the exit tells us what we need"

Termination is actually two sub-claims, and most people conflate them:

### (3a) The loop actually ends (progress)

You need to argue there's some *progress measure* — a quantity that strictly changes in a bounded direction each iteration.

- For-loops from 0 to n: trivially terminate.
- While-loops: you have to argue. What's shrinking or growing?

For our sliding window, the outer loop is a for-loop over `right`, so it terminates after n iterations. The inner while loop is trickier — but `left` strictly increases each iteration and is bounded above by `right`, so it terminates too.

### (3b) Upon exit, invariant + exit condition ⇒ correctness

This is the payoff. The invariant was true throughout; when the loop exits, you *also* know the exit condition. Together, they imply the answer is right.

### Example: sum of array

When the for loop exits, `i = arr.length`. Invariant says `sum = arr[0..i-1] = arr[0..length-1]` = entire array. ✓

### Example: binary search

```js
let lo = 0, hi = arr.length - 1;
while (lo <= hi) {
  const mid = (lo + hi) >> 1;
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
return -1;
```

Invariant: *"if target is in the array, it's in `arr[lo..hi]`."*

- **Initialization:** `lo=0, hi=length-1`, the whole array. Trivially true.
- **Maintenance:** if `arr[mid] < target`, then because the array is sorted, target can't be at `mid` or earlier; so it must be in `arr[mid+1..hi]`. Setting `lo = mid+1` preserves the invariant. Symmetric for the other branch.
- **Termination:** loop ends when `lo > hi`, meaning `arr[lo..hi]` is empty. Combined with the invariant ("if target is in array, it's in this range"), we conclude target is not in the array. Returning -1 is correct. ✓

Notice how the invariant is *stated conditionally* ("if target is in the array..."). That's crucial — it's exactly the form needed to draw the right conclusion at termination.

### Example: our sliding window

Termination: outer for-loop exits when `right = n`. By the invariant, across all iterations where `right - left + 1 === k`, we had valid (distinct, length-k) windows and considered them for `maxSum`.

**The subtle part (worth slowing down on):** did we consider *every* valid window? For any valid k-window `[i..i+k-1]`, when `right` reached `i+k-1`, was `left ≤ i`? Yes — here's why. `left` only advances when the window state *cannot* accept `nums[right]`. If the true valid window `[i..i+k-1]` exists, then at the moment `right = i+k-1`, the range `nums[i..i+k-1]` is already distinct and length k, so `left` never had reason to advance past `i`. So `left ≤ i`, and there's a point during that iteration (after shrinking) where `left` is *exactly* at some position ≤ i with the window valid and of size ≤ k. The code records whenever size is exactly k, so this window gets considered. ✓

If that felt like hand-waving, that's because termination arguments for sliding window require one careful lemma about *why left never skips past a valid start*. This is exactly the kind of subtle thing the three-part method forces you to confront.

---

## Choosing the right invariant (the real skill)

The three-part proof is mechanical *once you have the right invariant*. Finding the invariant is the actual skill. Rules:

### Rule 1: The invariant must be **strong enough** to imply correctness at termination

If at the end, your invariant plus exit condition doesn't give you the answer, the invariant is too weak. Strengthen it.

*Example:* for binary search, the invariant "lo and hi are valid indices" is too weak — it doesn't tell you anything about the target. You need "if target is in the array, it's in `arr[lo..hi]`."

### Rule 2: The invariant must be **weak enough** to hold at initialization

If you can't establish the invariant with trivial starting state, weaken it — often by adding an "or empty" clause.

### Rule 3: The invariant should mention **every piece of state** the loop maintains

If your loop has three variables (`left`, `windowSum`, `inWindow`), the invariant must constrain all three. Otherwise maintenance is unprovable for the unmentioned one.

### Rule 4: If maintenance is hard, **split the invariant into smaller clauses**

Our invariant has four clauses: (a) Set equals window, (b) sum equals window sum, (c) distinct, (d) length ≤ k. Each clause can be argued separately. This decomposition keeps the argument clean.

---

## Common Failure Modes

Here's a quick catalogue of mistakes to self-check for:

1. **"I forgot termination was two things."** Always ask both *does it stop?* and *is the answer right when it stops?*
2. **Invariant refers to state that doesn't exist yet.** Fix: add an "or empty" clause.
3. **Invariant doesn't constrain the answer.** Fix: add a clause about `maxSum` / `result` / whatever you return.
4. **Maintenance argument skips lines.** Fix: walk every line of the loop body explicitly — no mental shortcuts.
5. **Pretending the while loop "obviously" doesn't misbehave.** Fix: treat nested loops as their own invariant-maintenance proof.
6. **Off-by-one in the invariant range.** `nums[left..right-1]` vs `nums[left..right]` — pick one, be consistent, check both endpoints at initialization and maintenance.

---

## A Worked Problem You Should Try Yourself

**Problem:** Kadane's algorithm — max subarray sum.

```js
function maxSubArray(nums) {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}
```

Try to write:
1. The invariant (two clauses — one about `current`, one about `best`).
2. Initialization argument.
3. Maintenance argument (why is `current = Math.max(nums[i], current + nums[i])` the right update?).
4. Termination.

Hint for the invariant:
- `current` = max sum of a subarray **ending exactly at index `i-1`**.
- `best` = max sum of any subarray within `nums[0..i-1]`.

Once you see why those two clauses are the right thing to track, the proof almost writes itself. If you get stuck, that's a sign you need to strengthen or weaken a clause.

---

## The meta-lesson

The three-part argument isn't just for proving existing code. It's a **design tool**. When you're *writing* a loop, you can work backwards:

1. What's the answer I want when the loop exits?
2. What invariant, combined with my exit condition, would give me that answer?
3. What starting state makes the invariant trivially true?
4. What update rule preserves the invariant across one step?

Do this and the loop body practically writes itself — and you know it's correct *by construction*, not by testing.

That's the endgame. You're not proving algorithms are correct after the fact. You're **designing them to be provable**.
