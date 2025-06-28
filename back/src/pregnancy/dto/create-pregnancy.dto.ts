import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PregnancyStatus } from '../entities/pregnancy.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePregnancyDto {
  @ApiPropertyOptional({
    example: '2025-06-01',
    description: 'Date de début de grossesse (format ISO : AAAA-MM-JJ)',
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    example: '2026-03-01',
    description: 'Date prévue d’accouchement (format ISO)',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({
    enum: PregnancyStatus,
    description: 'Statut de la grossesse (ex: IN_PROGRESS, COMPLETED, etc.)',
    example: PregnancyStatus.IN_PROGRESS,
  })
  @IsEnum(PregnancyStatus)
  @IsOptional()
  status?: PregnancyStatus;
}
