You have been given the code of a purely frontend TODO app
You have to fill in the following functions - 
 - addTodoToDom
 - removeTodoFromDom
 - updateTodoInDom
 - updateState

These 4 functions comprise of what it means to create a library like React.
The goal is the following - 
1. Any time the updateState function is called with a new state, the updateState function calculates the diff between newTodos and oldTodos and call `addTodoToDom`, `removeTodoFromDom` or `updateState` based on the calculated diff.
2. They id of a todo uniquely identifies it. If the title of a todo with the same id changes in two iterations, updateTodoInDom should be called for it.
3. The structure of the state variable looks something like this - 
```js
    const todos = [
        {
            title: "Go to gym",
            description: "Go to gym from 7-8PM",
            id: 1
        },
        {
            title: "Buy groceries",
            description: "Purchase fruits, vegetables, and milk.",
            id: 2
        },
        {
            title: "Finish work report",
            description: "Complete and submit the quarterly work report by 5PM.",
            id: 3
        },
        {
            title: "Call Mom",
            description: "Catch up with Mom and check in on how she's doing.",
            id: 4
        },
        {
            title: "Book dentist appointment",
            description: "Schedule a dental check-up for next month.",
            id: 5
        },
        {
            title: "Read a book",
            description: "Read at least 30 pages of 'The Great Gatsby'.",
            id: 6
        },
        {
            title: "Clean the house",
            description: "Tidy up the living room, kitchen, and bathroom.",
            id: 7
        },
        {
            title: "Complete coding exercise",
            description: "Finish the coding challenge for the job interview.",
            id: 8
        },
        {
            title: "Grocery shopping",
            description: "Buy groceries including bread, eggs, and coffee.",
            id: 9
        },
        {
            title: "Water the plants",
            description: "Water all indoor and outdoor plants.",
            id: 10
        }]
```