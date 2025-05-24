import { Module } from '@nestjs/common';
import { AccessContentService } from './access_content.service';
import { AccessContentController } from './access_content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessContent } from './entities/access_content.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessContent, User])],
  controllers: [AccessContentController],
  providers: [AccessContentService],
  exports: [TypeOrmModule, AccessContentService]
})
export class AccessContentModule {}
