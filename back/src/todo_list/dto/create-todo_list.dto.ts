import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}