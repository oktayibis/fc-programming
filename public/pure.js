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
// the output is dependent on the state and there is another effect in the function

function impure(a,b){
    return a + b + Math.random(); // Math.random() is a side effect
}
impure(1,2); // 3.123123123
impure(1,2); // 3.234234234

function impure2(a,b){
    console.log('hello'); // console.log is a side effect it is third party code
    return a + b;
}

