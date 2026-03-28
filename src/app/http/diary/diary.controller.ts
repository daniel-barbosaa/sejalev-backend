import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/common/decorators/active-user-id.decorator';

import { CreateDiaryDto, GetDiaryFilterDto, UpdateDiaryDto } from './diary.dto';
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

  @Put(':diaryId')
  update(
    @ActiveUserId() userId: string,
    @Param('diaryId', ParseUUIDPipe) diaryId: string,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ) {
    return this.diaryService.update(userId, diaryId, updateDiaryDto);
  }
}
