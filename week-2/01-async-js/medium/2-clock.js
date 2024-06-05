//simulation of our own clock 
let hrs = 0
let mins = 0
let secs = 0

function timerClock() {
  setInterval(()=>{
    secs=secs+1
    if(secs>0 && secs%60==0)
    {
      mins+=1
      secs=0
    }
    if(mins>0 && mins%60==0)
    {
      hrs+=1
      mins=0
    }
    console.log(hrs,mins,secs)
  },1000)

}

timerClock()

// simulation of existing clock

function updateClock() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const time24hr = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const time12hr = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;

  console.log(time24hr)
  console.log(time12hr)
}

const way1 = () => {
  setInterval(updateClock, 1000);
};

way1()
