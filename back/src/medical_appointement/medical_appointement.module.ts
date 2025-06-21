import { Module } from '@nestjs/common';
import { MedicalAppointementService } from './medical_appointement.service';
import { MedicalAppointementController } from './medical_appointement.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicalAppointement } from './entities/medical_appointement.entity';
import { User } from '../users/entities/user.entity';
import { Pregnancy } from '../pregnancy/entities/pregnancy.entity';
import { Baby } from '../baby/entities/baby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalAppointement, User, Pregnancy, Baby])],
  controllers: [MedicalAppointementController],
  providers: [MedicalAppointementService],
  exports: [TypeOrmModule, MedicalAppointementService],
})
export class MedicalAppointementModule {}
