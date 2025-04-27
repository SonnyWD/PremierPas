import { PartialType } from '@nestjs/mapped-types';
import { CreateListeCategorieDto } from './create-liste_categorie.dto';

export class UpdateListeCategorieDto extends PartialType(CreateListeCategorieDto) {}
