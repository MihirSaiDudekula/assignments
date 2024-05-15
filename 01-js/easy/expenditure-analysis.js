/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/


function calculateTotalSpentByCategory(transactions) {
  // Check if transactions array is empty
  if (transactions.length === 0) {
    console.log('Transactions array is empty.');
    return [];
  }

  /* ---- Way-1 Using Ojbect & Destructuring ---- */
  // Initialize an object to store category and total spent
  const categoryTotal = {};

  // Iterate through each transaction
  transactions.forEach(transaction => {
    const {category, price} = transaction;

    // If the category already exists, add the price to the total
    if (categoryTotal[category]) {
      categoryTotal[category] += price;
    } else {
      // If the category doesn't exist, create a new entry
      categoryTotal[category] = price;
    }
  });

  // Convert the object into an array of objects
  const totalSpentByCategory = Object.keys(categoryTotal).map(category => ({
    category,
    totalSpent: categoryTotal[category],
  }));

  return totalSpentByCategory;

}


// Export the function for reuse in other modules
module.exports = calculateTotalSpentByCategory;

