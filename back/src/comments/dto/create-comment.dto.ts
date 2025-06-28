import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  publicationId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'Le contenu ne peut pas être vide ou uniquement des espaces.',
  })
  content: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;
}
