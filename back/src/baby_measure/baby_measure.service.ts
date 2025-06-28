import { InjectRepository } from '@nestjs/typeorm';
import { CreateBabyMeasureDto } from './dto/create-baby_measure.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BabyMeasure } from './entities/baby_measure.entity';
import { Baby } from '../baby/entities/baby.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BabyMeasureService {
  constructor(
    @InjectRepository(BabyMeasure)
    private measureRepo: Repository<BabyMeasure>,

    @InjectRepository(Baby)
    private babyRepo: Repository<Baby>,
  ) {}

  async createMeasure(dto: CreateBabyMeasureDto) {
    const baby = await this.babyRepo.findOne({ where: { id: dto.babyId } });
    if (!baby) throw new NotFoundException('Bébé non trouvé');

    const measure = this.measureRepo.create({ ...dto, baby });
    await this.measureRepo.save(measure);

    return { message: 'Mesure enregistrée', data: measure };
  }

  async getMeasuresForBaby(babyId: number) {
    return this.measureRepo.find({
      where: { baby: { id: babyId } },
    });
  }
}
