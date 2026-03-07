import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
