import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalAppointementDto } from './create-medical_appointement.dto';

export class UpdateMedicalAppointementDto extends PartialType(
  CreateMedicalAppointementDto,
) {}
