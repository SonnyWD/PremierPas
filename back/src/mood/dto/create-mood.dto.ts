import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateMoodDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsInt()
  @IsNotEmpty()
  durationInHours: number;
}
