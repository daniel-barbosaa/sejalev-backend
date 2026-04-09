import { createZodDto } from 'nestjs-zod';
import {
  createTaskSchema,
  getTaskFilterSchema,
  updateTaskSchema,
} from 'src/domain/schemas/task';

export class CreateTaskDto extends createZodDto(createTaskSchema) {}

export class UpdateTaskDto extends createZodDto(updateTaskSchema) {}

export class GetTaskFilterDto extends createZodDto(getTaskFilterSchema) {}
