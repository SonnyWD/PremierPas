import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PregnancyService } from './pregnancy.service';
import { CreatePregnancyDto } from './dto/create-pregnancy.dto';
import { UpdatePregnancyDto } from './dto/update-pregnancy.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('pregnancy')
export class PregnancyController {
  constructor(private readonly pregnancyService: PregnancyService) {}

  @Post()
  create(@Request() req, @Body() createPregnancyDto: CreatePregnancyDto) {
    return this.pregnancyService.create(req.user.id, createPregnancyDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.pregnancyService.findAllPregnancies(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,  @Request() req) {
    return this.pregnancyService.findOnePregnancy(req.user.id, id);
  }

  @Patch(':id')
  updatePregnancy( @Request() req, @Param('id', ParseIntPipe) id: number, @Body() updatePregnancyDto: UpdatePregnancyDto) {
    return this.pregnancyService.updatePregnancy(req.user.id, id, updatePregnancyDto);
  }

  @Delete(':id')
  deletePregnancy( @Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.pregnancyService.deletePregnancy(req.user.id, id);
  }
}
