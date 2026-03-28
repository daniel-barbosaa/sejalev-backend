import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetDiaryFilterSchema } from 'src/domain/schemas/diary';

import { CreateDiaryDto, UpdateDiaryDto } from './diary.dto';
import { DiaryRepository } from './diary.repository';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}

  async create(userId: string, { content, date, mood }: CreateDiaryDto) {
    const dateFilter = date ? new Date(date) : new Date();

    dateFilter.setDate(dateFilter.getDate() - 1);

    const existingDiary = await this.diaryRepository.findFirst({
      where: { userId, date: dateFilter },
    });

    if (existingDiary) {
      throw new ConflictException('Você já registrou um diário para este dia.');
    }

    return this.diaryRepository.create({
      data: {
        userId,
        content,
        date: dateFilter,
        mood,
      },
    });
  }

  findAllByUserId(userId: string, filter: GetDiaryFilterSchema) {
    const { date } = filter;

    if (date) {
      return this.diaryRepository.findUnique({
        where: {
          userId_date: {
            userId,
            date: new Date(date),
          },
        },
      });
    }

    return this.diaryRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    diaryId: string,
    { content, mood }: UpdateDiaryDto,
  ) {
    await this.validateTaskOwnerShip(userId, diaryId);

    return this.diaryRepository.update({
      where: {
        userId,
        id: diaryId,
      },
      data: {
        content,
        mood,
      },
    });
  }

  private async validateTaskOwnerShip(
    userId: string,
    diaryId: string,
  ): Promise<boolean> {
    const isOwner = await this.diaryRepository.findFirst({
      where: { id: diaryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Tarefa não encontrada.');
    }
    return true;
  }
}
