import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  // Database
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string().min(1),
  DATABASE_URL: z.string(),

  // Secrets
  JWT_SECRET: z.string().min(1),

  // Google API
  GOOGLE_BOOKS_API_KEY: z.string().min(1),
});

const _env = envSchema.parse(process.env);

export const env = {
  jwtSecret: _env.JWT_SECRET,
  googleBooksApíKey: _env.GOOGLE_BOOKS_API_KEY,
};
