import { useState } from 'react';
import './App.css';
import { TodoProvider } from '../public/TodoContext';
import TodoList from '../components/TodoList'; 
import Todoform from '../components/Todoform'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <TodoProvider>
      <div>
        <Todoform /> 
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
