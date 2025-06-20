import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTodoListDto } from './create-todo_list.dto';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}