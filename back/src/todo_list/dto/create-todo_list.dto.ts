import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoListDto {
  @ApiProperty({
    example: 'Préparer la valise maternité',
    maxLength: 255,
    description: 'Titre de la liste de tâches à créer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    example: 'Ne pas oublier les vêtements pour bébé',
    description: 'Description facultative de la liste',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
