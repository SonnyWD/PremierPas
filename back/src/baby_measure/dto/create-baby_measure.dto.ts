import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBabyMeasureDto {
  @ApiProperty({
    example: 12,
    description: "ID du bébé concerné par la mesure"
  })
  @IsNumber()
  babyId: number;

  @ApiPropertyOptional({
    example: 48.5,
    description: "Taille du bébé en centimètres"
  })
  @IsNumber()
  @IsOptional()
  sizeCm?: number;

  @ApiPropertyOptional({
    example: 3.2,
    description: "Poids du bébé en kilogrammes"
  })
  @IsNumber()
  @IsOptional()
  weightKg?: number;

  @ApiPropertyOptional({
    example: 36.7,
    description: "Température corporelle du bébé en °C"
  })
  @IsNumber()
  @IsOptional()
  temperatureC?: number;
}
