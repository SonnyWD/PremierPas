import { Module } from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { SponsorshipController } from './sponsorship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsorship } from './entities/sponsorship.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sponsorship, User])],
  controllers: [SponsorshipController],
  providers: [SponsorshipService],
  exports: [TypeOrmModule, SponsorshipService],
})
export class SponsorshipModule {}
