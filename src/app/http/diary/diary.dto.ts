import { createZodDto } from 'nestjs-zod';
import { createDiarySchema, updateDiarySchema } from 'src/domain/schemas/diary';

export class CreateDiaryDto extends createZodDto(createDiarySchema) {}
export class UpdateDiaryDto extends createZodDto(updateDiarySchema) {}
