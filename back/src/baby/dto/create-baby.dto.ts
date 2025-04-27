import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBabyDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: Date;

    @IsNumber()
    @IsNotEmpty()
    pregnancyId: number;  

    @IsNumber()
    @IsOptional()
    size?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsString()
    @IsOptional()
    sleepDuration?: string;

    @IsNumber()
    @IsOptional()
    temperature?: number;
  }
