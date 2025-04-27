import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAppointmentTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)  
  title: string;

  @IsString()
  @Length(3, 500)  
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100) 
  name: string;
}