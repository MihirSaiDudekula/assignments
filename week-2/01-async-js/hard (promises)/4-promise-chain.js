/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
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

function calculateTime(t1, t2, t3) {
	let st = Date.now()
	return wait1(t1)
	.then(()=>{wait2(t2)})
	.then(()=>{wait3(t3)})
	.then(() => Date.now() - start);
}

calculateTime(1, 2, 3)
  .then(totalTime => {
    // Log or use the total time as needed
    console.log(`Total time taken: ${totalTime} milliseconds`);
  })
  // Handle any potential errors in the catch block
  .catch(error => {
    console.error(`An error occurred: ${error}`);
  });
  
module.exports = calculateTime;
