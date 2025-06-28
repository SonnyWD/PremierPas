import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSponsorshipDto } from './dto/update-sponsorship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsorship } from './entities/sponsorship.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SponsorshipService {
  constructor(
    @InjectRepository(Sponsorship)
    private readonly sponsorshipRepository: Repository<Sponsorship>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateSponsorship(code: string, filleulId: number) {
    const godfather = await this.userRepository.findOne({
      where: { referralCode: code },
    });
    if (!godfather) {
      throw new NotFoundException('Code parrain invalide.');
    }

    const filleul = await this.userRepository.findOne({
      where: { id: filleulId },
    });
    if (!filleul) {
      throw new NotFoundException('Filleul introuvable.');
    }

    const existing = await this.sponsorshipRepository.findOne({
      where: { sponsored: { id: filleulId } },
    });
    if (existing) {
      throw new BadRequestException('Parrainage déjà utilisé.');
    }

    const sponsorship = this.sponsorshipRepository.create({
      sponsor: godfather,
      sponsored: filleul,
      sponsorshipDate: new Date(),
    });

    await this.sponsorshipRepository.save(sponsorship);

    await this.addPremium(godfather);
    await this.addPremium(filleul);

    return {
      message: 'Parrainage validé ! 1 mois Premium offert à vous deux.',
    };
  }

  async addPremium(user: User) {
    const premiumDuration = 30;
    const currentDate = new Date();

    user.premiumUntil = new Date(
      currentDate.setDate(currentDate.getDate() + premiumDuration),
    );

    await this.userRepository.save(user);
  }

  async findAllSponsorship() {
    return await this.sponsorshipRepository.find({
      relations: ['sponsor', 'sponsored'],
    });
  }

  async findOneSponsorship(id: number) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { id },
      relations: ['sponsor', 'sponsored'],
    });

    if (!sponsorship) {
      throw new NotFoundException(`Parrainage #${id} non trouvé`);
    }

    return sponsorship;
  }

  async updateSponsorship(
    id: number,
    updateSponsorshipDto: UpdateSponsorshipDto,
  ) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { id },
    });

    if (!sponsorship) {
      throw new NotFoundException(`Parrainage #${id} non trouvé`);
    }

    Object.assign(sponsorship, updateSponsorshipDto);

    return await this.sponsorshipRepository.save(sponsorship);
  }

  async removeSponsorship(id: number) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { id },
    });

    if (!sponsorship) {
      throw new NotFoundException(`Parrainage #${id} non trouvé`);
    }

    await this.sponsorshipRepository.remove(sponsorship);

    return { message: `Parrainage #${id} supprimé avec succès` };
  }
}
