import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentTypeDto } from './dto/create-appointement_type.dto';
import { UpdateAppointementTypeDto } from './dto/update-appointement_type.dto';
import { AppointementType } from './entities/appointement_type.entity';

@Injectable()
export class AppointementTypeService {
  private readonly logger = new Logger(AppointementTypeService.name);

  constructor(
    @InjectRepository(AppointementType)
    private readonly appointmentTypeRepository: Repository<AppointementType>,
  ) {}


  async addDefaultAppointmentTypes() {
    const defaultTypes = [
      { title: 'Consultation générale' },
      { title: 'Suivi de grossesse' },
      { title: 'Suivi de bébé' },
    ];

    for (const type of defaultTypes) {
      const existingType = await this.appointmentTypeRepository.findOne({
        where: { title: type.title },
      });

      if (!existingType) {
        await this.appointmentTypeRepository.save(type);
        this.logger.log(`Type de rendez-vous "${type.title}" ajouté avec succès`);
      } else {
        this.logger.log(`Type de rendez-vous "${type.title}" déjà existant`);
      }
  }
  }

  async findAll() {
    return this.appointmentTypeRepository.find();
  }


  async findOne(id: number) {
    const type = await this.appointmentTypeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException('Type de rendez-vous non trouvé');
    }
    return type;
  }


  async create(createAppointmentTypeDto: CreateAppointmentTypeDto) {
    const newType = this.appointmentTypeRepository.create(createAppointmentTypeDto);
    return await this.appointmentTypeRepository.save(newType);
  }

  async updateAppointement(id: number, updateAppointementTypeDto: UpdateAppointementTypeDto): Promise<AppointementType> {
    const appointementType = await this.appointmentTypeRepository.findOne({
      where: { id }
    });

    if(!appointementType){
      throw new NotFoundException(`Ce type de rendez-vous médical avec l'ID ${id} est introuvable`);
    }

    Object.assign(appointementType, updateAppointementTypeDto);

    const updatedAppointementType = await this.appointmentTypeRepository.save(appointementType);

    return updatedAppointementType;
  }

  async removeAppointementType(id: number): Promise<AppointementType> {
    const appointementType = await this.appointmentTypeRepository.findOne({ where: { id }});

    if(!appointementType){
      throw new NotFoundException(`Ce type de rendez-vous médical avec l'ID ${id} est introuvable`)
    };
    
    await this.appointmentTypeRepository.remove(appointementType);
    this.logger.log(`Type de rendez-vous "${appointementType.title}" supprimé avec succès`);

    return appointementType;
  }


}
