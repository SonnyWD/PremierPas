import { PartialType } from '@nestjs/mapped-types';
import { CreateBabyDailyDto } from './create-baby_daily.dto';

export class UpdateBabyDailyDto extends PartialType(CreateBabyDailyDto) {}
