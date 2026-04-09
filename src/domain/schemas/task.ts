import z from 'zod';

export const PRIORITY_TYPES = ['PAIN_PREVENTION', 'GAIN_PRODUCTION'] as const;
export type PriorityType = (typeof PRIORITY_TYPES)[number];

export const STATUS_TYPES = ['PENDING', 'DONE'] as const;
export type Status = (typeof STATUS_TYPES)[number];

export const taskSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(PRIORITY_TYPES),
  date: z.coerce.date(),
  status: z.enum(STATUS_TYPES).default('PENDING'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const createTaskSchema = taskSchema.pick({
  title: true,
  description: true,
  priority: true,
  date: true,
  status: true,
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = taskSchema
  .pick({
    title: true,
    description: true,
    priority: true,
    date: true,
    status: true,
  })
  .partial();

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

export const getTaskFilterSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato deve ser YYYY-MM-DD')
    .optional(),

  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato deve ser YYYY-MM-DD')
    .optional(),
});

export type GetTaskFilterSchema = z.infer<typeof getTaskFilterSchema>;
