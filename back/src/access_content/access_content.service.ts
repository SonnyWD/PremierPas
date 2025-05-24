import { Injectable } from '@nestjs/common';
import { CreateAccessContentDto } from './dto/create-access_content.dto';
import { UpdateAccessContentDto } from './dto/update-access_content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessContent } from './entities/access_content.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { isPremium } from 'src/src/utils/user-utils';

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
