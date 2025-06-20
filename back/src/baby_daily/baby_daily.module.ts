import { Module } from '@nestjs/common';
import { BabyDailyService } from './baby_daily.service';
import { BabyDailyController } from './baby_daily.controller';
import { BabyDaily } from './entities/baby_daily.entity';
import { Baby } from 'src/baby/entities/baby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BabyDaily, Baby])],
  controllers: [BabyDailyController],
  providers: [BabyDailyService],
})
export class BabyDailyModule {}
