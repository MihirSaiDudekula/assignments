import { useTodos } from '../public/TodoContext';

function TodoList() {
  const { todos, finishTodo, deleteTodo } = useTodos();

  return (
    <div>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>: {item.description}
            <button onClick={() => finishTodo(index)}>Finish</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            {item.finished && <span> (Finished)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
