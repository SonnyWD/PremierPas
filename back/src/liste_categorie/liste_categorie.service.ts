import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListeCategorieDto } from './dto/create-liste_categorie.dto';
import { UpdateListeCategorieDto } from './dto/update-liste_categorie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListeCategorie } from './entities/liste_categorie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { isOwnerOrAdmin } from 'src/permissions.util';

@Injectable()
export class ListeCategorieService {
  constructor(
    @InjectRepository(ListeCategorie)
    private readonly categorieRepository: Repository<ListeCategorie>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCategorie(createCategorieDto: CreateListeCategorieDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const categorie = this.categorieRepository.create({
      title: createCategorieDto.title,
      suggestion: createCategorieDto.suggestion,
      user,
    });

    return await this.categorieRepository.save(categorie);
  }


  async findAllCategories(): Promise<ListeCategorie[]> {
    return await this.categorieRepository.find()
  }

  async findOneCategorie(categorieId: number): Promise<ListeCategorie> {
    const existingCategorie = await this.categorieRepository.findOne({
      where: { id: categorieId }
    });

    if(!existingCategorie){
      throw new NotFoundException('Catégorie non trouvée.');
    }

    return existingCategorie;
  }

 async updateCategorie(categorieId: number,
  updateListeCategorieDto: UpdateListeCategorieDto,
  userId: number,
  userRole: string) {
    const existingCategorie = await this.categorieRepository.findOne({
      where: { id: categorieId },
      relations: ['user']
    });

    if(!existingCategorie){
      throw new NotFoundException('Catégorie non trouvée.');
    }
    if (!isOwnerOrAdmin(existingCategorie.user.id, userId, userRole)) {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier cette catégorie");
    }

    Object.assign(existingCategorie, updateListeCategorieDto);

    return await this.categorieRepository.save(existingCategorie);
  }

 async removeCategorie(categorieId: number,userId: number, userRole: string) {
    const existingCategorie = await this.categorieRepository.findOne({
      where: { id: categorieId },
      relations: ['user']
    });

    if(!existingCategorie){
      throw new NotFoundException('Catégorie non trouvée.');
    }

    if (!isOwnerOrAdmin(existingCategorie.user.id, userId, userRole)) {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier cette catégorie");
    }

    await this.categorieRepository.remove(existingCategorie);

    return { message: `Catégorie supprimé avec succès`};
  }
}
