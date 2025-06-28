import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
