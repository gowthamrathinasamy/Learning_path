var createCounter = function(n) {
    return function() {
        return n++;
    };
};

function createCounter1(n, calls) {
    let result = calls.map(() => n++);
    return result;
}

// LeetCode-style input
const n = 10;
const calls = ["call", "call", "call"];

// Create counter
const counter = createCounter(n);

// Execute based on calls array
const result = calls.map(() => counter());

console.log(result);

console.log (createCounter1(n, calls));