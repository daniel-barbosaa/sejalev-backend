import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksReporitory {
  constructor(private prismaService: PrismaService) {}

  create(createDto: Prisma.TaskCreateArgs) {
    return this.prismaService.task.create(createDto);
  }
  findMany(findManyDto: Prisma.TaskFindManyArgs) {
    return this.prismaService.task.findMany(findManyDto);
  }
  findFirst(findFirstDto: Prisma.TaskFindFirstArgs) {
    return this.prismaService.task.findFirst(findFirstDto);
  }
  update(updateDto: Prisma.TaskUpdateArgs) {
    return this.prismaService.task.update(updateDto);
  }
  delete(deleteDto: Prisma.TaskDeleteArgs) {
    return this.prismaService.task.delete(deleteDto);
  }
}
