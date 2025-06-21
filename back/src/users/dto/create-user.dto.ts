import { IsString, IsDate, IsEmail, IsObject, IsOptional, MinLength, Matches, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsString()
    id: string;

    @IsString()
    @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    nom: string;

    @IsString()
    @MinLength(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
    prenom: string;

    @IsDate()
    date_naissance: Date;

    @IsEmail({}, { message: 'Format d\'email invalide' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
    })
    mot_de_passe: string;

    @IsObject()
    @IsOptional()
    suggested_name: object;

    @IsEnum(['femme_enceinte', 'parent', 'autre'])
    @IsOptional()
    type_profil?: 'femme_enceinte' | 'parent' | 'autre';
}
