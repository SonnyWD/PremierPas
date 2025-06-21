import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Mood } from './entities/mood.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood)
    private readonly moodRepository: Repository<Mood>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async setMood(userId: number, type: string, description: string, startDate: Date, durationInHours: number): Promise<Mood> {
    const user = await this.userRepository.findOne({ where: { id: userId}});

    if(!user){
      throw new NotFoundException("Utilisateur non trouvé.")
    }

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + durationInHours);

    const newMood = this.moodRepository.create({
      user,
      type,
      description,
      startDate,
      endDate
    });

    return this.moodRepository.save(newMood);
  }


  async findAllMoods(): Promise<Mood[]> {
    return await this.moodRepository.find()
  }

  async findOneMood(id: number): Promise<Mood> {
    const existingMood = await this.moodRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  
    if (!existingMood) {
      throw new NotFoundException(`Aucun mood trouvé.`);
    }
  
    return existingMood;
  }

  async updateMood(id: number, updateMoodDto: UpdateMoodDto): Promise<Mood> {
    const existingMood = await this.moodRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if(!existingMood){
      throw new NotFoundException(`Aucun mood trouvé.`)
    };

    Object.assign(existingMood, updateMoodDto)

    return this.moodRepository.save(existingMood)
  }

  async removeMood(id: number): Promise<{ message: string }> {
    const existingMood = await this.moodRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if(!existingMood){
      throw new NotFoundException(`Aucun mood trouvé.`)
    };

    await this.moodRepository.remove(existingMood);
    return { message: 'Mood supprimé avec succès.' };
  }
}
