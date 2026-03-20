import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDiaryDto, UpdateDiaryDto } from './diary.dto';
import { DiaryRepository } from './diary.repository';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  create(userId: string, { content, date, mood }: CreateDiaryDto) {
    return this.diaryRepository.create({
      data: {
        userId,
        content,
        date,
        mood,
      },
    });
  }

  findAll() {
    return `This action returns all diary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diary`;
  }

  async update(
    userId: string,
    taskId: string,
    { content, date, mood }: UpdateDiaryDto,
  ) {
    await this.validateTaskOwnerShip(userId, taskId);

    return this.diaryRepository.update({
      where: {
        userId,
        id: taskId,
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
