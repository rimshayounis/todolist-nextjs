import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    fetchTodos();
  };

  const toggleTodo = async (id, done) => {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, done: !done }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  return (
    <>
    <Navbar /> 
    <div className="container">
      <h1>📝 Fullstack To-Do App</h1>
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.done ? 'done' : ''}>
            {todo.text}
            <div>
              <button onClick={() => toggleTodo(todo._id, todo.done)}>
                {todo.done ? 'Undo' : 'Completed'}
              </button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
