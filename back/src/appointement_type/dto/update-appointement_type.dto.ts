import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateAppointementTypeDto {
  @IsString()
  @IsOptional() 
  @Length(3, 255)
  title?: string;

  @IsString()
  @IsOptional() 
  @Length(3, 500)
  description?: string;

  @IsString()
  @IsOptional()  
  @Length(3, 100)
  name?: string;
}
