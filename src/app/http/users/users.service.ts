import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserSchema } from 'src/domain/schemas/user';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create({ name, email, password }: CreateUserSchema) {
    const emailTaken = await this.usersRepository.findByEmail({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('Esse email já está em uso.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
