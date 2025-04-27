import { Module } from '@nestjs/common';
import { BabyService } from './baby.service';
import { BabyController } from './baby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baby } from './entities/baby.entity';
import { Pregnancy } from 'src/pregnancy/entities/pregnancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Baby, Pregnancy])],
  controllers: [BabyController],
  providers: [BabyService],
  exports: [TypeOrmModule, BabyService]
})
export class BabyModule {}
