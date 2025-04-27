import { Test, TestingModule } from '@nestjs/testing';
import { AppointementTypeService } from './appointement_type.service';

describe('AppointementTypeService', () => {
  let service: AppointementTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointementTypeService],
    }).compile();

    service = module.get<AppointementTypeService>(AppointementTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
