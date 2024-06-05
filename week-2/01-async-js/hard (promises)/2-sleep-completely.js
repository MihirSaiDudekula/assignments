/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function expensiveOperation(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // Busy wait for the specified duration (e.g., 3000ms)
    }
}

function sleep(milliseconds) {
	const mp = new Promise((resolve,reject)=>{
		expensiveOperation(milliseconds)
		resolve()
	},n)
	return mp

}

let n = 500
sleep(n)
  .then(() => {
    // Log a message when the promise is resolved
    console.log(`Promise resolved after ${n} milliseconds`);
  })

module.exports = sleep;
