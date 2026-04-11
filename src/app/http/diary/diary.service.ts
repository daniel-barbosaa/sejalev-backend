import { Injectable } from '@nestjs/common';
import {
  CreateDiarySchema,
  GetDiaryFilterSchema,
} from 'src/domain/schemas/diary';

import { DiaryRepository } from './diary.repository';

@Injectable()
export class DiaryService {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  create(
    userId: string,
    {
      content,
      date,
      mood,
      workProductive,
      dayWasGood,
      sleptWell,
      keptPromises,
      exercised,
    }: CreateDiarySchema,
  ) {
    const dateFilter = this.normalizedDate(date);

    return this.diaryRepository.upsert({
      where: {
        userId_date: {
          userId,
          date: dateFilter,
        },
      },
      update: {
        content,
        mood,
        workProductive,
        dayWasGood,
        sleptWell,
        keptPromises,
        exercised,
      },
      create: {
        userId,
        date: dateFilter,
        content,
        mood,
        workProductive,
        dayWasGood,
        sleptWell,
        keptPromises,
        exercised,
      },
    });
  }

  findAllByUserId(userId: string, filter: GetDiaryFilterSchema) {
    const { date } = filter;

    if (date) {
      const dateFilter = this.normalizedDate(date);

      return this.diaryRepository.findUnique({
        where: {
          userId_date: { userId, date: dateFilter },
        },
      });
    }

    return this.diaryRepository.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  private normalizedDate(date: string | Date) {
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    return normalizedDate;
  }
}
