import { IsNotEmpty, IsString } from "class-validator";

export class CreateListeCategorieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    suggestion: string;
}
