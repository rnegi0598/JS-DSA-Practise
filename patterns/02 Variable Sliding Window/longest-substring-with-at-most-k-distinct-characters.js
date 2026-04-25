// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters

// Longest Substring With At Most K Distinct Characters
// Given a string s and an integer k.Find the length of the longest substring with at most k distinct characters.

function kDistinctChar(s, k) {
    let left = 0;
    let longestSubstring = 0;
    const windowElements = new Set();
    const windowElementsIndexMapping = new Map();

    for (let right = 0; right < s.length; right++) {
        // Invariant : window [left,right-1] 
        // windowElements stores exactly the distinct characters inside the current window.
        // windowElementsIndexMapping stores the latest index of each character still present in the current window.


        // Expand 
        windowElements.add(s[right]);
        windowElementsIndexMapping.set(s[right], right);

        // Shrink : when the distinct elements within the window becomes >  k
        while (windowElements.size > k) {
            const lastIndex = windowElementsIndexMapping.get(s[left]);

            if (lastIndex === left) {
                windowElements.delete(s[left]);
                windowElementsIndexMapping.delete(s[left])
            }


            left++;
        }

        // Record 
        longestSubstring = Math.max(longestSubstring, right - left + 1)




    }

    return longestSubstring;
}



// test
// const s = "aababbcaacc";
// const k = 2;

const s = "abcddefg";
const k = 3
console.log(kDistinctChar(s, k))
