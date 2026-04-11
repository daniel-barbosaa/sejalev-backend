import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/common/decorators/active-user-id.decorator';

import { CreateBookDto, GetBookFilterDto } from './books.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('search')
  search(@ActiveUserId() userId: string, @Query() query: GetBookFilterDto) {
    return this.booksService.searchExternalBooks(userId, query);
  }

  @Get()
  findAll(@ActiveUserId() userId: string, @Query() query: GetBookFilterDto) {
    return this.booksService.findAllByUserId(userId, query);
  }

  @Post()
  addToLibrary(
    @ActiveUserId() userId: string,
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.booksService.addToLibrary(userId, createBookDto);
  }

  @Delete(':bookId')
  remove(@ActiveUserId() userId: string, @Param('bookId') bookId: string) {
    return this.booksService.remove(userId, bookId);
  }
}
