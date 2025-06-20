import { Module } from '@nestjs/common';
import { BabyMeasureService } from './baby_measure.service';
import { BabyMeasureController } from './baby_measure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyMeasure } from './entities/baby_measure.entity';
import { Baby } from 'src/baby/entities/baby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BabyMeasure, Baby])],
  controllers: [BabyMeasureController],
  providers: [BabyMeasureService],
})
export class BabyMeasureModule {}

