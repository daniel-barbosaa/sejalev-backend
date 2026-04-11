import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BooksRepository {
  constructor(private prismaService: PrismaService) {}

  upsert(upsertDto: Prisma.BooksUpsertArgs) {
    return this.prismaService.books.upsert(upsertDto);
  }
  findMany(findManyDto: Prisma.BooksFindManyArgs) {
    return this.prismaService.books.findMany(findManyDto);
  }
}
