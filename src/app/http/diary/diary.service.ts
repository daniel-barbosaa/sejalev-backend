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
    const existingDiary = await this.diaryRepository.findFirst({
      where: { userId, date },
    });

    if (existingDiary) {
      throw new ConflictException('Você já registrou um diário para este dia.');
    }

    return this.diaryRepository.create({
      data: {
        userId,
        content,
        date,
        mood,
      },
    });
  }

  findAllByUserId(userId: string, filter: GetDiaryFilterSchema) {
    const { date } = filter;

    const dateFilter = date ? new Date(date) : undefined;

    return this.diaryRepository.findMany({
      where: {
        userId,
        date: dateFilter,
      },
    });
  }

  async update(
    userId: string,
    diaryId: string,
    { content, date, mood }: UpdateDiaryDto,
  ) {
    await this.validateTaskOwnerShip(userId, diaryId);

    return this.diaryRepository.update({
      where: {
        userId,
        id: diaryId,
      },
      data: {
        content,
        date,
        mood,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} diary`;
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
