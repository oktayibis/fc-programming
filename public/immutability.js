// immutability means that the state is never changed, but always replaced
// state const and never changed


// we should use the const keyword to declare variables that will never change
const salutation = 'Hello';
const greeting = salutation + ' World';

console.log(salutation); // Hello
console.log(greeting); // Hello World


const person = {
    firstName: 'John',
}

// const not protected from mutation on ojects
person = {} // TypeError: Assignment to constant variable.

// but we can reassign properties on the object
person.firstName = 'Jane'; // this is not immutable because we are mutating the state


// we can use freeze to make the object immutable
const person2 = Object.freeze({
    firstName: 'John',
})

person2.firstName = 'Jane'; // TypeError: Cannot assign to read only property 'firstName' of object '#<Object>'
person2 = {}; // TypeError: Assignment to constant variable.

const indexes = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

// indexes = []; // TypeError: Assignment to constant variable.
indexes[0] = 0; // TypeError: Cannot assign to read only property '0' of object '#<Array>'

// pure funtions to create freezed objects
const createFreeze = (obj) => Object.freeze(obj);
export const createFreezeArray = (arr) => Object.freeze(arr);

function addElement(arr, element){
    // we do not want to mutate the state so dont use push that mutates the array
    indexes.push(element); // TypeError: Cannot add property 11, object is not extensible
    
    // instead of the mutate the state, we create a new array with the new element
    return createFreezeArray([...arr, element]); // element=11,  
    // [1,2,3,4,5,6,7,8,9,10,11] -> new array with new element
}