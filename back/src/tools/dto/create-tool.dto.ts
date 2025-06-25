import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateToolDto {
  @ApiProperty({ example: "Alimentation", description: "Nom de l'outil" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "Conseils sur l’alimentation du bébé", description: "Description de l’outil" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "baby-bottle", description: "Nom de l’icône associée (ex: Material Icon, Feather…)" })
  @IsString()
  @IsNotEmpty()
  iconName: string;

  @ApiProperty({ example: "/tools/feed", description: "Chemin de navigation associé à l’outil dans le front-end" })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: "bébé, repas, lait, allaitement", description: "Mots-clés liés à l’outil pour le filtrage" })
  @IsString()
  @IsNotEmpty()
  keywords: string;
}
