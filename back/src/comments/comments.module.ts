import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Publication, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [TypeOrmModule, CommentsService]
})
export class CommentsModule {}
