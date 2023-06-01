# Map
Map is a collection  of keyed data items , just like an Object. But the main diff is that Map allows keys of any type.
Also Map preserves the insertion order unlike regular Object.
- new Map() - creates the map
    - const fruits=new Map([
        ['apples',223],
        ['bananas',123]
    ]);
    - const fruits= new Map();
        fruits.set('apples',223);
        fruits.set('bananas',123);
- map.set(key,val) -stores the value by the key
- map.get(key) -returns the value by the key, undefined if key odesn't exist in map
- map.has(key) -return true if key exists else false
- map.delete(key) -removes element by the key 
- map.clear() -removes everything from the map
- map.size -return the current element count

Note: unlike objects, keys are not converted to strings. Any type of key is possible.
Note: 
```js
const myMap=new Map();
myMap.set(1,11);  
myMap.set('1',12);
myMap.size;  //size is 2 because 1 and '1' are diff

```
```js
const myMap=new Map();
const obj1={name:'john'}  
const obj2={name:'john'}  
const obj3=obj1;
myMap.set(obj1,1);
myMap.set(obj2,2);
myMap.set(obj3,3);
myMap.size  //size is 2 as obj1 and obj3 reference the same object . 

```

Note: chaining map.set
```js
map.set('apple',12)
    .set('bananas',34)
    .set('grapes',989);
```

## iterating map
- map.forEach((val,key)=>{})
- for(let element of map.keys()){
    console.log(element,map.get(element))   //key val
}
- for(let element of map.values()){
    console.log(element);  //val
}
- for(let elem of map){
    console.log(elem) //[key,val]
}


# Set
Each values occur only once.   
- new Set()
    -const set=new Set(["a","b","c"]);
    -const set=new Set();
     set.add("a");
     set.add("b");
     set.add("c");
- set.add(value);
- set.delete(value);
- set.has(value);
- set.clear();
- set.size;

## iterating set
 - map.forEach(val=>console.log(val));
 - for(let elm of set){
    console.log(elem);  //value
 }