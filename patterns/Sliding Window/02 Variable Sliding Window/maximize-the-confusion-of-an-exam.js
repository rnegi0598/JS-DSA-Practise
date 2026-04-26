// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// 12 : https://leetcode.com/problems/maximize-the-confusion-of-an-exam/description/

// A teacher is writing a test with n true/false questions, with 'T' denoting true and 'F' denoting false. He wants to confuse the students by maximizing the number of consecutive questions with the same answer (multiple trues or multiple falses in a row).

// You are given a string answerKey, where answerKey[i] is the original answer to the ith question. In addition, you are given an integer k, the maximum number of times you may perform the following operation:

// Change the answer key for any question to 'T' or 'F' (i.e., set answerKey[i] to 'T' or 'F').
// Return the maximum number of consecutive 'T's or 'F's in the answer key after performing the operation at most k times.

/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {

    let start = 0;
    const count = { 'T': 0, 'F': 0 }
    let max = 0;
    for (let end = 0; end < answerKey.length; end++) {
        // Invariant : window [start,end-1] and is valid
        // valid window : has min(T,F) <= k
        // count records count of T and F of the window

        // Expand 
        if (answerKey[end] == 'T') count.T++;
        else count.F++;

        // Shrink: adding end to the window may invalidate the window 
        while (count.T > k && count.F > k) {
            count[answerKey[start]]--
            start++;
        }


        // we have the valid window after shrink 
        // record 
        max = Math.max(max, end - start + 1)
    }

    return max;

};


// test
const str = "TTFTTFTT";
const k = 1;
console.log(maxConsecutiveAnswers(str, k))