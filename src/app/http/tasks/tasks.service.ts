import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTaskSchema,
  GetTaskFilterSchema,
  UpdateTaskSchema,
} from 'src/domain/schemas/task';

import { TasksReporitory } from './tasks.reporitory';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksReporitory) {}

  create(
    userId: string,
    { title, description, priority, date, status }: CreateTaskSchema,
  ) {
    return this.tasksRepository.create({
      data: {
        title,
        description,
        priority,
        date,
        status,
        userId,
      },
    });
  }

  findAllByUserId(userId: string, filter: GetTaskFilterSchema) {
    const { startDate, endDate } = filter;

    if (startDate && endDate) {
      return this.tasksRepository.findMany({
        where: {
          userId,
          date: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        },
        orderBy: {
          date: 'asc',
        },
      });
    }
    return this.tasksRepository.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    taskId: string,
    { title, description, priority, date, status }: UpdateTaskSchema,
  ) {
    await this.validateTaskOwnerShip(userId, taskId);

    return this.tasksRepository.update({
      where: {
        id: taskId,
      },
      data: { title, description, priority, date, status },
    });
  }

  async remove(userId: string, taskId: string) {
    await this.validateTaskOwnerShip(userId, taskId);

    await this.tasksRepository.delete({
      where: { id: taskId },
    });
  }

  private async validateTaskOwnerShip(
    userId: string,
    taskId: string,
  ): Promise<boolean> {
    const isOwner = await this.tasksRepository.findFirst({
      where: { id: taskId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Tarefa não encontrada.');
    }
    return true;
  }
}
