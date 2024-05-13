import React, { useState, useEffect } from "react";
import axios from "axios";
import PomodoroTimer from "./PomodoroTimer";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get("/api/tasks?email=user@example.com")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    axios
      .post("/api/tasks", { email: "user@example.com", title: newTask })
      .then((response) => setTasks(response.data.tasks))
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
      <PomodoroTimer />
    </div>
  );
}

export default Dashboard;
