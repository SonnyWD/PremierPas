import { IsDate, IsNumber } from 'class-validator';

export class CreateBabyDailyDto {
  @IsNumber()
  babyId: number;

  @IsNumber()
  sleepDurationHours?: number;

  @IsDate()
  lastFeed?: Date;
}
