import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BabyService } from './baby.service';
import { CreateBabyDto } from './dto/create-baby.dto';
import { UpdateBabyDto } from './dto/update-baby.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('baby')
export class BabyController {
  constructor(private readonly babyService: BabyService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(@Body() createBabyDto: CreateBabyDto, @Req() req: RequestWithUser) {
    return this.babyService.createBaby(createBabyDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  findAll() {
    return this.babyService.findAllBabies();
  }

  @Get('me')
  @Roles(Role.USER, Role.ADMIN)
  async getMyBaby(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.babyService.findBabyByUserId(userId);
  }

  @Patch(':id')
  @Roles(Role.USER, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateBabyDto: UpdateBabyDto) {
    return this.babyService.updateBaby(+id, updateBabyDto);
  }

  @Delete(':id')
  @Roles(Role.USER, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.babyService.removeBaby(+id);
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.babyService.findOneBaby(+id);
  }
}
