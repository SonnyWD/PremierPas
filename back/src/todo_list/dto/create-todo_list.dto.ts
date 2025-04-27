import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  categorieId: number;
}
