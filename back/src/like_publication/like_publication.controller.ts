import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { LikePublicationService } from './like_publication.service';
import { CreateLikePublicationDto } from './dto/create-like_publication.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('like-publication')
export class LikePublicationController {
  constructor(private readonly likePublicationService: LikePublicationService) {}

  @Post('toggle')
  async likePost(@Request() req, @Body() createLikePublicationDto: CreateLikePublicationDto) {
    return this.likePublicationService.toggleLike(
      createLikePublicationDto.publicationId,
      req.user.id
    );
  }

  @Get('count/:publicationId')
  async countLikes(@Param('publicationId') publicationId: number) {
    return this.likePublicationService.countLikes(Number(publicationId));
  }
}
