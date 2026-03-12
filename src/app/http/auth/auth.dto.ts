import { createZodDto } from 'nestjs-zod';
import { signInSchema } from 'src/domain/schemas/auth';

export class SignInDto extends createZodDto(signInSchema) {}
