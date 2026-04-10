import { createZodDto } from 'nestjs-zod';
import { createBookSchema, getBookFilterSchema } from 'src/domain/schemas/book';

export class CreateBookDto extends createZodDto(createBookSchema) {}

export class GetBookFilterDto extends createZodDto(getBookFilterSchema) {}
