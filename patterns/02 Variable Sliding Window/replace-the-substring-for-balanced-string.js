// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// https://leetcode.com/problems/replace-the-substring-for-balanced-string/

/**
You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', and 'R'.

A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0. 

n is a multiple of 4.
 */




/**
 * @param {string} s
 * @return {number}
 */
var balancedString = function (s) {
    const n = s.length;
    const maxOccurences = n / 4;
    let start = 0;
    // Q,W,E,R
    const outsideFreq = {
        'Q': 0,
        'W': 0,
        'E': 0,
        'R': 0,
    }

    // update the outsideFreq 
    for (let i = 0; i < n; i++) {
        outsideFreq[s[i]]++;
    }

    // Initialization:
    // Before the loop starts, the current window is empty: s[start..end-1] = s[0..-1].
    // So outsideFreq stores counts of the whole string, which is exactly the count outside the empty window.
    // minSubstring = n is a valid upper bound because replacing the whole string always works.

    // find the element needed to balance
    let elementNeededToBalance = n;
    Object.keys(outsideFreq).forEach(key => {
        if (outsideFreq[key] > maxOccurences) {
            elementNeededToBalance += outsideFreq[key] - maxOccurences;
        }
    });



    let minSubstring = n;

    for (let end = 0; end < n; end++) {

        // Invariant at the top of each iteration:
        // 1. outsideFreq stores the counts of Q, W, E, R outside the current window s[start..end-1].
        // 2. minSubstring is the smallest valid replacement window length seen so far.
        // 3. Validity is checked on the outside counts, not on the window itself.
        //    The current window is a valid candidate exactly when
        //    elementNeededToBalance == end - start + 1.

        // Maintenance - Expand:
        // Move s[end] from outside the window to inside the window.
        // After outsideFreq[s[end]]--, outsideFreq still represents counts outside s[start..end].
        outsideFreq[s[end]]--;
        elementNeededToBalance = findElementNeededToBalance(outsideFreq, maxOccurences)

        // Maintenance - Shrink + Record:
        // While the current window is valid, record it and shrink from the left.
        // outsideFreq[s[start]]++ moves that character back outside, so the invariant is restored
        // for the next smaller window.
        while (elementNeededToBalance == end - start + 1) {
            minSubstring = Math.min(minSubstring, end - start + 1)
            outsideFreq[s[start]]++;
            elementNeededToBalance = findElementNeededToBalance(outsideFreq, maxOccurences)
            start++;
        }

        // After the while loop, either the window is invalid or it is empty.
        // In both cases, outsideFreq again matches the counts outside the current window,
        // so the invariant holds for the next iteration.


    }

    // Termination:
    // end has scanned every possible right boundary. For each end, the shrink loop examined
    // all valid windows ending at end and recorded the shortest among them.
    // Therefore minSubstring is the minimum length of a substring that can be replaced
    // to make the string balanced.

    return minSubstring


};


function findElementNeededToBalance(outsideFreq, maxOccurences) {
    let elementNeededToBalance = 0;
    Object.keys(outsideFreq).forEach(key => {
        if (outsideFreq[key] < maxOccurences) {
            elementNeededToBalance += maxOccurences - outsideFreq[key];
        }
    });

    return elementNeededToBalance
}
// test
// const s = "QWER"
// const s = "QQWE"
// const s = "QQQW"
// const s = "WWQQRRRRQRQQ"
const s = "WEWEQQRWRRWREQWEEWEQERQWWWRERRWEWWQWQQWQEREQRQRRREQWWERRERQWWRRWRWRQRWWQWRWWWWREWWWW"
console.log(balancedString(s))