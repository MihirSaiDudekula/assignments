import React, { createContext, useState, useContext } from 'react';

// Create the Context
const TodoContext = createContext();

// Provider Component
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  function addTodoToList(todo) {
    setTodos([...todos, todo]);
  }

  function finishTodo(index) {
    // Create a new array by mapping over each todo item to its index
    // we using set todos to set the todos btw
    setTodos(todos.map((todo, i) => {
      // Check if the current index is the one we want to finish
      if (i === index) {
        // Return a new todo object with the 'finished' property set to true
        return { ...todo, finished: true };
      }
      // Return the original todo if it is not the one we want to finish
      return todo;
    }));
  }


  function deleteTodo(index) {
    // Create a new array excluding the todo item at the given index
    const before = todos.slice(0, index); // Items before the index
    const after = todos.slice(index + 1); // Items after the index
    
    // Concatenate before and after arrays
    setTodos([...before, ...after]);
  }



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
