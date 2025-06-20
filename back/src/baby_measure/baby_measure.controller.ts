import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BabyMeasureService } from './baby_measure.service';
import { CreateBabyMeasureDto } from './dto/create-baby_measure.dto';

@Controller('baby-measures')
export class BabyMeasureController {
  constructor(private readonly measureService: BabyMeasureService) {}

  @Post()
  create(@Body() createMeasureDto: CreateBabyMeasureDto) {
    return this.measureService.createMeasure(createMeasureDto);
  }

  @Get('baby/:babyId')
  getAllByBaby(@Param('babyId', ParseIntPipe) babyId: number) {
    return this.measureService.getMeasuresForBaby(babyId);
  }
}
