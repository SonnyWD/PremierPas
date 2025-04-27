import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeCommentDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number; 

    @IsNumber()
    @IsNotEmpty()
    commentId: number;
}
