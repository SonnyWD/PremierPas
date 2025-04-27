import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaBabyDto } from './create-media_baby.dto';

export class UpdateMediaBabyDto extends PartialType(CreateMediaBabyDto) {}
