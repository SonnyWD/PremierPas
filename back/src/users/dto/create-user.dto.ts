import {
  IsString,
  IsDate,
  IsEmail,
  IsObject,
  IsOptional,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  nom: string;

  @ApiProperty({ example: 'Sophie' })
  @IsString()
  @MinLength(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
  prenom: string;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Format attendu : AAAA-MM-JJ',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La date doit être au format AAAA-MM-JJ',
  })
  date_naissance?: string;

  @ApiProperty({ example: 'sophie@example.com' })
  @IsEmail({}, { message: "Format d'email invalide" })
  email: string;

  @ApiProperty({
    example: 'MotDePasse123',
    description:
      'Au moins 8 caractères, une majuscule, une minuscule, un chiffre',
  })
  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
  })
  mot_de_passe: string;

  @ApiPropertyOptional({ example: { garçon: 'Léo', fille: 'Lina' } })
  @IsObject()
  @IsOptional()
  suggested_name: object;

  @ApiPropertyOptional({
    enum: ['femme_enceinte', 'parent', 'autre'],
    example: 'femme_enceinte',
  })
  @IsEnum(['femme_enceinte', 'parent', 'autre'])
  @IsOptional()
  type_profil?: 'femme_enceinte' | 'parent' | 'autre';
}
