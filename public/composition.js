

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

// currying is a technique of evaluating a function with multiple arguments,
// into a sequence of functions with a single argument.
// it is a way to create a function that takes multiple arguments
// and returns a function that takes one argument at a time

const log = (...text) => console.log(...text);

// fn.length is the number of arguments the function takes
// 
const curry = (fn, arity = fn.length, ...args) => {
    return arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}


// add class to element
const addClass = curry((className, element) => {
    element.classList.add(className);
    return element;
});

const append = curry((child, parent) => {
    parent.appendChild(child);
    return parent;
});

const text = (content) => document.createTextNode(content);

const createEl = tag => document.createElement(tag);

const el = compose( 
// compose is right to left, 
//it creates first div then adds class from righy to left
 addClass('bg-light'),
 addClass('p-3'),
)(createEl('div')); // take the elem function and pass it to compose

    const attr = curry((name, value, element) => {
        element.setAttribute(name, value);
        return element;
    });


    // const setData = attr('data-id'); // we create function that return element with data-id attribute // we pass the element to the function
    // const setOne = setData(1); // we assing the data-id attribute in element as a value 1
    // const divid = setOne(elem('div')); // <div data-id="1"></div> we add out data-id=1 attribute to div element.
 

   // console.log(divid);

   
/* const addMessage = (content) => compose(
    append(text(content)),
    addClass('alert'),
    addClass('alert-success'),
)(createEl('div'));


const message = addMessage('Hello, Welcome the the site');

log(message);

document.body.appendChild(message); */

