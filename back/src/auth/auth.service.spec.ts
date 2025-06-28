import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

describe('AuthService - register', () => {
  let authService: AuthService;
  let usersService: { create: jest.Mock };

  beforeEach(async () => {
    usersService = {
      create: jest.fn().mockImplementation((dto) => ({
        id: 1,
        ...dto,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user and return the created user', async () => {
    const dto: CreateUserDto = {
      email: 'test@mail.com',
      mot_de_passe: 'azerty',
      nom: 'Doe',
      prenom: 'John',
      date_naissance: '2000-01-01',
      suggested_name: { name: 'Lucas' },
    };

    const result = await authService.register(dto);

    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: 1,
      ...dto,
    });
  });
});

describe('AuthService - login', () => {
  let authService: AuthService;
  let usersService: { findUserByEmail: jest.Mock; save: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    usersService = {
      findUserByEmail: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        mot_de_passe: await require('bcrypt').hash('azerty', 10),
        prenom: 'John',
        role: 'user',
        date_naissance: '2000-01-01',
        activePregnancy: { babies: [{ id: 42 }] },
        save: jest.fn(),
      }),
      save: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
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

  it('should login and return an access token', async () => {
    const loginDto = {
      email: 'test@mail.com',
      mot_de_passe: 'azerty',
    };

    const result = await authService.login(loginDto);

    expect(usersService.findUserByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(jwtService.signAsync).toHaveBeenCalled();
    expect(result).toEqual({ accessToken: 'fake-jwt-token' });
  });
});
