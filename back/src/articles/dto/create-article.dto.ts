import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  creationDate: Date;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
