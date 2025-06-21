import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AppointementTypeService } from './appointement_type.service';
import { CreateAppointmentTypeDto } from './dto/create-appointement_type.dto';
import { UpdateAppointementTypeDto } from './dto/update-appointement_type.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointement-type')
export class AppointementTypeController {
  constructor(private readonly appointementTypeService: AppointementTypeService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(@Body() createAppointementTypeDto: CreateAppointmentTypeDto) {
    return this.appointementTypeService.create(createAppointementTypeDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.appointementTypeService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.appointementTypeService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update( 
    @Param('id') id: string, 
    @Body() updateAppointementTypeDto: UpdateAppointementTypeDto
  ) {
    return this.appointementTypeService.updateAppointement(
      +id, 
      updateAppointementTypeDto
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.appointementTypeService.removeAppointementType(+id);
  }

}
