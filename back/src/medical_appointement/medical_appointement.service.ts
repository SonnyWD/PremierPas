import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMedicalAppointementDto } from './dto/create-medical_appointement.dto';
import { UpdateMedicalAppointementDto } from './dto/update-medical_appointement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalAppointement } from './entities/medical_appointement.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Pregnancy } from 'src/pregnancy/entities/pregnancy.entity';
import { Baby } from 'src/baby/entities/baby.entity';

@Injectable()
export class MedicalAppointementService {
  private readonly logger = new Logger(MedicalAppointementService.name);
  appointmentTypeRepository: any;

  constructor(
    @InjectRepository(MedicalAppointement)
    private readonly medicalAppointementRepository: Repository<MedicalAppointement>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pregnancy)
    private readonly pregnancyRepository: Repository<Pregnancy>,
    @InjectRepository(Baby)
    private readonly babyRepository: Repository<Baby>,
  ) {}

  async createMedicalAppointement(createMedicalAppointementDto: CreateMedicalAppointementDto, userId: number) {
    const { date, hour, reason, description, pregnancyId, babyId, appointementTypeId } = createMedicalAppointementDto;
  
    try {
      const existingUser = await this.userRepository.findOne({ where: { id: userId } });
      if (!existingUser) {
        throw new NotFoundException('Utilisateur non trouvé');
      }
  
      if (pregnancyId && babyId) {
        throw new BadRequestException('Un rdv médical ne peut pas être assigné à la fois à une grossesse et à un bébé');
      }
  
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Format de date invalide');
      }
  
      const appointmentType = await this.appointmentTypeRepository.findOne(appointementTypeId);
      if (!appointmentType) {
        throw new NotFoundException('Type de rendez-vous non trouvé');
      }
  
      const appointment = new MedicalAppointement();
      appointment.date = parsedDate;
      appointment.hour = hour;
      appointment.reason = reason;
      appointment.description = description;
      appointment.user = existingUser;
      appointment.appointementType = appointmentType; 
  
      if (pregnancyId) {
        const pregnancy = await this.pregnancyRepository.findOne({ where: { id: pregnancyId } });
        if (!pregnancy) {
          throw new NotFoundException('Grossesse non trouvée');
        }
        appointment.pregnancy = pregnancy;
      }
  
      if (babyId) {
        const baby = await this.babyRepository.findOne({ where: { id: babyId } });
        if (!baby) {
          throw new NotFoundException('Bébé non trouvé');
        }
        appointment.baby = baby;
      }
  
      return await this.medicalAppointementRepository.save(appointment);
    } catch (error) {
      this.logger.error(`Erreur lors de la création du rendez-vous: ${error.message}`);
      throw error;
    }
  }  
  

  async findAll(userId: number): Promise<MedicalAppointement[]> {
    return await this.medicalAppointementRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOneAppointement(id: number): Promise<MedicalAppointement> {
    const medicalAppointement = await this.medicalAppointementRepository.findOne({
      where: { id }
    });

    if (!medicalAppointement) {
      throw new NotFoundException('Aucun rendez-vous médical trouvé.');
    }

    return medicalAppointement;
  }

  async updateMedicalAppointement(id: number, updateMedicalAppointementDto: UpdateMedicalAppointementDto): Promise<MedicalAppointement> {
    const medicalAppointement = await this.medicalAppointementRepository.findOne({
      where: { id }
    });

    if (!medicalAppointement) {
      throw new NotFoundException(`Rendez-vous médical avec l'ID ${id} non trouvé`);
    }

    Object.assign(medicalAppointement, updateMedicalAppointementDto);

    const updatedAppointement = await this.medicalAppointementRepository.save(medicalAppointement);

    return updatedAppointement;
  }

  async removeMedicalAppointement(id: number): Promise<MedicalAppointement> {
    const appointement = await this.medicalAppointementRepository.findOne({ where: { id } });
  
    if (!appointement) {
      throw new NotFoundException(`Rendez-vous médical avec l'ID ${id} non trouvé`);
    }
  
    await this.medicalAppointementRepository.remove(appointement);
  
    return appointement;
  }
}
