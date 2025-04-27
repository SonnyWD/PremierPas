import { IsEmail, IsString } from 'class-validator'

export class LoginUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    mot_de_passe: string;
  }
  