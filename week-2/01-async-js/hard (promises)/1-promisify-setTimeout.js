/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    const mp = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success");
        })
    },n*1000)
    return mp
}

let n=2
wait(n)
  .then(() => {
    // Log a message when the promise is resolved
    console.log(`Promise resolved after ${n} seconds`);
  })
  .catch(error => {
    // Log an error message if the promise is rejected
    console.error(`Promise rejected after ${n} seconds`);
  });

// Export the wait function for external use
module.exports = wait;// module.exports = wait;
