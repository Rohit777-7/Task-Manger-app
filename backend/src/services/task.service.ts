import prisma from "../config/prisma";
import { CreateTaskInput } from "../dtos/task.dto";

export class TaskService {
  async createTask(data: CreateTaskInput, creatorId: string) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate),
        priority: data.priority,
        status: data.status,
        creatorId,
        assignedToId: data.assignedToId
      }
    });

    return task;
  }
}
