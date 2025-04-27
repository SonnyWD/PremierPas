import { Module } from '@nestjs/common';
import { ListeCategorieService } from './liste_categorie.service';
import { ListeCategorieController } from './liste_categorie.controller';
import { ListeCategorie } from './entities/liste_categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListeCategorie, User])],
  controllers: [ListeCategorieController],
  providers: [ListeCategorieService],
  exports: [TypeOrmModule, ListeCategorieService]
})
export class ListeCategorieModule {}
