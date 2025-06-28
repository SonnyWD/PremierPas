import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAppointementService } from './medical_appointement.service';

describe('MedicalAppointementService', () => {
  let service: MedicalAppointementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalAppointementService],
    }).compile();

    service = module.get<MedicalAppointementService>(
      MedicalAppointementService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
