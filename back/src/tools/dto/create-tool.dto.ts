import { IsNotEmpty, IsString } from "class-validator";

export class CreateToolDto {
      @IsString()
      @IsNotEmpty()
      title: string;
    
      @IsString()
      @IsNotEmpty()
      description: string;
    
      @IsString()
      @IsNotEmpty()
      iconName: string;

      @IsString()
      @IsNotEmpty()
      path: string;
}
