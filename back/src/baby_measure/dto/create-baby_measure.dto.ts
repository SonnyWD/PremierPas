import { IsNumber, IsOptional } from "class-validator";

export class CreateBabyMeasureDto {
  @IsNumber()
  babyId: number;

  @IsNumber()
  @IsOptional()
  sizeCm?: number;

  @IsNumber()
  @IsOptional()
  weightKg?: number;

  @IsNumber()
  @IsOptional()
  temperatureC?: number;
}
