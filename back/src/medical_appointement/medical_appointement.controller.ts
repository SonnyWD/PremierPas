import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MedicalAppointementService } from './medical_appointement.service';
import { CreateMedicalAppointementDto } from './dto/create-medical_appointement.dto';
import { UpdateMedicalAppointementDto } from './dto/update-medical_appointement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('medical-appointement')
export class MedicalAppointementController {
  constructor(private readonly medicalAppointementService: MedicalAppointementService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateMedicalAppointementDto) {
    const userId = req.user.id; 
    return this.medicalAppointementService.createMedicalAppointement(dto, userId);
  }

  @Get()
findAll(@Request() req) {
  return this.medicalAppointementService.findAll(req.user.id);
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalAppointementService.findOneAppointement(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMedicalAppointementDto: UpdateMedicalAppointementDto) {
    return this.medicalAppointementService.updateMedicalAppointement(id, updateMedicalAppointementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalAppointementService.removeMedicalAppointement(id);
  }
}
