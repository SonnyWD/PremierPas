import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBabyDailyDto} from './dto/create-baby_daily.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BabyDaily } from './entities/baby_daily.entity';
import { Baby } from 'src/baby/entities/baby.entity';

@Injectable()
export class BabyDailyService {
  constructor(
    @InjectRepository(BabyDaily)
    private dailyRepo: Repository<BabyDaily>,

    @InjectRepository(Baby)
    private babyRepo: Repository<Baby>,
  ) {}

  async createDailyData(dto: CreateBabyDailyDto) {
    const baby = await this.babyRepo.findOne({ where: { id: dto.babyId } });
    if (!baby) throw new NotFoundException("Bébé non trouvé");

    const daily = this.dailyRepo.create({ ...dto, baby });
    await this.dailyRepo.save(daily);

    return { message: 'Données journalières enregistrées', data: daily };
  }

  async getDailyDataForBaby(babyId: number) {
    return this.dailyRepo.find({
      where: { baby: { id: babyId } }
    });
  }
}

