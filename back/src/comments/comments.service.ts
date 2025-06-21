import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { User } from '../users/entities/user.entity';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Publication) private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async findPublication(publicationId: number): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id: publicationId },
      relations: ['user']
    });
  
    if (!publication) {
      throw new NotFoundException("Publication non trouvée");
    }
  
    return publication;
  }
      
  async createComment(userId: number, publicationId: number, createCommentDto: CreateCommentDto) {
    const existingPublication = await this.findPublication(publicationId);
    const existingUser = await this.userRepository.findOne({ where: { id: userId } });

  if (!existingUser) {
    throw new NotFoundException("Utilisateur non trouvé");
  }

  const { content } = createCommentDto;

  const newComment = this.commentRepository.create({
    user: existingUser, 
    publication: existingPublication, 
    content,
  });

    return await this.commentRepository.save(newComment);
  }

  async findComment(commentId: number): Promise<Comment> {
    const existingComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'], 
    });
  
    if (!existingComment) {
      throw new NotFoundException('Commentaire non trouvé.');
    }
  
    return existingComment;
  }

  private async checkOwnershipOrFail(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: { id: userId },
      },
      relations: ['user'],
    });
  
    if (!comment) {
      throw new NotFoundException("Commentaire non trouvé ou vous n'êtes pas l'auteur.");
    }
  
    return comment;
  }
  

  async updateComment(commentId: number, userId: number, updateCommentDto: UpdateCommentDto){
    const existingComment = await this.checkOwnershipOrFail(commentId, userId);
    Object.assign(existingComment, updateCommentDto);
    return await this.commentRepository.save(existingComment);
  }

  async removeComment(commentId: number, userId: number){
    const existingComment = await this.checkOwnershipOrFail(commentId, userId);
    await this.commentRepository.remove(existingComment);
    return { message: 'Commentaire supprimé avec succès'};
  }

  async findAllComments(): Promise<Comment[]> {
    return await this.commentRepository.find()
  }
}
