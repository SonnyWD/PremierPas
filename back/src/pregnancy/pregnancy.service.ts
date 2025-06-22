import { CreatePregnancyDto } from './dto/create-pregnancy.dto';
import { UpdatePregnancyDto } from './dto/update-pregnancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Pregnancy } from './entities/pregnancy.entity';
import { Repository } from 'typeorm';
import { PregnancyStatus } from './entities/pregnancy.entity';

@Injectable()
export class PregnancyService {
  constructor(
    @InjectRepository(Pregnancy)
    private pregnancyRepository : Repository<Pregnancy>){}
  
  async create(userId: number, createPregnancyDto: CreatePregnancyDto){
    const existingPregnancy = await this.pregnancyRepository.findOne({
      where: { user: { id: userId }, status: PregnancyStatus.IN_PROGRESS },
      relations: ['user'],
    });
    
    if(existingPregnancy){
      throw new BadRequestException(`Vous avez déjà une grossesse en cours.`)
    }

    const newPregnancy = this.pregnancyRepository.create({...createPregnancyDto, user: { id: userId }})
    return await this.pregnancyRepository.save(newPregnancy);
  }

async updatePregnancy(userId: number, pregnancyId: number, updatePregnancyDto: UpdatePregnancyDto){
  const pregnancy = await this.findPregnancy(pregnancyId, userId)

  const updatedPregnancy = this.pregnancyRepository.merge(pregnancy, updatePregnancyDto);
  return await this.pregnancyRepository.save(updatedPregnancy); 
 }

 async deletePregnancy(userId: number, pregnancyId: number){
  const pregnancy = await this.findPregnancy(pregnancyId, userId);
  await this.pregnancyRepository.remove(pregnancy);
  return { message: 'Grossesse supprimée avec succès.' };
 }

   async findAllPregnancies(userId: number): Promise<Pregnancy[]> {
    return await this.pregnancyRepository.find({
      where: { user: { id: userId }},
      relations: ['user']
    })
  }

  async findOnePregnancy(userId: number, pregnancyId: number): Promise<Pregnancy> {
    return await this.findPregnancy(userId, pregnancyId);
  }

  async findActivePregnancy(userId: number) {
    return await this.pregnancyRepository.findOne({
      where: {
        user: { id: userId },
        status: PregnancyStatus.IN_PROGRESS,
      },
    });
  }

  private async findPregnancy(userId: number, pregnancyId: number) {
    const pregnancy = await this.pregnancyRepository.findOne({
      where: { id: pregnancyId },
      relations: ['user'],
    });

    if (!pregnancy || pregnancy.user.id !== userId) {
      throw new NotFoundException(`Aucune grossesse trouvée avec l'ID ${pregnancyId} pour cet utilisateur.`);
    }

    return pregnancy;
  }
}

