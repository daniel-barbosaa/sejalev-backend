import { Global, Module } from '@nestjs/common';
import { DiaryRepository } from 'src/app/http/diary/diary.repository';
import { TasksReporitory } from 'src/app/http/tasks/tasks.reporitory';
import { UsersRepository } from 'src/app/http/users/users.repository';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, TasksReporitory, DiaryRepository],
  exports: [UsersRepository, TasksReporitory, DiaryRepository],
})
export class DatabaseModule {}
