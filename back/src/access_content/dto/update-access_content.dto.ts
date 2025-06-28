import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessContentDto } from './create-access_content.dto';

export class UpdateAccessContentDto extends PartialType(
  CreateAccessContentDto,
) {}
