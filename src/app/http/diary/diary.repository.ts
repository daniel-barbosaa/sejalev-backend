import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DiaryRepository {
  constructor(private prismaService: PrismaService) {}

  upsert(upsertDto: Prisma.DiaryUpsertArgs) {
    return this.prismaService.diary.upsert(upsertDto);
  }

  findMany(findManyDto: Prisma.DiaryFindManyArgs) {
    return this.prismaService.diary.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.DiaryFindUniqueArgs) {
    return this.prismaService.diary.findUnique(findUniqueDto);
  }
}
