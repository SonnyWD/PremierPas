import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaBabyDto {
  @IsString()
  @IsNotEmpty()
  typeMedia: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
