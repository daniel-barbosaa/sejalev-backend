import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ActiveUserId } from 'src/common/decorators/active-user-id.decorator';

import { CreateDiaryDto, GetDiaryFilterDto } from './diary.dto';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    return this.diaryService.create(userId, createDiaryDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string, @Query() query: GetDiaryFilterDto) {
    return this.diaryService.findAllByUserId(userId, query);
  }
}
