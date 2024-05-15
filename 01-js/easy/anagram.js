/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

  function isAnagram(str1, str2) 
  {
    if(str1.length!=str2.length){
      return false
    }
    else
    {
      let a = Array.from(str1.toLowerCase()).sort()
      let b = Array.from(str2.toLowerCase()).sort()
      for(i=0;i<a.length;i++)
      {
        if(a[i]!=b[i])
        {
          return false
        }
      }
      return true
    }
  }
module.exports = isAnagram;
