import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
      findUserByEmail: jest.fn(),
      save: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('devrait créer un utilisateur via usersService.create', async () => {
      const createUserDto = {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        date_naissance: new Date('1990-05-15'),
        email: 'jean.dupont@example.com',
        mot_de_passe: 'Password1',
        suggested_name: { nickname: 'JD' },
      };
      const userReturned = { id: '1', email: 'jean.dupont@example.com' } as any;

      usersService.create?.mockResolvedValue(userReturned);

      const result = await authService.register(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(userReturned);
    });
  });

  describe('login', () => {
    it('devrait retourner un token JWT valide si les identifiants sont corrects', async () => {
      const loginUserDto = {
        email: 'jean.dupont@example.com',
        mot_de_passe: 'Password1',
      };

      const mockUser = {
        id: '1',
        email: loginUserDto.email,
        mot_de_passe: await bcrypt.hash('Password1', 10),
        role: 'user',
        type_profil: 'parent',
        premiumUntil: new Date(Date.now() + 100000), 
        activePregnancy: { babies: [{ id: 123 }] },
        lastLogin: null,
      };

      usersService.findUserByEmail?.mockResolvedValue(mockUser);
      jwtService.signAsync?.mockResolvedValue('fake-jwt-token');
      usersService.save?.mockResolvedValue(null);

      const result = await authService.login(loginUserDto);

      expect(usersService.findUserByEmail).toHaveBeenCalledWith(loginUserDto.email);
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(result).toEqual({ accessToken: 'fake-jwt-token' });
      expect(usersService.save).toHaveBeenCalled();
    });

    it('devrait lancer une BadRequestException si le mot de passe est incorrect', async () => {
      const loginUserDto = {
        email: 'jean.dupont@example.com',
        mot_de_passe: 'WrongPassword',
      };

      const mockUser = {
        id: '1',
        email: loginUserDto.email,
        mot_de_passe: await bcrypt.hash('Password1', 10), 
        role: 'user',
        type_profil: 'parent',
        premiumUntil: null,
        activePregnancy: null,
        lastLogin: null,
      };

      usersService.findUserByEmail?.mockResolvedValue(mockUser);

      await expect(authService.login(loginUserDto)).rejects.toThrow(BadRequestException);
    });
  });
});
