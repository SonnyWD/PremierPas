import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeComment } from './entities/like_comment.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeCommentService {
constructor(
    @InjectRepository(LikeComment)
    private readonly likeRepository: Repository<LikeComment>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async toggleLike(commentId: number, userId: number): Promise<string> {
    const commentaire = await this.commentRepository.findOne({ where: {id: commentId}});
    const user = await this.userRepository.findOne({ where: { id: userId}});

    if(!commentaire || !user){
      throw new NotFoundException('Commentaire ou utilisateur introuvable');
    }

    const existingLike = await this.likeRepository.findOne({ where: { comment: commentaire, user }})

    if(existingLike){
      await this.likeRepository.remove(existingLike);
      return "Like supprimé";
    }
    else {
      const like = this.likeRepository.create({ comment: commentaire, user})
      await this.likeRepository.save(like);
      return "Like ajouté";
    }
  }

  async countLikes(commentId: number): Promise<number> {
    return this.likeRepository.count({ where: { comment: { id: commentId}}})
  }
}
