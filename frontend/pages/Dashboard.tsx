import { useEffect, useState } from "react";
import api from "../api/axios";
import "../index.css";

type Task = {
  id: string;
  title: string;
  status: "TODO" | "COMPLETED";
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get("/api/tasks/created")
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>
          Dashboard <span style={{ color: "#4caf50" }}>✔</span>
        </h1>
        <p style={{ marginBottom: 20 }}>You are logged in successfully</p>

        <h2>My Tasks</h2>

        {tasks.length === 0 && (
          <p style={{ color: "#777" }}>No tasks found</p>
        )}

        {tasks.map(task => (
          <div className="task" key={task.id}>
            <span>{task.title}</span>
            <span
              className={`badge ${
                task.status === "COMPLETED" ? "completed" : "todo"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
