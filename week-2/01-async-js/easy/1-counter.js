let count = 0;

let myint = setInterval(() => {
  count += 1;
  console.log(count);
  if(count===5)
  {
    clearInterval(myint)
  }
}, 1000);



