import { Module } from '@nestjs/common';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from './entities/mood.entity';
import { User } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Mood, User])],
  controllers: [MoodController],
  providers: [MoodService],
  exports: [TypeOrmModule, MoodService]
})
export class MoodModule {}
