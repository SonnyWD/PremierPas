import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(
      req.user.id,
      createCommentDto.publicationId,
      createCommentDto,
    );
  }

  @Get()
  findAll() {
    return this.commentsService.findAllComments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findComment(+id);
  }

  @Patch(':id')
  @Roles(Role.USER, Role.ADMIN)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(
      +id,
      req.user.id,
      updateCommentDto,
    );
  }

  @Delete(':id')
  @Roles(Role.USER, Role.ADMIN)
  remove(@Request() req, @Param('id') id: string) {
    return this.commentsService.removeComment(+id, req.user.id);
  }
}
