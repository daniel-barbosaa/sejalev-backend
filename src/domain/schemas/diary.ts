import z from 'zod';

export const MOOD_TYPE = ['GOOD', 'NEUTRAL', 'BAD'] as const;

export const diarySchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  date: z.coerce.date(),
  content: z.string().optional().nullable(),
  mood: z.enum(MOOD_TYPE).default('NEUTRAL'),

  workProductive: z.boolean().default(false),
  dayWasGood: z.boolean().default(false),
  sleptWell: z.boolean().default(false),
  keptPromises: z.boolean().default(false),
  exercised: z.boolean().default(false),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskSchema = z.infer<typeof diarySchema>;

export const createDiarySchema = diarySchema.pick({
  date: true,
  content: true,
  mood: true,
  workProductive: true,
  dayWasGood: true,
  sleptWell: true,
  keptPromises: true,
  exercised: true,
});

export type CreateDiarySchema = z.infer<typeof createDiarySchema>;

export const getDiaryFilterSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato deve ser YYYY-MM-DD')
    .optional(),
});

export type GetDiaryFilterSchema = z.infer<typeof getDiaryFilterSchema>;
