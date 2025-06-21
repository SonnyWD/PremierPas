import { Module } from '@nestjs/common';
import { MediaBabyService } from './media_baby.service';
import { MediaBabyController } from './media_baby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaBaby } from './entities/media_baby.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaBaby, User])],
  controllers: [MediaBabyController],
  providers: [MediaBabyService],
  exports: [TypeOrmModule, MediaBabyService]
})
export class MediaBabyModule {}
