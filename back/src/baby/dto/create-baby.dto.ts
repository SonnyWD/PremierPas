import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBabyDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @IsNumber()
    @IsNotEmpty()
    pregnancyId: number;  

    @IsString()
    @IsOptional()
    gender: string;
  }
