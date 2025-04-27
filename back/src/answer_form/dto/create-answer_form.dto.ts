import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnswerFormDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    reason: string;
}
