import { createZodDto } from 'nestjs-zod';
import {
  createDiarySchema,
  getDiaryFilterSchema,
  updateDiarySchema,
} from 'src/domain/schemas/diary';

export class CreateDiaryDto extends createZodDto(createDiarySchema) {}
export class UpdateDiaryDto extends createZodDto(updateDiarySchema) {}

export class GetDiaryFilterDto extends createZodDto(getDiaryFilterSchema) {}
