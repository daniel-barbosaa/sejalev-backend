import z from 'zod';

export const MOOD_TYPE = ['GOOD', 'NEUTRAL', 'BAD'] as const;

export const diarySchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  date: z.coerce.date(),
  content: z.string().min(20),
  mood: z.enum(MOOD_TYPE),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskSchema = z.infer<typeof diarySchema>;

export const createDiarySchema = diarySchema.pick({
  date: true,
  content: true,
  mood: true,
});

export type CreateDiarySchema = z.infer<typeof diarySchema>;

export const updateDiarySchema = diarySchema.pick({
  date: true,
  content: true,
  mood: true,
});

export type UpdateDiarySchema = z.infer<typeof diarySchema>;
