import { useState } from "react";
import "./App.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newTxt) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newTxt } : task))
    );
  };

  /*toggling the tasks*/
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo App </h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        required
        placeholder="Enter new task"
      />
      <button className="addButton" onClick={addTask}>
        Add todo{" "}
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {task.completed ? <del>{task.text}</del> : task.text}
            <button className="deleteButton" onClick={() => deleteTask(task.id)}>Delete </button>
            <button
              onClick={() => editTask(task.id, prompt("Edit task", task.text))}
            >
              Edit{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
