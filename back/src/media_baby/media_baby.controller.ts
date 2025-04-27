import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { MediaBabyService } from './media_baby.service';
import { CreateMediaBabyDto } from './dto/create-media_baby.dto';
import { UpdateMediaBabyDto } from './dto/update-media_baby.dto';

@Controller('media-baby')
export class MediaBabyController {
  constructor(private readonly mediaBabyService: MediaBabyService) {}

  @Post()
  create(@Request() req, @Body() createMediaBabyDto: CreateMediaBabyDto) {
    return this.mediaBabyService.importMedia(req.user.id, createMediaBabyDto);
  }

  @Get()
  findAll() {
    return this.mediaBabyService.findAllMedias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaBabyService.findOneMedia(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaBabyDto: UpdateMediaBabyDto, userId: number, userRole: string) {
    return this.mediaBabyService.updateMedia(+id, updateMediaBabyDto, userId, userRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string, userId: number, userRole: string) {
    return this.mediaBabyService.removeMedia(+id, userId, userRole);
  }
}
