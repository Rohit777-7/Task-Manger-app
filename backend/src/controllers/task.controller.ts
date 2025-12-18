import { Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "../dtos/task.dto";
import { AuthRequest } from "../middlewares/auth.middleware";

const taskService = new TaskService();

export class TaskController {
  async createTask(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const parsed = CreateTaskDto.parse(req.body);

      const task = await taskService.createTask(parsed, req.userId);

      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Task creation failed"
      });
    }
  }

  async getMyCreatedTasks(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tasks = await taskService.getTasksCreatedByUser(req.userId);

      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to fetch created tasks"
      });
    }
  }

  async getMyAssignedTasks(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tasks = await taskService.getTasksAssignedToUser(req.userId);

      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to fetch assigned tasks"
      });
    }
  }

  async getOverdueTasks(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tasks = await taskService.getOverdueTasks(req.userId);

      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to fetch overdue tasks"
      });
    }
  }

  async updateTask(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const updated = await taskService.updateTask(id, req.body);

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Failed to update task" });
    }
  }

  async deleteTask(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;

      await taskService.deleteTask(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Failed to delete task" });
    }
  }

  async completeTask(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;

      const task = await taskService.completeTask(id);

      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Failed to complete task" });
    }
  }
}

