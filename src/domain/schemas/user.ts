import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserSchema = z.infer<typeof userSchema>;
