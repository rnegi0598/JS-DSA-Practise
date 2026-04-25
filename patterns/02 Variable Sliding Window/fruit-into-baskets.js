// Write your JS solution here, then run: npm run js
// After testing, move this file to the relevant folder (e.g. Arrays/, Strings/)


// https://leetcode.com/problems/fruit-into-baskets


/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {

    let start = 0;
    const winElement = new Set();
    const windElementIndMap = new Map();
    let maxFruits = 0;

    for (let end = 0; end < fruits.length; end++) {
        // Invariant : window [start , end -1 ] 
        // size of the window <= 2 
        // winElements : unique elements of the window 
        // windElmentsIndMap : maps the window elements to their last index 

        // Expand 
        winElement.add(fruits[end]);
        windElementIndMap.set(fruits[end], end);


        //Shrink 
        while (winElement.size > 2) {
            const lastInd = windElementIndMap.get(fruits[start]);
            if (lastInd == start) {
                // remove that element from the set and map 
                windElementIndMap.delete(fruits[start]);
                winElement.delete(fruits[start])
            }
            start++
        }

        // wind size <=2 
        maxFruits = Math.max(maxFruits, end - start + 1)

    }

    return maxFruits;
};


// test
const fruits = [1, 2, 3, 2, 2];
console.log(totalFruit(fruits))