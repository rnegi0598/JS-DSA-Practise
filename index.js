// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)



const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr);
[arr[0], arr[1]] = [arr[1], arr[0]];
console.log(arr);