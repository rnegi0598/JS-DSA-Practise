// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)

// https://leetcode.com/problems/find-all-anagrams-in-a-string

// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.


/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {

    let start = 0
    const k = p.length;
    const ans = [];
    const windowCharCount = new Array(26).fill(0);
    const pCharCount = new Array(26).fill(0);

    // update the char count for the p string 
    for (let i = 0; i < p.length; i++) {
        pCharCount[p[i].charCodeAt() - 97]++;
    }

    for (let end = 0; end < s.length; end++) {

        // invariant : window [start,end-1]
        // windowCharCount contains the count of the characters in the window

        // shrink 
        if (end - start === k) {
            // remove the count from the window
            windowCharCount[s[start].charCodeAt() - 97]--;
            start++;
        }

        // Expand 
        // update the count of the end element in the windowCharCount
        windowCharCount[s[end].charCodeAt() - 97]++;

        // Record 
        if (end - start + 1 === k && areArrayEqual(windowCharCount, pCharCount)) {
            // check if string in the window and p are same or not
            ans.push(start)

        }

    }

    return ans;


};

function areArrayEqual(arr1, arr2) {

    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }


    return true
}


// test
const s = "abab";
const p = "abc";

console.log(findAnagrams(s, p))