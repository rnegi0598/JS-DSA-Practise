// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


//  13 : https://leetcode.com/problems/longest-repeating-character-replacement/description/

// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

// Return the length of the longest substring containing the same letter you can get after performing the above operations.

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {

    let start = 0;
    const freq = {};
    let longestSubstring = 0;

    for (let end = 0; end < s.length; end++) {
        // Invariant : window [start , end -1]
        // valid window : min of elements in the freq > k
        // freq : window elements frequency 

        // Expand : add end element to the window
        if (freq[s[end]] === undefined) freq[s[end]] = 0
        freq[s[end]]++


        // Shrink : adding end element may invalidate the window 
        while (!isWindowValid(freq, k)) {
            freq[s[start]]--
            if (freq[s[start]] === 0) delete freq[s[start]]
            start++;
        }

        // window becomes valid for record 
        longestSubstring = Math.max(longestSubstring, end - start + 1)
    }

    return longestSubstring
};


function isWindowValid(freq, k) {

    let maxCharCount = 0;
    let sum = 0

    for (const key in freq) {
        if (freq[key] > maxCharCount) {
            maxCharCount = freq[key]
        }
        sum += freq[key]
    }

    // for a window to be valid sum of rest of the characters should have count < = k

    const restOfSum = sum - maxCharCount;
    if (restOfSum <= k) return true  // valid 
    return false
}


// optimized version
var characterReplacement = function (s, k) {
    const freq = new Array(26).fill(0);
    let start = 0;
    let maxFreq = 0;
    let best = 0;

    for (let end = 0; end < s.length; end++) {
        // Invariant: window is [start, end - 1] before adding s[end]
        // valid window: windowSize - maxFreq <= k
        // freq: counts of chars inside current window

        // Expand: add end element to the window
        const endIdx = s.charCodeAt(end) - 65;
        freq[endIdx]++;
        if (freq[endIdx] > maxFreq) maxFreq = freq[endIdx];

        // Shrink: if replacements needed exceed k, move start right
        while (end - start + 1 - maxFreq > k) {
            const startIdx = s.charCodeAt(start) - 65;
            freq[startIdx]--;
            start++;
        }

        // Window is valid here; record answer
        const windowLen = end - start + 1;
        if (windowLen > best) best = windowLen;
    }

    return best;
};


// test

// const s = "AABABBA";
// const k = 1;
const s = "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF"
const k = 4;
console.log(characterReplacement(s, k))