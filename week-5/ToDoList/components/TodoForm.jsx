import { useState } from 'react';
import { useTodos } from '../public/TodoContext';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTodoToList } = useTodos();

  const addTodo = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTodoToList({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h1>Todo List App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of your Todo"
        />
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description of your Todo"
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoForm;
