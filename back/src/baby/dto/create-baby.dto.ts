import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBabyDto {
  @ApiPropertyOptional({
    example: 'Léo',
    description: 'Prénom du bébé (optionnel à la création)'
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    example: '2025-06-20',
    description: 'Date de naissance du bébé (format ISO)'
  })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    example: 5,
    description: "ID de la grossesse associée (obligatoire)"
  })
  @IsNumber()
  @IsNotEmpty()
  pregnancyId: number;

  @ApiPropertyOptional({
    example: 'fille',
    description: "Genre du bébé (optionnel à la création, ex: 'fille', 'garçon')"
  })
  @IsString()
  @IsOptional()
  gender: string;
}
