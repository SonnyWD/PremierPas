import { Module } from '@nestjs/common';
import { LikeCommentService } from './like_comment.service';
import { LikeCommentController } from './like_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeComment } from './entities/like_comment.entity';
import { Comment } from '../comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeComment, Comment, User])],
  controllers: [LikeCommentController],
  providers: [LikeCommentService],
  exports: [TypeOrmModule, LikeCommentService],
})
export class LikeCommentModule {}
