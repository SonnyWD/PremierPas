import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BabyDailyService } from './baby_daily.service';
import { CreateBabyDailyDto } from './dto/create-baby_daily.dto';

@Controller('baby-daily')
export class BabyDailyController {
  constructor(private readonly babyDailyService: BabyDailyService) {}

  @Post()
  createDailyEntry(@Body() dto: CreateBabyDailyDto) {
    return this.babyDailyService.createDailyData(dto);
  }

  @Get(':babyId')
  getAllDailyDataForBaby(@Param('babyId', ParseIntPipe) babyId: number) {
    return this.babyDailyService.getDailyDataForBaby(babyId);
  }
}
