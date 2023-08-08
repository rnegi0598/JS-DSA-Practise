# [JS Questions](https://github.com/lydiahallie/javascript-questions)

- ## Q3

  Behaviour of `this` keyword in regular functions vs arrow functions

  - In regular functions, the value of `this` is determined by how the function is called or invoked.
  - Arrow functions do not have their own `this` binding. The value of this in an arrow function is lexically (or statically) scoped. It is determined by the surrounding scope where the arrow function is defined. The value of `this` in arrow function is always bound to the value of `this` in the closest non-arrow parent function.

  ```js
  const obj1 = {
    a: 23,
    regularf: function () {
      console.log("inside regular", this.a);
    },
    arrowf: () => {
      console.log("inside arrow", this.a);
    },
  };
  obj1.regularf(); //inside regular 23 , 'this' is the obj1 here
  obj1.arrowf(); //inside arrow undefined  , 'this' is window obj
  ```

  ```js
  const obj1 = {
    a: 23,
    regularf: function () {
      console.log("inside regular", this.a);
      arrowf = () => {
        console.log("inside arrow", this.a);
      };
      arrowf();
    },
  };
  obj1.regularf();
  //inside regular 23
  // inside arrow 23
  ```

- ## Q4

```js
+true  //1
+false; //0

!0; //true
!1; //false !2 !3 !4 ...
!""; //true
!"abcd"; //false
```

- ## Q5
  In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.

```js
const obj1={
  apple:23,
  "orange":44,
}
obj1.apple; //23
obj1.orange; //44

obj1."apple"; //error
obj1."orange"; //error

obj1["apple"] //23
obj1["orange"]  //44

obj1[apple]  //error
obj1[orange] //error

```

- ## Q8

  Static method

  - static method are defined on an object class and not on an object.
  - Static properties cannot be directly accessed on instances of the class. Instead, they're accessed on the class itself.
  - Static properties and methods are inherited.

- ## Q9
  functions are objects in JS.
- In a constructor function `this` does not have a value. It is a substitute for the new object. The value of `this` will become the new object when a new object is created.

```js
// object constructor function
function Person(first, last) {
  this.firstName = first;
  this.lastName = last;
}

const myFather = new Person("John", "Doe");
const myMother = new Person("Sally", "Rally");

const sister = Person("any", "body"); //here we are not using new keyword. It will behave like a function where this is global object and function is returning nothing so sister will contain undefined value.

Person.hello = () => console.log("hello"); //add hello method to Person
//this is same as using static properties and methods

myMother.hello(); //error
//to add  hello method to the constructor use prototype. Prototype add properties and methods to constructor therefore making it available to all objects.
Person.prototype.sayHello = () => console.log("hello");
myMother.sayHello(); //"hello"
```

- ## Q10

  All JavaScript objects inherit properties and methods from a prototype.
  The JavaScript prototype property allows you to add new properties and methods to object constructors.

- ## Q13
  Bubbling and Capturing (Capturing > Target > Bubbling)
- **Bubbling** : When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

  ```html
  <form onclick="alert('form')">
    FORM
    <div onclick="alert('div')">
      DIV
      <p onclick="alert('p')">P</p>
    </div>
  </form>
  ```

  A click on the inner `<p>` first runs onclick:

  - On that `<p>`.
  - Then on the outer `<div>`.
  - Then on the outer `<form>`.
  - And so on upwards till the document object.

  The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water.

- `event.target`
  A handler on a parent element can always get the details about where it actually happened.  
   - event.target : element where the user clicked - this (=event.currentTarget) : “current” element, the one that has a currently running handler on it.
- Stopping bubbling `event.stopPropagation()`  
  event.stopPropagation() stops the move upwards, but on the current element all other handlers will run.  
  To stop the bubbling and prevent handlers on the current element from running, there’s a method event.stopImmediatePropagation(). After it no other handlers execute.
- capturing  
  elem.addEventListener(..., {capture: true}) or elem.addEventListener(..., true)  
   - If it’s false (default), then the handler is set on the bubbling phase. - If it’s true, then the handler is set on the capturing phase.

[Read more about bubbling and capturing](https://javascript.info/bubbling-and-capturing#bubbling);

- event delegation  
  The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.  
  The algorithm: - Put a single handler on the container. - In the handler – check the source element event.target. - If the event happened inside an element that interests us, then handle the event.
