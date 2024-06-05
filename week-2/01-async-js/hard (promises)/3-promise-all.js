/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t1) {
	const w1 = new Promise((resolve,reject)=>{
	    setTimeout(()=>{
	        resolve(t1);
	    })
	},t1*1000)
	return w1
}

function wait2(t2) {
	const w2 = new Promise((resolve,reject)=>{
	    setTimeout(()=>{
	        resolve(t2);
	    })
	},t2*1000)
	return w2
}

function wait3(t3) {
	const w3 = new Promise((resolve,reject)=>{
	    setTimeout(()=>{
	        resolve(t3);
	    })
	},t3*1000)
	return w3
}

const calculateTime = (t1, t2, t3) => {
  const start = Date.now();
  return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(
    () => Date.now() - start,
  );
};

// Example usage
calculateTime(1, 2, 3)
  .then(totalTime => {
    // Log or use the total time as needed
    console.log(`Total time taken: ${totalTime} milliseconds`);
  })
  // Handle any potential errors in the catch block
  .catch(error => {
    console.error(`An error occurred: ${error}`);
  });

// Export the function for external use
module.exports = calculateTime;

 