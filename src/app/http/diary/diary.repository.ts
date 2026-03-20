import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DiaryRepository {
  constructor(private prismaService: PrismaService) {}

  create(createDto: Prisma.DiaryCreateArgs) {
    return this.prismaService.diary.create(createDto);
  }

  findFirst(findFirstDto: Prisma.DiaryFindFirstArgs) {
    return this.prismaService.diary.findFirst(findFirstDto);
  }
  update(updateDto: Prisma.DiaryUpdateArgs) {
    return this.prismaService.diary.update(updateDto);
  }
}
