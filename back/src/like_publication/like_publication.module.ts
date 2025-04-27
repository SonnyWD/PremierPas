import { Module } from '@nestjs/common';
import { LikePublicationService } from './like_publication.service';
import { LikePublicationController } from './like_publication.controller';
import { LikePublication } from './entities/like_publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationModule } from 'src/publication/publication.module';
import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikePublication, Publication, User]),
PublicationModule],
  controllers: [LikePublicationController],
  providers: [LikePublicationService],
  exports: [TypeOrmModule, LikePublicationService]
})
export class LikePublicationModule {}
