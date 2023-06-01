# Arrays

## creating an array
- using array literal 
const arr_name=["item1","item2"];
or 
const arr_name=[];
arr_name.push("item1");  //arr_name[0]="item1"
arr_name.push("item2");  //arr_name[1]="item2"

but this is wrong 
const arr_name=[];
arr_name=["item1","item2"];  //error

- using new keyword 
const arr-name=new Array("item1","item2");

## accessing an array element (by referring to the index number)
arr_name[0] // gives "item1"

## changing array elements
arr_name[0]="new item" 

## arrays are objects with just extra special properties
- In JS, arrays use numbered indexes.In JS, objects use named indexes.
- length property: Arrays have built-in length property that automatically updates to reflect the number of elements in that array.
- Array methods: Arrays have a number of built-in methods such as push, pop, slice, sort, shift, unshift .
- Array literals: JS provides a shorthand notation for creating arrays called "array literals". Eg const arr=["item1","item2"];

## associative Arrays
- arrays with names indexes are called associative arrays.
- JS do not have associative arrays. Its indexes are numbered not named.
- If you use named indexes, JavaScript will redefine the array to an object. After that, some array methods and properties will produce incorrect results.
const person = [];
person["firstName"] = "John";
person["lastName"] = "Doe";
person["age"] = 46;
person.length;     // Will return 0
person[0];         // Will return undefined 


## How to Recognize an Array ?
Array.isArray(arr_name);  

---

# Array Methods

## arr.toString()
converts an array to a string of (comma separated) array values  
const arr=["dog","cat","mouse"] 
arr.toString() //"dog,cat,mouse" 

## arr.join(separator)
It behaves just like toString(), but in addition you can specify the separator.
const arr=["dog","cat","mouse"] 
arr.join("*") //"dog*cat*mouse" 

## arr.push("newItem") and arr.pop()  inserts and remove at the end
const arr=["dog","cat","mouse"];
arr.push("tiger");  //return length of the arr i.e 4 here
arr;  //Array(4) [ "dog", "cat", "mouse", "tiger" ]
arr.pop();  // return "tiger"
arr; //Array(3) [ "dog", "cat", "mouse" ]

## arr.unshift("newItem") arr.shift()  inserts and remove at the beginning
const arr=["dog","cat","mouse"];
arr.unshift("tiger");  //return length of the arr i.e 4 here
arr;  //Array(4) [ "tiger", "dog", "cat", "mouse" ]
arr.shift();  // return "tiger"
arr; //Array(3) [ "dog", "cat", "mouse" ]

## concatenating arrays arr1.concat(arr2,arr3,...) 
The concat() method does not change the existing arrays.
const girls = ["Cecilie", "Lone"];
const boys = ["Emil", "Tobias", "Linus"];
const student = girls.concat(boys); //Array(5) [ "Cecilie", "Lone", "Emil", "Tobias", "Linus" ]

The concat() method can also take strings as arguments.
const arr1 = ["Emil", "Tobias", "Linus"];
const myChildren = arr1.concat("Peter");  

## Flattening an Array array.flat(depth);  default depth=1
const arr = ["mon", "tues", ["wed", "thurs", ["fri", "sat"]], "sun"] ; 
arr.flat(1)  //["mon", "tues", "wed", "thurs", Array ["fri", "sat"], "sun"];
arr.flat(2) //Array(7) [ "mon", "tues", "wed", "thurs", "fri", "sat", "sun" ]

## arr.slice(start,end)  [start,end)
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
fruits.slice(1,4);  // ["Orange", "Lemon", "Apple" ]

## arr.splice.(index, howmany, item1, ....., itemX)
At position 2, add new items, and remove 1 item.
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi"); //returned ["apple"]
fruits ; // [ "Banana", "Orange", "Lemon", "Kiwi", "Mango" ]

## sorting
The sort() method sorts an array alphabetically.
const fruits=[ "Banana", "Orange", "Lemon", "Kiwi", "Mango" ];
fruits.sort() //[ "Banana", "Kiwi", "Lemon", "Mango", "Orange" ]
The reverse() method reverses the elements in an array.
[ "Orange", "Mango", "Lemon", "Kiwi", "Banana" ]

By default sort() function sorts values as strings.
const arr=[40, 100, 1, 5, 25, 10];
arr.sort();   //[ 1, 10, 100, 25, 40, 5 ]  this is not what we wanted
Using compare function 
arr.sort(function(a, b){return a - b});  //[ 1, 5, 10, 25, 40, 100 ]

## finding max and min in an array
using sorting then getting max and min is inefficient. 
const arr=[1,2,3]; 
using Math.max() on array
Math.max.apply(null, arr) is equivalent to Math.max(1, 2, 3).
Math.max(...arr);
Using Math.min() on an Array
Math.min.apply(null, arr) is equivalent to Math.min(1, 2, 3).
Math.min(...arr);


## array iteration
const numbers = [45, 4, 9, 16, 25];

- numbers.forEach((value,ind,arr)=>{})
- numbers.map((val,ind,arr)=>{}) 
- numbers.filter((val,ind,arr)=>{})
- numbers.reduce((total,val,ind,arr)=>{},initialValue)
- numbers.every((val,ind,arr)=>{})  //return true if all the values pass the test.
- numbers.some((val,ind,arr)=>{})  //return true if any of the value pass the test

## numbers.indexOf(item.start)   //index of first occurence of item from start ind 
const fruits = ["Apple", "Orange", "Apple", "Mango"]; 
fruits.indexOf("Orange")  //1

## numbers.lastIndexOf(item, start)

## numbers.find((val,ind,arr)=>{} )
The find() method returns the value of the first array element that passes a test function.
const numbers = [4, 9, 16, 25, 29];
numbers.find((val)=>{
    if(val>18){
        return true;
    }else{
        return false;
    }
})

## numbers.findIndex((val,ind,arr)=>{})
The findIndex() method returns the index of the first array element that passes a test function.

## Array.from()
The Array.from() method returns an Array object from any object with a length property or any iterable object.
 Array.from("ABCDEFG"); //Array(7) [ "A", "B", "C", "D", "E", "F", "G" ]

## arr.includes(search-item)
This allows us to check if an element is present in an array (including NaN, unlike indexOf).

const numbers=[ 23, 45, 9, 34, 55, NaN, 243, undefined ];
numbers.includes(34); //true
numbers.indexOf(34);  //3
numbers.includes(NaN); //true
numbers.indexOf(NaN);  //-1
numbers.includes(undefined); //true
numbers.indexOf(undefined); //-1

## spread operator
The ... operator expands an iterable (like an array) into more elements.
const arr1=[12,23,232]
const arr2=[1,2,3]
const arr3=[...arr1,...arr2];  //[12,23,232,1,2,3]
