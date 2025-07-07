import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatDate } from '../utils/formatDate';

const FILTERS = ['all', 'active', 'completed'];

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false, created: Date.now() }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <div className="flex mb-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          className="border p-2 flex-grow"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <div className="flex justify-between mb-4">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border">
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
            >
              {task.text} <span className="text-xs block">{formatDate(task.created)}</span>
            </span>
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}