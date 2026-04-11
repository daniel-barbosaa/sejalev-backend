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
  findFirst(findFirstDto: Prisma.BooksFindFirstArgs) {
    return this.prismaService.books.findFirst(findFirstDto);
  }
  delete(deleteDto: Prisma.BooksDeleteArgs) {
    return this.prismaService.books.delete(deleteDto);
  }
}
