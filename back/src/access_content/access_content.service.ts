import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessContent } from './entities/access_content.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { isPremium } from '../src/utils/user-utils';

@Injectable()
export class AccessContentService {
  constructor(
    @InjectRepository(AccessContent)
    private acessContentRepository: Repository<AccessContent>
  ) {}

  async canAcessContent(user: User, contentId: number): Promise<boolean>{
    if(isPremium(user)){
      return true;
    }

    const accessWithPoints = await this.acessContentRepository.findOne({
      where: {
        user: { id: user.id},
        contentId: contentId
      },
    });

    return !!accessWithPoints;
  }
}
