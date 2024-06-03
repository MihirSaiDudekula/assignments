const fs = require('fs');

const prom = new Promise((resolve, reject) => {
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(data);
    });

});

// remember
// syncrounous - 1 after the other - blocking code
// asynchronous - random order - no blocking


// the goal is to observe how an expensive synchronous operation affects the timing of async operations, a more appropriate method would be a synchronous busy-wait loop.

// Simulate an expensive synchronous operation
//dont worry too much about this
function expensiveOperation(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // Busy wait for the specified duration (e.g., 3000ms)
    }
}

// In JavaScript, when an asynchronous operation is encountered, such as a Promise or a setTimeout, the execution of the code continues without waiting for the asynchronous operation to finish. so this will be skipped,for the expensive operation first
prom
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error(err);
});

console.log("Starting expensive operation...");
expensiveOperation(3000); // 3000ms or 3 seconds
console.log("Expensive operation completed.");