/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
  let s = str.trim().toLowerCase()
  let vc = 0
  for(x of s)
  {    
    let ac = (x==='a')
    let ec = (x==='e')
    let ic = (x==='i')
    let oc = (x==='o')
    let uc = (x==='u')

    if(ac||ec||ic||oc||uc)
    {
      vc++
    }
  }
  return vc
}

module.exports = countVowels;