import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const taskController = new TaskController();

// HEALTH CHECK
router.get("/ping", (_req, res) => {
  res.json({ message: "tasks route working" });
});

// CREATE TASK
router.post(
  "/",
  authMiddleware,
  (req, res) => taskController.createTask(req, res)
);

// TASKS CREATED BY ME
router.get(
  "/created",
  authMiddleware,
  (req, res) => taskController.getMyCreatedTasks(req, res)
);

// TASKS ASSIGNED TO ME
router.get(
  "/assigned",
  authMiddleware,
  (req, res) => taskController.getMyAssignedTasks(req, res)
);

// OVERDUE TASKS
router.get(
  "/overdue",
  authMiddleware,
  (req, res) => taskController.getOverdueTasks(req, res)
);

export default router;
