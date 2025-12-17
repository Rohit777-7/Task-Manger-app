import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/tasks/created").then(res => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Dashboard ✅</h1>
        <p>You are logged in</p>

        <h2 style={{ marginTop: 20 }}>My Tasks</h2>

        {tasks.map(task => (
          <div className="task" key={task.id}>
            <b>{task.title}</b>
            <span className={`badge ${task.status === "TODO" ? "todo" : "completed"}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
