### 4. Two Sum (sorted input)
```js
function twoSum(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const s = arr[lo] + arr[hi];
    if (s === target) return [lo, hi];
    if (s < target) lo++;
    else hi--;
  }
  return [-1, -1];
}
```
- Array is sorted 
- Solution can exists or not exists 
- Invariant:  If the solution exists then the two elements will have its indices between the [i,j]. 
- Initialization : for i=0  and j=arr.length-1 if the solution does not exists we will get [-1,-1] 
Maintenance : for i and j  if the sum of the i and jth element can have 3 cases : 
    case 1  : sum == target we have found the solution .  
    case 2 : sum > target  we have to decrease the sum and in the sorted array it is only possible with decreasing the j . Increasing the i will further increase the sum .
    case 3 : sum < target . we have to increase the sum and in a sorted array it is only possible with increasing the i as arr[i] < arr[j] . this eliminates the possibility of having the sum with j as indices as with j if we are getting sum of arr[i] +arr[j] < target then we will have the sum less with all k < j arr[i] + arr[k] < arr[i] + arr[j]
Termination : loop wither increases  i or decreses j so we will definitely reach a stage where i>= j and loop breaks . when loop breaks we will have covered all the cases and would have no solution as if we would have solution we would not have reached outside the loop    
