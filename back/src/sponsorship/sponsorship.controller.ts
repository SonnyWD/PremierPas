import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { CreateSponsorshipDto } from './dto/create-sponsorship.dto';
import { UpdateSponsorshipDto } from './dto/update-sponsorship.dto';

@Controller('sponsorship')
export class SponsorshipController {
  constructor(private readonly sponsorshipService: SponsorshipService) {}

  @Post(':userId')
  createSponsorship(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createSponsorshipDto: CreateSponsorshipDto,
  ) {
    return this.sponsorshipService.validateSponsorship(
      createSponsorshipDto.referralCode,
      userId,
    );
  }

  @Get()
  findAll() {
    return this.sponsorshipService.findAllSponsorship();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sponsorshipService.findOneSponsorship(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSponsorshipDto: UpdateSponsorshipDto,
  ) {
    return this.sponsorshipService.updateSponsorship(id, updateSponsorshipDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sponsorshipService.removeSponsorship(id);
  }
}
