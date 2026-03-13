import { z } from 'zod';

export const accessTokenPayloadSchema = z.object({
  sub: z.string(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type AccessTokenPayloadType = z.infer<typeof accessTokenPayloadSchema>;
