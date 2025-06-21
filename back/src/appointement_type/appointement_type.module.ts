import { Module } from '@nestjs/common';
import { AppointementTypeService } from './appointement_type.service';
import { AppointementTypeController } from './appointement_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointementType } from './entities/appointement_type.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointementType, User])],
  controllers: [AppointementTypeController],
  providers: [AppointementTypeService],
  exports: [TypeOrmModule, AppointementTypeService], 
})
export class AppointementTypeModule {}
