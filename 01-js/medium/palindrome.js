/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let s = str.trim().toLowerCase()
  let sarr = s.split("")
  let news = ""
  for(i=0;i<s.length;i++)
  {
    if(s.charCodeAt(i)>=97 && s.charCodeAt(i)<=122)
    {
      news+=s.charAt(i)
    }
  }
  let r = news.split("").reverse().join("")
  return news===r
  // return true;
}

module.exports = isPalindrome;
