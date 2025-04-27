import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaBabyDto } from './dto/create-media_baby.dto';
import { UpdateMediaBabyDto } from './dto/update-media_baby.dto';
import { MediaBaby } from './entities/media_baby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { isOwnerOrAdmin } from 'src/permissions.util';

@Injectable()
export class MediaBabyService {
  constructor(
    @InjectRepository(MediaBaby)
    private readonly mediaBabyRepository: Repository<MediaBaby>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  async importMedia(userId: number, createMediaBabyDto: CreateMediaBabyDto) {
    const { typeMedia, url, date } = createMediaBabyDto;

    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['user']
    });

    if(!existingUser){
      throw new NotFoundException('Utilisateur introuvable.')
    };

    const newMedia = this.mediaBabyRepository.create({
      typeMedia,
      url,
      date,
      user: existingUser
    });

    await this.mediaBabyRepository.save(newMedia);

    return { message: "Contenu importé avec succés."}
  }

  async findAllMedias(): Promise<MediaBaby[]> {
    return await this.mediaBabyRepository.find();
  }

  async findOneMedia(id: number): Promise<MediaBaby> {
    const existingMedia = await this.mediaBabyRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if(!existingMedia) {
      throw new NotFoundException(`Media non trouvé.`)
    };

    return existingMedia;
  }

  async updateMedia(id: number, updateMediaBabyDto: UpdateMediaBabyDto, userId: number, userRole: string) {
    const existingMedia = await this.mediaBabyRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if(!existingMedia) {
      throw new NotFoundException(`Media non trouvé.`)
    };

    if (!isOwnerOrAdmin(existingMedia.user.id, userId, userRole)) {
          throw new ForbiddenException("Vous n'avez pas le droit de modifier cette catégorie");
        };

    Object.assign(existingMedia, updateMediaBabyDto);

    return await this.mediaBabyRepository.save(existingMedia)

  }

  async removeMedia(id: number, userId: number, userRole: string) {
    const existingMedia = await this.mediaBabyRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if(!existingMedia) {
      throw new NotFoundException(`Media non trouvé.`)
    };

    if (!isOwnerOrAdmin(existingMedia.user.id, userId, userRole)) {
          throw new ForbiddenException("Vous n'avez pas le droit de modifier cette catégorie");
        };

    await this.mediaBabyRepository.remove(existingMedia)

    return { message: `Media supprimé avec succès.`}
  }
}
