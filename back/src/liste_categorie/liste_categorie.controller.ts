import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ListeCategorieService } from './liste_categorie.service';
import { CreateListeCategorieDto } from './dto/create-liste_categorie.dto';
import { UpdateListeCategorieDto } from './dto/update-liste_categorie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('liste-categorie')
export class ListeCategorieController {
  constructor(private readonly listeCategorieService: ListeCategorieService) {}

  @Post()
  create(@Request() req,@Body() createListeCategorieDto: CreateListeCategorieDto) {
    return this.listeCategorieService.createCategorie(createListeCategorieDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.listeCategorieService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listeCategorieService.findOneCategorie(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListeCategorieDto: UpdateListeCategorieDto, @Request() req) {
    return this.listeCategorieService.updateCategorie(+id, updateListeCategorieDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.listeCategorieService.removeCategorie(+id, req.user.id, req.user.role);
  }
}
