import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) - devrait créer un utilisateur', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
      email: 'test@example.com',
      mot_de_passe: 'Password1',
      nom: 'TestNom',         
      prenom: 'TestPrenom',   
      date_naissance: '2000-01-01' 
    })  
      .expect(201);

    expect(response.body.email).toBe('test@example.com');
  });
});
