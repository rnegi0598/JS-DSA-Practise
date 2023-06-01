# strings
let str1="hello"
let str2="hello"
str1===str2 //true
A string created using single,double or backticks are generated as a primitive value similar to numbers and booleans.
Primitive data are immutable.

let str3=new String("hello"); //typeof str3 : object
str3==str1 //true
str3===str1 //false

let str4=String("hello"); //typeof str4 : string
str1===str4 //true

## string indexing
let str='hello'
str[0]; //'h'
str.charAt(0)  //'h'

Note : you can change non-primitive data 
eg: let arr=['dog','cat','apple']
arr[0]='orange';
but you cannot change primitive data because primitive data are immutable 
eg let str='hello'
str[0]='j';  //in strict mode it will throw error
//the value of str will be still 'hello' here if you print it

## length
str.length;

## string concatenation
using +
let str1="hello';
let str2="world";
let str3=str1+str2 //"helloworld"


## string comparison
You can compare strings based on their alphabetical order and length using arithmetic comparison operator.
eg: 'berry' < 'c' //true as 'b' comes before 'c'
'berry' < 'bezzy' //true as the first two characters 'be' are same and  'r' comes before 'z'
'berry' < 'Copper' //false capital letters comes before small letters in the unicode table
'berry'< 'berrya' //true as second string is the longest 

# Common string methods 
NOTE: Primitives  data does not have methods or properties,but when you call a method on a string or access a property JS generates a wrapper object under the hood. In the end methods and properties perform their job on this wrapper object. And after the use the wrapper object is disposed. 

## string1.concat(string2,string3,...) 
let str1='hello'
let str2='world'
let str3=str1.concat(str2); //'helloworld'

## string1.toLowerCase()  does not change the original string
let str1='hello';
let str2=str1.toUpperCase(); //'HELLO'
let str3=str2.toLowerCase(); //'hello'


## string1.includes(string2,index)  2nd argument is optional and indicates the index from where to search 
let str1="hello world , how are you doing ?"
str1.includes("how are") //true
str1.includes("how are we")//false

## string1.indexOf(string2,ind) returns the first occurence of the substring inside the calling string
let str1="hello world how are you"
str1.indexOf("world") //6
str1.indexOf("random")  //-1 since not found

## string1.startsWith(string2,ind)
let str1="hello world how are you"
str1.startsWith("hello") //true
str1.startsWith("world") //false
str1.startsWith("world",6) //true

## string1.endsWith(string2,ind)
let str1="hello world how are you"
str1.endsWith("you") //true
str1.endsWith("are",19) //true str1.indexOf("are") is 16 

## string1.slice(start,end) [start,end)
let str1="helloWorld"
str1.slice(2); //"lloWorld"
str1.slice(2,4);  //"ll"
str1.slice(2,1); //"" note that end is smaller than the beginner

## string1.substring(start,end) [start,end) 
let str1="helloWorld"
str1.substring(2); //"lloWorld"
str1.substring(2,4);  //"ll"
str1.substring(2,1);  //"e" it will reverse the start and end if it founds that end is smaller than begin

## string1.split(separator ,limit) splits string into an array of substring
let str1="hello world how are you all"
str1.split() // ["hello world how are you all];
str1.split("") //[ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", … ]
str1.split("",5) //[ "h", "e", "l", "l", "o"]
str1.split("o") //["hell"," w","rldh","w are y","u all"]

## string1.replace(searchValue,replaceValue) 
The first argument is the string or a regular expressions and the second one is a string.
Only first instance is replaced. For replacing all use replaceAll()

let originalString = "The color of the sky changes color throughout the day.";
let newString = originalString.replace("color", "random");
//The random of the sky changes color throughout the day.

let originalString = "The color of the sky changes color throughout the day.";
let newString = originalString.replaceAll("color", "random");
//The random of the sky changes random throughout the day.

To change more than one substring in a string
let originalString = "Using JS, you can change the color of a webpage's background, text, and elements.";
let newString = originalString
    .replace("color", "colour")
    .replace("JS", "JavaScript");
//"Using JavaScript, you can change the colour of a webpage's background, text, and elements."

## string.trim() removes whitespaces from both sides of a string
let text1 = "      Hello World!      ";
let text2 = text1.trim(); //"Hello World"
