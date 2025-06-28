import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Tool } from '../tools/entities/tool.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tool)
    private toolRepository: Repository<Tool>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException("L'email est déjà utilisé.");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.mot_de_passe, 10);

    const newUser = new User();
    Object.assign(newUser, {
      ...createUserDto,
      mot_de_passe: hashedPassword,
      type_profil: createUserDto.type_profil ?? 'femme_enceinte',
    });

    if (createUserDto.date_naissance) {
      newUser.date_naissance = new Date(createUserDto.date_naissance);
    }

    const savedUser = await this.userRepository.save(newUser);

    return instanceToPlain(savedUser) as User;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => instanceToPlain(user) as User);
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.findUser(id);
    return instanceToPlain(user) as User;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(id);

    Object.assign(user, updateUserDto);

    if (updateUserDto.mot_de_passe) {
      user.mot_de_passe = await bcrypt.hash(updateUserDto.mot_de_passe, 10);
    }
    const updatedUser = await this.userRepository.save(user);

    return instanceToPlain(updatedUser) as User;
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.findUser(id);
    const userCopy = { ...user };
    await this.userRepository.remove(user);
    return instanceToPlain(userCopy) as User;
  }

  public async findUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['pregnancies', 'pregnancies.babies'],
    });
    if (!user) {
      throw new BadRequestException('Utilisateur introuvable');
    }
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['pregnancies', 'pregnancies.babies'],
    });
    if (!user) {
      throw new BadRequestException('Utilisateur introuvable');
    }
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async userPoint(id: number): Promise<User> {
    const user = await this.findUser(id);

    if (!user.lastLogin) {
      throw new BadRequestException(
        'La date de dernière connexion est invalide.',
      );
    }

    const now = new Date();
    const timeDifference = now.getTime() - user.lastLogin.getTime();
    const minutes = Math.floor(timeDifference / 6000);

    user.point = (user.point || 0) + minutes;
    user.lastLogin = now;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async getFavoriteTools(id: number): Promise<Tool[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favoriteTools'],
    });
    if (!user) throw new BadRequestException('Utilisateur non trouvé');

    return user.favoriteTools;
  }

  async addFavoriteTool(id: number, toolId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favoriteTools'],
    });
    if (!user) throw new BadRequestException('Utilisateur non trouvé');

    const tool = await this.toolRepository.findOne({ where: { id: toolId } });
    if (!tool) throw new BadRequestException('Outil non trouvé');

    const alreadyFavorite = user.favoriteTools.some((t) => t.id === tool.id);
    if (alreadyFavorite) {
      throw new BadRequestException('Déjà dans les favoris');
    }

    user.favoriteTools.push(tool);
    return await this.userRepository.save(user);
  }

  async removeFavoriteTool(id: number, toolId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favoriteTools'],
    });
    if (!user) throw new BadRequestException('Utilisateur non trouvé');

    user.favoriteTools = user.favoriteTools.filter(
      (tool) => tool.id !== toolId,
    );
    await this.userRepository.save(user);

    return user;
  }
}
