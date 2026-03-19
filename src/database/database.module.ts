import { Global, Module } from '@nestjs/common';
import { TasksReporitory } from 'src/app/http/tasks/tasks.reporitory';
import { UsersRepository } from 'src/app/http/users/users.repository';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, TasksReporitory],
  exports: [UsersRepository, TasksReporitory],
})
export class DatabaseModule {}
