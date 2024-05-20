import { useState } from "react";
import "./App.css";

export default function TodoApp() {

  //Managing the tasks using hooks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

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

  //toggling the tasks
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //Filtering the tasks based on condition
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        required
        placeholder="Enter new task"
      />
      <button className="addButton" onClick={addTask}>
        Add todo
      </button>
      <div>
        <button
          className={`filterButton ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filterButton ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filterButton ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div className="task-text">
              {task.completed ? <del>{task.text}</del> : task.text}
            </div>
            <button className="deleteButton" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            <button
              className="editButton"
              onClick={() => editTask(task.id, prompt("Edit task", task.text))}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
