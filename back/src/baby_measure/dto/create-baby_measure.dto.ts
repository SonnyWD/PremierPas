import { IsNumber } from "class-validator";

export class CreateBabyMeasureDto {
  @IsNumber()
  babyId: number;

  @IsNumber()
  sizeCm?: number;

  @IsNumber()
  weightKg?: number;

  @IsNumber()
  temperatureC?: number;
}
