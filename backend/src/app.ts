import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
const app = express();

app.use(cors());
app.use(express.json()); // 👈 MUST be before routes
app.use("/api/tasks", taskRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

export default app;
