import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService, 
  ) {}
  
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUserByEmail(loginUserDto.email);
    const isPasswordValid = await bcrypt.compare(loginUserDto.mot_de_passe, user.mot_de_passe);

    if (!isPasswordValid) {
    throw new BadRequestException('Email ou mot de passe incorrect');
    }
    const now = new Date();
  
    const isPremium = user.premiumUntil ? user.premiumUntil.getTime() > now.getTime() : false;

    let userRole: Role;
    switch (user.type_profil) {
      case 'femme_enceinte':
      case 'parent':
      case 'autre':
        userRole = Role.USER; 
        break;
      default:
        userRole = Role.USER; 
    }

    let activeBabyId: number | null = null;
    const activePregnancy = user.activePregnancy;

    if (activePregnancy && activePregnancy.babies && activePregnancy.babies.length > 0) {
        activeBabyId = activePregnancy.babies[0].id;
    }
    
    
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.role,
      type_profil: user.type_profil, 
      isPremium: isPremium,
      babyId: activeBabyId,       
    };
    
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,  
      expiresIn: '10h'
    });

    user.lastLogin = new Date();

    await this.usersService.save(user);
    
    return { accessToken };
  }
}
