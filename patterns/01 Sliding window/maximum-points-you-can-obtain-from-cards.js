// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)
// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
// Maximum Points You Can Obtain from Cards
// There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.
// In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.
// Your score is the sum of the points of the cards you have taken.
// Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k1) {
  let totalSum = 0;
  // Calculate total sum
  for (let i = 0; i < cardPoints.length; i++) {
    totalSum += cardPoints[i];
  }

  let ans = 0;

  const k = cardPoints.length - k1;

  // Edge case: k === 0 means window size is 0 — no unpicked cards to search over.
  // Every card is picked, so the score is the total sum.
  if (k === 0) return totalSum;

  let start = 0;
  let minSum = Infinity;
  let sum = 0;

  for (let end = 0; end < cardPoints.length; end++) {
    // Invariant: window [start, end-1], size = end - start <= k.
    // sum = cardPoints[start] + ... + cardPoints[end-1] (0 if window is empty).
    // minSum = minimum sum across all size-k windows seen so far (Infinity if none).

    // Shrink: fixed-size window — remove one element when window has
    // already reached size k.
    if (end - start === k) {
      sum -= cardPoints[start];
      start++;
    }

    // Expand: include cardPoints[end] in the window.
    sum += cardPoints[end];

    // Record: window [start, end] has reached size k — check if this is
    // the minimum-sum window seen so far.
    if (end - start + 1 === k) {
      minSum = Math.min(minSum, sum);
    }
  }

  // Termination:
  // 1. end increments each iteration, so the loop exits when end === cardPoints.length.
  // 2. Every window of size k is visited and checked for minimum sum.
  // By the lemma: totalSum - minSum = maximum remaining (picked) sum.
  return totalSum - minSum;
};

// General Lemma — min window sum ↔ max remaining sum:
/*
Lemma: Given an array [a0, ..., a(n-1)] and a window size k,
  if W_min is the contiguous window of size k with the minimum sum,
  then the remaining (n - k) elements have the maximum sum.

Intuition:
  remaining = total - window.
  Total is fixed, so to maximize what's left, subtract the smallest piece.
  To minimize what's left, subtract the largest piece.

  min window sum → max remaining sum
  max window sum → min remaining sum

Proof:
  Let S = a0 + a1 + ... + a(n-1)                  (total sum, constant)
  For any contiguous window W of size k:
    remaining sum = S - sum(W)

  Since S is constant:
    max(remaining sum) = max(S - sum(W)) = S - min(sum(W))
    min(remaining sum) = min(S - sum(W)) = S - max(sum(W))             QED

Example: [a0, a1, a2, a3, a4], k = 2

  S = a0 + a1 + a2 + a3 + a4

  Window [a0, a1] → remaining = S - (a0+a1) = a2+a3+a4
  Window [a1, a2] → remaining = S - (a1+a2) = a0+a3+a4
  Window [a2, a3] → remaining = S - (a2+a3) = a0+a1+a4
  Window [a3, a4] → remaining = S - (a3+a4) = a0+a1+a2

  Whichever window has the smallest sum gives the largest remaining sum.
*/

// Applying the lemma to this problem:
/*
  We pick k cards from the beginning and/or end. The unpicked cards always
  form a contiguous subarray of size (n - k) in the middle.
  (Picking i from left and k-i from right leaves indices [i, n-k+i-1].)

  So: answer = S - min-sum window of size (n - k).
*/
