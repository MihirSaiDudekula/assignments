/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = []; // Renamed to 'todos' for better readability
  }

  add(todo) {
    this.todos.push(todo); // Corrected the method to 'push'
  }

  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      this.todos.splice(indexOfTodo, 1); // Only remove if index is valid
    } else {
      throw new Error("Invalid index");
    }
  }

  update(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo; // Update only if index is valid
    } else {
      throw new Error("Invalid index");
    }
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      return this.todos[indexOfTodo]; // Get only if index is valid
    } else {
      throw new Error("Invalid index");
    }
  }

  clear() {
    this.todos = [];
  }
}

module.exports = Todo;

// Example usage:
// const todoList = new Todo();
// todoList.add("Buy groceries");
// todoList.add("Pay bills");
// console.log(todoList.getAll()); // ["Buy groceries", "Pay bills"]
// todoList.update(0, "Buy fresh groceries");
// console.log(todoList.get(0)); // "Buy fresh groceries"
// todoList.remove(1);
// console.log(todoList.getAll()); // ["Buy fresh groceries"]
// todoList.clear();
// console.log(todoList.getAll()); // []

