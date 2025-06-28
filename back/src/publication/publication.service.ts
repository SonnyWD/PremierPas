import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  public async findPublication(
    publicationId: number,
    userId: number,
  ): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id: publicationId, user: { id: userId } },
      relations: ['user'],
    });

    if (!publication) {
      throw new NotFoundException('Publication non trouvée ou non autorisée');
    }

    return publication;
  }

  async createPublication(
    userId: number,
    createPublicationDto: CreatePublicationDto,
  ) {
    const { title, content } = createPublicationDto;
    if (!title || !content) {
      throw new BadRequestException(
        'Le titre et le contenu sont obligatoires.',
      );
    }

    const newPublication = this.publicationRepository.create({
      user: { id: userId },
      title,
      content,
      publicationDate: new Date(),
    });

    return await this.publicationRepository.save(newPublication);
  }

  async updatePublication(
    publicationId: number,
    userId: number,
    updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication> {
    const existingPublication = await this.findPublication(
      publicationId,
      userId,
    );
    Object.assign(existingPublication, updatePublicationDto);
    return await this.publicationRepository.save(existingPublication);
  }

  async removePublication(
    publicationId: number,
    userId: number,
  ): Promise<Publication> {
    const existingPublication = await this.findPublication(
      publicationId,
      userId,
    );
    return await this.publicationRepository.remove(existingPublication);
  }

  async findAllPublications(userId: number): Promise<Publication[]> {
    return await this.publicationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOnePublication(
    publicationId: number,
    userId: number,
  ): Promise<Publication> {
    const existingPublication = await this.findPublication(
      publicationId,
      userId,
    );

    return existingPublication;
  }
}
