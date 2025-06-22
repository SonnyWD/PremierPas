import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBabyDto } from './dto/create-baby.dto';
import { UpdateBabyDto } from './dto/update-baby.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Baby } from './entities/baby.entity';
import { Pregnancy, PregnancyStatus } from '../pregnancy/entities/pregnancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BabyService {
  constructor(
    @InjectRepository(Baby)
    private readonly babyRepository: Repository<Baby>,

    @InjectRepository(Pregnancy)
    private readonly pregnancyRepository: Repository<Pregnancy>,
  ) {}

  async createBaby(createBabyDto: CreateBabyDto) {
    const { firstName, birthDate, pregnancyId} = createBabyDto;

   
    const pregnancy = await this.pregnancyRepository.findOne({ where: { id: pregnancyId } });
    if (!pregnancy) {
      throw new NotFoundException("Grossesse non trouvée.");
    }

    const existingBaby = await this.babyRepository.findOne({
      where: { pregnancy: { id: pregnancyId } }
    });

    if (existingBaby) {
      throw new BadRequestException('Un bébé est déjà associé à cette grossesse.');
    }

    const baby = this.babyRepository.create({
      firstName,
      pregnancy,  
    });

    if (birthDate) {
      baby.birthDate = new Date(birthDate);
    }
    await this.babyRepository.save(baby);

    return { message: "Bébé créé avec succès." };
  }

  async findBabyByUserId(userId: number): Promise<Baby> {
    const activePregnancy = await this.pregnancyRepository.findOne({
      where: { user: { id: userId }, status: PregnancyStatus.IN_PROGRESS },
    });

    if (!activePregnancy) {
      throw new NotFoundException(`Aucune grossesse active trouvée pour l'utilisateur ${userId}`);
    }

    const baby = await this.babyRepository.findOne({
      where: { pregnancy: { id: activePregnancy.id } },
      relations: ['pregnancy', 'measures'],
    });

    if (!baby) {
      throw new NotFoundException(`Aucun bébé trouvé pour la grossesse ${activePregnancy.id}`);
    }

    return baby;
  }
  
  async findAllBabies(): Promise<Baby[]> {
    return await this.babyRepository.find({ relations: ['pregnancy'] })
  }

  async findOneBaby(id: number): Promise<Baby> {
    const baby = await this.babyRepository.findOne({
      where: { id },
      relations: ['measures', 'daily']
    });

    if(!baby) {
      throw new NotFoundException(`Le bébé avec l'ID ${id} n'a pas été trouvé.`)
    }

    return baby;
  }

  async updateBaby(id: number, updateBaby: UpdateBabyDto): Promise<Baby> {
    const baby = await this.babyRepository.findOne({
      where: { id }
    });

    if(!baby) {
      throw new NotFoundException(`Le bébé avec l'ID ${id} n'a pas été trouvé.`)
    }

    if(Object.keys(updateBaby).length === 0) {
      throw new BadRequestException(`Aucune donnée à mettre à jour`)
    };

    Object.assign(baby, updateBaby);

    const updatedBaby = await this.babyRepository.save(baby);

    return updatedBaby;
  }

  async removeBaby(id: number): Promise<Baby> {
    const baby = await this.babyRepository.findOne({
      where: { id }
    });

    if(!baby) {
      throw new NotFoundException(`Le bébé avec l'ID ${id} n'a pas été trouvé.`)
    };

    await this.babyRepository.remove(baby);

    return baby;
  }
}
