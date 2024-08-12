import {createContext, useContext, useState, useEffect} from 'react';

// Create the Context
const TodoContext = createContext();

// Provider Component
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  //commented out code to be used when the mongoDB is not used and only client side global context is saved. we use a global state variable to do that

  // function addTodoToList(todo) {
  //   setTodos([...todos, todo]);
  // }

  // function finishTodo(index) {
  //   // Create a new array by mapping over each todo item to its index
  //   // we using set todos to set the todos btw
  //   setTodos(todos.map((todo, i) => {
  //     // Check if the current index is the one we want to finish
  //     if (i === index) {
  //       // Return a new todo object with the 'finished' property set to true
  //       return { ...todo, finished: true };
  //     }
  //     // Return the original todo if it is not the one we want to finish
  //     return todo;
  //   }));
  // }


  // function deleteTodo(index) {
  //   // Create a new array excluding the todo item at the given index
  //   const before = todos.slice(0, index); // Items before the index
  //   const after = todos.slice(index + 1); // Items after the index
    
  //   // Concatenate before and after arrays
  //   setTodos([...before, ...after]);
  // }
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos'); // Update with your server URL
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodoToList = async (newTodo) => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
      // Sends a POST request to the /todo endpoint on the server. This endpoint is expected to handle creating a new to-do item.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      const result = await response.json();
      setTodos([...todos, result.todo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const finishTodo = async (index) => {
    try {
      const todo = todos[index];
      await fetch('http://localhost:3000/completed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: todo._id })
      });
      const updatedTodos = todos.map((item, i) =>
        i === index ? { ...item, completed: true } : item
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error finishing todo:', error);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const todo = todos[index];
      await fetch(`http://localhost:3000/todo/${todo._id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodoToList, finishTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom Hook for Using Context
export function useTodos() {
  return useContext(TodoContext);
}


