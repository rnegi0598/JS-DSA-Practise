Based on the [Sliding Window Cheatsheet](https://leetcode.com/discuss/post/6900561/ultimate-sliding-window-guide-patterns-a-28e9/), here is the complete list of problems categorized by their specific patterns and technical requirements:

## 1. Fixed Size Window

These problems involve a window of a constant length $k$ that slides across the array or string.

### a. Generic (No extra STL required)

1. **[Max Sum Subarray of size K](https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1)**: Maintain a window sum and track the maximum.
2. **[Maximum Sum of Distinct Subarrays With Length K](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/description/)**: Use a frequency map to ensure all elements in the fixed window are unique.
3. **[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/description/)**: Calculate the sum of $k$ elements and find the max average.
4. **[Substrings of Size Three with Distinct Characters](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/description/)**: A simple check for uniqueness in a window of size 3.
5. **[Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/)**: Track the count of vowels as the window shifts.
6. **[Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/)**: Compare window averages against a fixed threshold.
7. **[Minimum Recolors to Get K Consecutive Black Blocks](https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/description/)**: Find the window with the minimum number of white blocks.
8. **[Permutation in String](https://leetcode.com/problems/permutation-in-string/description/)**: Use frequency counts to find if a window is an anagram of the target.
9. **[Find the K-Beauty of a Number](https://leetcode.com/problems/find-the-k-beauty-of-a-number/description/)**: Convert number to string and check divisibility of substrings of length $k$.
10. **[Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/)**: Flipped logic; find the minimum sum subarray of size $(n - k)$.
11. **[Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/description/)**: Find substrings of length 10 that appear more than once.
12. **[K-Radius Subarray Averages](https://leetcode.com/problems/k-radius-subarray-averages/description/)**: Calculate averages for windows of size $2k + 1$.
13. **[Find the Power of K-Size Subarrays I](https://leetcode.com/problems/find-the-power-of-k-size-subarrays-i/)**: Track "good" adjacencies (difference of 1) in a window.
14. **[Alternating Groups II](https://leetcode.com/problems/alternating-groups-ii/description/)**: Handles circular arrays using modulo arithmetic to find alternating color patterns.

### b. Requires STL (Queue, Deque, Map)

1. **[First Negative Integer in Every Window of Size K](https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1)**: Use a `queue` or `deque` to track indices of negative numbers.
2. **[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/description/)**: Use a monotonic `deque` to find the maximum in each window in $O(n)$ time.
3. **[Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/description/)**: Use frequency maps/vectors to compare the window to a target pattern.

---

## 2. Variable Size Window

These problems require shrinking or expanding the window based on specific dynamic conditions.

### a. Generic (Standard validity conditions)

1. **[Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/)**: Shrink from the left as long as the sum is $\geq$ target.
2. **[Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/description/)**: Count all valid subarrays ending at the current right pointer.
3. **[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)**: Shrink the window when a duplicate character is encountered.
4. **[Count Subarrays With Score Less Than K](https://leetcode.com/problems/count-subarrays-with-score-less-than-k/description/)**: Use the formula $\text{sum} \times \text{length} < k$ as the validity condition.
5. **[Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/)**: Use a frequency map to track distinct elements.
6. **[Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/description/)**: Longest subarray with at most 2 distinct integers.
7. **[Length of Longest Subarray With At Most K Frequency](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/description/)**: Shrink when the frequency of any element exceeds $k$.
8. **[Longest K Unique Characters Substring](https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1)**: Variation of the $k$ distinct characters problem.
9. **[Replace the Substring for Balanced String](https://leetcode.com/problems/replace-the-substring-for-balanced-string/description/)**: Minimize the window length such that characters outside the window are balanced.
10. **[Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/description/)**: Maximize length by allowing up to $k$ zeros to be flipped.
11. **[Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/)**: A specific case of flipping exactly one zero.
12. **[Maximize the Confusion of an Exam](https://leetcode.com/problems/maximize-the-confusion-of-an-exam/description/)**: Similar to Max Consecutive Ones, but for both 'T' and 'F' characters.
13. **[Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/description/)**: Maintain `maxFreq` and shrink if $\text{window size} - \text{maxFreq} > k$.
14. **[Get Equal Substrings Within Budget](https://leetcode.com/problems/get-equal-substrings-within-budget/description/)**: Standard variable window based on a cost budget.
15. **[Longest Nice Subarray](https://leetcode.com/problems/longest-nice-subarray/description/)**: Use bitwise AND operations to maintain a window where every pair's AND result is 0.

### b. "At Least" Logic

These problems count subarrays where a condition is met "at least" $k$ times.

1. **[Count Subarrays Where Max Element Appears at Least K Times](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/description/)**: Once valid, all extensions to the right are also valid.
2. **[Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/description/)**: Find the smallest window containing 'a', 'b', and 'c'.
3. **[Count the Number of Good Subarrays](https://leetcode.com/problems/count-the-number-of-good-subarrays/description/)**: Count subarrays with at least $k$ pairs of equal elements.

### c. "Exact K" Logic (Formula: $Exact(K) = AtMost(K) - AtMost(K-1)$)

1. **[Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/description/)**: Find subarrays with sum exactly equal to goal.
2. **[Count Complete Subarrays in an Array](https://leetcode.com/problems/count-complete-subarrays-in-an-array/description/)**: Subarrays with all distinct elements from the original array.
3. **[Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/description/)**: Standard "exact $k$" problem using the subtraction formula.
4. **[Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/description/)**: Find subarrays with exactly $k$ odd numbers.

### d. Requires STL

1. **[Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/description/)**: Uses an `unordered_set` to check for duplicates within a distance $k$.
2. **[Longest Continuous Subarray with Absolute Diff Less Than or Equal to Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/)**: Uses two monotonic `deques` to track min and max.
3. **[Continuous Subarrays](https://leetcode.com/problems/continuous-subarrays/description/)**: Similar to the absolute difference limit problem, using `deques` for min/max tracking.
