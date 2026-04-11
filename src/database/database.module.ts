import { Global, Module } from '@nestjs/common';
import { BooksRepository } from 'src/app/http/books/books.repository';
import { DiaryRepository } from 'src/app/http/diary/diary.repository';
import { TasksReporitory } from 'src/app/http/tasks/tasks.reporitory';
import { UsersRepository } from 'src/app/http/users/users.repository';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    TasksReporitory,
    DiaryRepository,
    BooksRepository,
  ],
  exports: [UsersRepository, TasksReporitory, DiaryRepository, BooksRepository],
})
export class DatabaseModule {}
