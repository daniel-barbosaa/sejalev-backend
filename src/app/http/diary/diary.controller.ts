import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/common/decorators/active-user-id.decorator';

import { CreateDiaryDto, UpdateDiaryDto } from './diary.dto';
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
  findAll() {
    return this.diaryService.findAll();
  }

  @Put(':taskId')
  update(
    @ActiveUserId() userId: string,
    @Param('taskId') taskId: string,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ) {
    return this.diaryService.update(userId, taskId, updateDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaryService.remove(+id);
  }
}
