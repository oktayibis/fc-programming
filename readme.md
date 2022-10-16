# Functional Programming
Based on https://www.youtube.com/watch?v=XvLMO2wE3OQ
### First Class Functions

```jsx
// first class function is a function that can be assigned to a variable
function add(x,y) {
    return x + y;
}

const add = function(x,y) {
    return x + y;
}

// first class function is a function that can be passed as an argument to another function

document.addEventListener('click', function(e) { // passing function as an parameter
    e.preventDefault();
    console.log('click');
})

// first class function is a function that can be returned from another function

function twoAdd(x) {
    return function(y) {
        return x + y;
    }
}
```

### Pure/Impure Functions

```jsx
// pure functions take in a state and return a new state without side effects
// they are pure because they do not mutate the state
// same input always returns the same output

function pure(a,b){
    return a + b;
}

pure(1,2); // 3
pure(1,2); // 3
pure(1,2); // 3 always returns 3 because it is pure

// impure functions take in a state and return a new state with side effects
// they are impure because they mutate the state
// same input does not always return the same output
// the output is dependent on the state 
// or/and/if there is another effect in the function

function impure(a,b){
    return a + b + Math.random(); // Math.random() is a side effect
}
impure(1,2); // 3.123123123
impure(1,2); // 3.234234234

function impure2(a,b){
    console.log('hello'); // console.log is a side effect, it is third party code
    return a + b;
}

// reading/writing local state, http request etc make funtions impure
// anything meaningful we can write impure funtions.
```

### Declarative functions

```jsx
const numbers = [1,2,3,4,5,6]

// Declaraive programming
// declarative programming is a style of programming where you tell 
// the computer what you want done by writing code that almost looks like plain english
// here we are telling the computer over the array and logs each number
numbers.forEach(number => console.log(number))

// also instead if the abobe code, we create  a pure funtion pass it to the forEach method
const log = number => console.log(number)
numbers.forEach(log) // 1,2,3,4,5,6 -> easy to read and debug

forEach(log, numbers) // 1,2,3,4,5,6 -> easy to read and debug

// Imperative programming
// imperative programming is a style of programming where you tell 
//the computer how to do something by writing code that looks like a recipe
// here we are telling the computer how to do iterate over the array
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element);
}

// for while do while loops are imperative
// they are not declarative because they are not pure functions
// they are impure because they mutate the state
```

### Composition

```
// composition is a function that takes a function and returns a function
// this is a higher order function
// it's kind like a inheritence in oop
// we take the result from the first function and pass it to the second function

// const compose = (f, g) => (data) => f(g(data));  start with g then f -> right to left
// const pipe = (f, g) => (data) => g(f(data)); // start with f then g -> left to right
//  compose is right to left, pipe is left to right
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// compose is right to left, pipe is left to right
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
```

```jsx
const addClass = className => element => {
    element.classList.add(className);
    return element;
};

const elem = tag => document.createElement(tag);

const el = compose( 
// compose is right to left, 
//it creates first div then adds class from righy to left
 addClass('second-class'),
 addClass('first-class'),
)(elem('div')); // take the elem function and pass it to compose
```

### Currying

```jsx
// currying is a technique of evaluating a function with multiple arguments,
// into a sequence of functions with a single argument.
// it is a way to create a function that takes multiple arguments
// and returns a function that takes one argument at a time

const curry = (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

    const elem = tag => document.createElement(tag);

    const attr = curry((name, value, element) => {
        element.setAttribute(name, value);
        return element;
    });

console.log(attr('id', 'my-id', elem('div'))); // <div id="my-id"></div>

// curry is creating function for every paramaters.
// it give us to work with only needed params to pass and return funtion to use for another params
// also this make more reusable functions, so only creating one funtion with curry 
// we can create different funtion based on its params
// that makes our code more readable.

// Basicly curry can help us to create more spacialized function

   const setData = attr('data-id'); // we create function that return funtion already passed data-id as attribute
   const setOne = setData(1); // now we can use this function to assing the data-id attribute as a value 1 and return new function
   const divid = setOne(elem('div')); // <div data-id="1"></div> we add out data-id=1 attribute to div element.

// let's convert the old addClass funtion with curry
// we don't have to return another function here, so curry has already handled it for us
const addClass = curry((className, element) => {
    element.classList.add(className);
    return element;
}); 

// same with below, each param can return function
const addClass = className => element => {
    element.classList.add(className);
    return element;
};
```

```jsx
// Example for the creating alert messeage 

// first we create our curry funtion
const curry = (fn, arity = fn.length, ...args) => {
    return arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}

// now creating compose function
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// add child to parant node
const append = curry((child, parent) => {
    parent.appendChild(child);
    return parent;
});

// adding class to node element
const addClass = curry((className, element) => {
    element.classList.add(className);
    return element;
});

// creating node element
const createEl = tag => document.createElement(tag);

const addMessage = (content) => compose(
    append(text(content)),
    addClass('alert'),
    addClass('alert-success'),
)(createEl('div'));

const message = addMessage('Hello World');
// <div class="alert-success alert">Hello World</div>
document.body.appendChild(message);
```

```jsx
// Adding text as list simple with functional

const getEl = (id) => document.getElementById(id);

const on = curry((event, element, fn) => {
// this curry function responsible for the handling events
// it adds event listener to element with event type
// and return removing event listener
    element.addEventListener(event, fn);
    return function() {
        element.removeEventListener(event, fn);
    }
});

const view = state => {
// responsible the rendering state 
// it creates div element and append all child as bootstrap alert div
    const appendFunc = state.map((content, index)=> append(addMessage(content, index)))

    return state.length > 0 ? pipe(
        ...appendFunc,
    )(createEl('div')) : text('No messages');
}

const clear = curry((element) => {
// this responsible when we are updating the state, 
// removing old elements from the node
    element.innerHTML = '';
    return element;
});

const clearText  = (element) => {
    element.value = '';
    return element;
}

   
const addMessage = (content, index) => compose(
    append(text(content)),
    attr('data-index', index),
    addClass('alert'),
    addClass('alert-success'),
)(createEl('div'));

const buttonClick = on('click', getEl('message-button'))

function app(state, output, dispatch) {

  compose(append(view(state)), clear())(output)

   const stop = dispatch(e => { // it ruturns event.removeEventListener
    stop() // first we removed event listeners if has any before
    const text = getEl('message-text')
    const message = text.value;
    const newState = [...state, message];
    clearText(text);

    app(newState, output, dispatch); // updating state and rendering again
   })

}

app(Object.freeze([]), getEl('message-list'), buttonClick);
```