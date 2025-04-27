import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PregnancyStatus } from "../entities/pregnancy.entity";

export class CreatePregnancyDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsDateString()
    @IsOptional()
    startDate?: Date;

    @IsDateString()
    @IsOptional()
    dueDate?: Date;

    @IsEnum(PregnancyStatus)
    @IsNotEmpty()
    status: PregnancyStatus;
}
