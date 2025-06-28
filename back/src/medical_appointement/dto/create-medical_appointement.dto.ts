import {
  IsISO8601,
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateMedicalAppointementDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  pregnancyId?: number;

  @IsNumber()
  @IsOptional()
  babyId?: number;

  @IsNumber()
  @IsNotEmpty()
  appointementTypeId: number;
}
