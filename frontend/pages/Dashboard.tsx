import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */
type Task = {
  id: string;
  title: string;
  status: "TODO" | "COMPLETED";
};

/* ================= COMPONENT ================= */
export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/api/tasks/created");
        setTasks(
          res.data.map((t: any) => ({
            id: t._id || t.id,
            title: t.title,
            status: t.status,
          }))
        );
      } catch (error: any) {
        console.error("Failed to fetch tasks", error);
        alert(error?.response?.data?.message || "Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  /* ================= ADD TASK ================= */
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await api.post("/api/tasks", {
        title: newTask,
        status: "TODO",
      });

      setTasks([
        ...tasks,
        {
          id: res.data._id || res.data.id,
          title: res.data.title,
          status: res.data.status,
        },
      ]);

      setNewTask("");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to add task");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ================= UI ================= */
  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CARD */}
      <div className="dashboard-card glass">
        <h2>My Tasks</h2>

        {/* ADD TASK */}
        <div className="add-task">
          <input
            type="text"
            placeholder="Enter new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {tasks.length === 0 && <p className="empty">No tasks yet</p>}

          {tasks.map((t) => (
            <div className="task-item" key={t.id}>
              <span className="task-title">{t.title}</span>

              <span
                className={`badge ${
                  t.status === "TODO" ? "todo" : "done"
                }`}
              >
                {t.status}
              </span>

              <div className="task-actions">
                {/* EDIT */}
                <button
                  className="btn edit"
                  onClick={async () => {
                    const newTitle = prompt("Edit task title", t.title);
                    if (!newTitle || newTitle.trim() === t.title) return;

                    try {
                      await api.put(`/api/tasks/${t.id}`, {
                        title: newTitle.trim(),
                      });

                      setTasks((prev) =>
                        prev.map((ts) =>
                          ts.id === t.id
                            ? { ...ts, title: newTitle.trim() }
                            : ts
                        )
                      );
                    } catch (err: any) {
                      console.error(err);
                      alert(
                        err?.response?.data?.message ||
                          "Failed to update task"
                      );
                    }
                  }}
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="btn delete"
                  onClick={async () => {
                    if (!confirm("Delete this task?")) return;

                    try {
                      await api.delete(`/api/tasks/${t.id}`);
                      setTasks((prev) =>
                        prev.filter((ts) => ts.id !== t.id)
                      );
                    } catch (err: any) {
                      console.error(err);
                      alert(
                        err?.response?.data?.message ||
                          "Failed to delete task"
                      );
                    }
                  }}
                >
                  Delete
                </button>

                {/* COMPLETE */}
                {t.status !== "COMPLETED" && (
                  <button
                    className="btn complete"
                    onClick={async () => {
                      try {
                        await api.put(`/api/tasks/${t.id}`, {
                          status: "COMPLETED",
                        });

                        setTasks((prev) =>
                          prev.map((ts) =>
                            ts.id === t.id
                              ? { ...ts, status: "COMPLETED" }
                              : ts
                          )
                        );
                      } catch (err: any) {
                        console.error(err);
                        alert(
                          err?.response?.data?.message ||
                            "Failed to complete task"
                        );
                      }
                    }}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
