import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerFormDto } from './create-answer_form.dto';

export class UpdateAnswerFormDto extends PartialType(CreateAnswerFormDto) {}
