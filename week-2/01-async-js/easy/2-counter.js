let count = 0

function counter()
{
	if(count===5)
	{
		return
	}
	count+=1;
	console.log(count)
	setTimeout(counter,500)
	//recursively call counter function but 1sec later
	//with this, we can simulate a for loop that runs at a given delay
}

counter()


// The issue with directly using loops is that the setTimeout function schedules all its calls to run after 500 milliseconds, but the while loop executes immediately without waiting. 