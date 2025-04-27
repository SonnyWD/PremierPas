import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { LikeCommentService } from './like_comment.service';
import { CreateLikeCommentDto } from './dto/create-like_comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER, Role.ADMIN)
@Controller('like-comment')
export class LikeCommentController {
  likePublicationService: any;
  constructor(private readonly likeCommentService: LikeCommentService) {}

  @Post('toggle')
  async likePost(@Request() req, @Body() createLikeCommentDto: CreateLikeCommentDto) {
    return this.likeCommentService.toggleLike(
      createLikeCommentDto.commentId,
      req.user.id
    );
  }

  @Get('count/:commentId')
  async countLikes(@Param('commentId') commentId: number) {
    return this.likeCommentService.countLikes(Number(commentId));
  }
}
