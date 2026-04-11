import z from 'zod';

export const STATUS_TYPE = ['WANT_TO_READ', 'READ', 'READING'] as const;
export type BookStatus = (typeof STATUS_TYPE)[number];

export const bookSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  externalId: z.string(),
  title: z.string(),
  author: z.string().optional(),
  thumbnail: z.string(),
  status: z.enum(STATUS_TYPE).default('WANT_TO_READ'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BookSchema = z.infer<typeof bookSchema>;

export const createBookSchema = bookSchema.pick({
  externalId: true,
  title: true,
  author: true,
  thumbnail: true,
  status: true,
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;

export const getBookFilterSchema = z.object({
  search: z.string(),
});

export type GetBookFilterSchema = z.infer<typeof getBookFilterSchema>;
