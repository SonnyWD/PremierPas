import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikePublication } from './entities/like_publication.entity';
import { Repository } from 'typeorm';
import { Publication } from '../publication/entities/publication.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LikePublicationService {
  constructor(
    @InjectRepository(LikePublication)
    private readonly likeRepository: Repository<LikePublication>,
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async toggleLike(publicationId: number, userId: number): Promise<string> {
    const publication = await this.publicationRepository.findOne({ where: { id: publicationId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!publication || !user) {
      throw new NotFoundException('Publication ou utilisateur introuvable');
    }

    const existingLike = await this.likeRepository.findOne({ where: { publication, user } });

    if (existingLike) {
      await this.likeRepository.remove(existingLike);
      return 'Like supprimé';
    } else {
      const like = this.likeRepository.create({ publication, user });
      await this.likeRepository.save(like);
      return 'Like ajouté';
    }
  }

  async countLikes(publicationId: number): Promise<number> {
    return this.likeRepository.count({ where: { publication: { id: publicationId } } });
  }
}
