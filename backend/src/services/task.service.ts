import prisma from "../config/prisma";
import { CreateTaskInput } from "../dtos/task.dto";

export class TaskService {
  // CREATE TASK
  async createTask(data: CreateTaskInput, creatorId: string) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || "",
        dueDate: new Date(data.dueDate),
        priority: data.priority,
        status: data.status,
        creatorId,
        // default to creator if no assignedToId provided so DB relation remains valid
        assignedToId: data.assignedToId ?? creatorId
      }
    });

    return task;
  }

  // TASKS CREATED BY USER
  async getTasksCreatedByUser(userId: string) {
    return prisma.task.findMany({
      where: {
        creatorId: userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  // TASKS ASSIGNED TO USER
  async getTasksAssignedToUser(userId: string) {
    return prisma.task.findMany({
      where: {
        assignedToId: userId
      },
      orderBy: {
        dueDate: "asc"
      }
    });
  }

  // OVERDUE TASKS
  async getOverdueTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: {
          lt: new Date()
        },
        status: {
          not: "COMPLETED"
        }
      },
      orderBy: {
        dueDate: "asc"
      }
    });
  }

  // UPDATE TASK
  async updateTask(taskId: string, data: Partial<CreateTaskInput>) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority as any,
        status: data.status as any,
        assignedToId: data.assignedToId
      }
    });
  }

  // DELETE TASK
  async deleteTask(taskId: string) {
    return prisma.task.delete({ where: { id: taskId } });
  }

  // COMPLETE TASK
  async completeTask(taskId: string) {
    return prisma.task.update({ where: { id: taskId }, data: { status: "COMPLETED" } });
  }
}

