/**
 * @return {Function}
 */
//Stored a Function in the variable createHelloWorld
var createHelloWorld = function() {
//The solution always need to Return a function. So done the Nested Function
    return function(...args) {
//The Solution always need to return a statement "Hello World"
        return "Hello World"
    }
};

const f = createHelloWorld();
console.log(f());

//console.log (createHelloWorld()())

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */