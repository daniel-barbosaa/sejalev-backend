import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3),
  email: z.email().nonempty().max(255),
  password: z.string().min(8).max(255),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type UserSchema = z.infer<typeof userSchema>;
