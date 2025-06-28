import { PartialType } from '@nestjs/mapped-types';
import { CreateLikePublicationDto } from './create-like_publication.dto';

export class UpdateLikePublicationDto extends PartialType(
  CreateLikePublicationDto,
) {}
