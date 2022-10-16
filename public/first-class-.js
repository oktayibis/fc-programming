
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