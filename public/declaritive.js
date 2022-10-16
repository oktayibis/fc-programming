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
