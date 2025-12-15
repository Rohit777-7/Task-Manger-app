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

      const task = await taskService.createTask(
        parsed,
        req.userId
      );

      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Task creation failed"
      });
    }
  }
}
