import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSponsorshipDto {
  @IsString()
  @IsNotEmpty()
  referralCode: string;
}
