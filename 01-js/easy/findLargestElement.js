/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  // let max = Number.MIN_VALUE
  let max = numbers[0]
    for(x of numbers)
    {
      if(numbers.length===0)
      {
        return undefined
      }
      if(x>=max)
      {
        max=x
      }
    }
    return max
}
module.exports = findLargestElement;