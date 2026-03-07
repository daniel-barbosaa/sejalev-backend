import { Global, Module } from '@nestjs/common';
import { UsersRepository } from 'src/app/http/users/users.repository';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
