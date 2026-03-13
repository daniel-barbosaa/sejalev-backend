import { createZodDto } from 'nestjs-zod';
import { signInSchema, signUpSchema } from 'src/domain/schemas/auth';

export class SigninDto extends createZodDto(signInSchema) {}
export class SignupDto extends createZodDto(signUpSchema) {}
