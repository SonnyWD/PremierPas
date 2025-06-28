import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Mood } from './entities/mood.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('mood')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  async createMood(@Body() createMoodDto: CreateMoodDto): Promise<any> {
    const { userId, type, description, startDate, durationInHours } =
      createMoodDto;

    return this.moodService.setMood(
      userId,
      type,
      description,
      startDate,
      durationInHours,
    );
  }

  @Get()
  findAll(): Promise<Mood[]> {
    return this.moodService.findAllMoods();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Mood> {
    return this.moodService.findOneMood(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMoodDto: UpdateMoodDto,
  ): Promise<Mood> {
    return this.moodService.updateMood(id, updateMoodDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.moodService.removeMood(id);
  }
}
