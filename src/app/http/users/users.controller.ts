import { Controller, Get, Req } from '@nestjs/common';
import console from 'console';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request: Request & { userId: string }) {
    console.log({ meUserId: request.userId });
    return this.usersService.getUserById('userId');
  }
}
