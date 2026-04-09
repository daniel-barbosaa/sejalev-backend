import { createZodDto } from 'nestjs-zod';
import {
  createDiarySchema,
  getDiaryFilterSchema,
} from 'src/domain/schemas/diary';

export class CreateDiaryDto extends createZodDto(createDiarySchema) {}

export class GetDiaryFilterDto extends createZodDto(getDiaryFilterSchema) {}
