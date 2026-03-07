import { createZodDto } from 'nestjs-zod';
import { createUserSchema } from 'src/domain/schemas/user';

export class CreateUserDto extends createZodDto(createUserSchema) {}
