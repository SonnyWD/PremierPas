import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikePublicationDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number; 

    @IsNumber()
    @IsNotEmpty()
    publicationId: number;
}
