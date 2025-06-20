import { PartialType } from '@nestjs/mapped-types';
import { CreateBabyMeasureDto } from './create-baby_measure.dto';

export class UpdateBabyMeasureDto extends PartialType(CreateBabyMeasureDto) {}
